// services/uploadService.js
import { BASE_URL } from '../utils/auth';

/**
 * Upload Service - Industry Standard File Upload
 *
 * Pattern:
 * 1. Upload files (async) -> Get URLs
 * 2. Submit form with URLs (JSON)
 *
 * This separates file upload from form submission for better scalability
 */

class UploadService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  /**
   * Get auth headers
   */
  getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  /**
   * Upload a single file
   * @param {File} file - The file to upload
   * @param {string} folder - Folder name (job, admission, answer-key, etc.)
   * @param {string} customName - Optional custom file name
   * @returns {Promise<Object>} - Upload result with fileUrl, cloudinaryId, etc.
   */
  uploadSingle = async (file, folder = 'other', customName = '') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (customName) {
      formData.append('customName', customName);
    }

    const response = await fetch(`${this.baseURL}/api/upload/single`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload file');
    }

    return data;
  };

  /**
   * Upload a single file for AnswerForm (convenience method)
   * Used for immediate file upload when user selects a file
   * @param {File} file - The file to upload (File object, not FormData)
   * @param {string} fieldName - The field name (e.g., 'officialNotification')
   * @param {string} customName - Optional custom file name
   * @returns {Promise<Object>} - Upload result with { success, data: { fileUrl, cloudinaryId, fileName, fileType } }
   */
  uploadSingleFile = async (file, fieldName = '', customName = '') => {
    // Create FormData internally
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'answer-key');
    if (customName) {
      formData.append('customName', customName);
    }

    const response = await fetch(`${this.baseURL}/api/upload/single`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload file');
    }

    return data;
  };

  /**
   * Upload files with specific field names
   * @param {Object} filesObject - Object with field names as keys and files as values
   * @param {string} folder - Folder name
   * @returns {Promise<Object>} - Upload results keyed by field name
   */
  uploadFields = async (filesObject, folder = 'other') => {
    const formData = new FormData();
    formData.append('folder', folder);

    Object.entries(filesObject).forEach(([fieldName, fileData]) => {
      if (fileData && fileData.file) {
        formData.append(fieldName, fileData.file);
        if (fileData.customName) {
          formData.append(`${fieldName}_name`, fileData.customName);
        }
      }
    });

    const response = await fetch(`${this.baseURL}/api/upload/fields`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload files');
    }

    return data;
  };

  /**
   * Delete a file from Cloudinary
   * Uses POST method which handles cloudinaryIds with slashes better
   * @param {string} cloudinaryId - The Cloudinary public ID
   * @param {string} fileUrl - Optional: The file URL (helps detect resource type)
   * @returns {Promise<Object>} - Deletion result
   */
  deleteFile = async (cloudinaryId, fileUrl = null) => {
    const response = await fetch(`${this.baseURL}/api/upload/delete`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cloudinaryId,
        ...(fileUrl && { fileUrl }),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete file');
    }

    return data;
  };

  /**
   * Get upload configuration (allowed types, max sizes, etc.)
   * @returns {Promise<Object>} - Upload configuration
   */
  getConfig = async () => {
    const response = await fetch(`${this.baseURL}/api/upload/config`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get upload config');
    }

    return data;
  };

  /**
   * Upload files for Answer Key form
   * Uploads all files first, then returns file URLs for form submission
   * @param {Object} files - Object with fieldName: File
   * @param {Object} fileNames - Object with fieldName: customName
   * @param {Function} onProgress - Progress callback (optional)
   * @returns {Promise<Object>} - Object with fieldName: { fileName, fileUrl, cloudinaryId, fileType }
   */
  uploadAnswerKeyFiles = async (files, fileNames = {}, onProgress = null) => {
    const uploadedFiles = {};
    const fileEntries = Object.entries(files).filter(([, file]) => file !== null);
    const totalFiles = fileEntries.length;
    let completedFiles = 0;

    for (const [fieldName, file] of fileEntries) {
      try {
        const customName = fileNames[fieldName] || file.name;
        const result = await this.uploadSingle(file, 'answer-key', customName);

        if (result.success && result.data) {
          uploadedFiles[fieldName] = {
            fileName: result.data.fileName || customName,
            fileUrl: result.data.fileUrl,
            cloudinaryId: result.data.cloudinaryId,
            fileType: result.data.fileType || result.data.format,
            uploadedAt: new Date().toISOString()
          };
        }

        completedFiles++;
        if (onProgress) {
          onProgress({
            completed: completedFiles,
            total: totalFiles,
            fieldName,
            success: true
          });
        }
      } catch (error) {
        completedFiles++;
        if (onProgress) {
          onProgress({
            completed: completedFiles,
            total: totalFiles,
            fieldName,
            success: false,
            error: error.message
          });
        }
        // Continue with other files even if one fails
      }
    }

    return uploadedFiles;
  };
}

export default new UploadService();
