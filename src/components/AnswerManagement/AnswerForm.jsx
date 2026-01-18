// components/AnswerManagement/AnswerForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createAnswer,
  updateAnswer,
  fetchAnswerById,
  fetchAvailableReferences,
  clearReferences
} from '../../slice/answerSlice';
import uploadService from '../../services/uploadService';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
  Upload,
  File,
  Plus,
  Loader2,
  Check
} from 'lucide-react';

const AnswerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  // Extract user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[1];

  const { currentAnswer, loading, references } = useSelector(state => state?.answers);
  const user = useSelector(store => store?.user);

  const [formData, setFormData] = useState({
    type: '',
    referenceId: '',
    referenceModel: '',
    directWebURL: '',
    linkMenuField: '',
    postTypeDetails: '',
    description: '',
    examName: '',
    publishDate: new Date().toISOString().split('T')[0],
    lastDate: '',
    status: user?.role === 'admin' ? 'pending' : 'pending',
    answerStatus: 'active',
    category: '',
    tags: [],
    dynamicContent: [],
    contentSections: [],
    importantInstructions: [],
    documentsRequired: []
  });

  // File state - stores File objects for new uploads
  const [files, setFiles] = useState({
    officialNotification: null,
    examDateNotice: null,
    syllabusFile: null,
    admitCardFile: null,
    answerKeyFile: null,
    resultFile: null,
    otherFile: null
  });

  // File URLs after upload (for form submission)
  const [uploadedFileData, setUploadedFileData] = useState({
    officialNotification: null,
    examDateNotice: null,
    syllabusFile: null,
    admitCardFile: null,
    answerKeyFile: null,
    resultFile: null,
    otherFile: null
  });

  // File names for custom naming
  const [fileNames, setFileNames] = useState({
    officialNotification: '',
    examDateNotice: '',
    syllabusFile: '',
    admitCardFile: '',
    answerKeyFile: '',
    resultFile: '',
    otherFile: ''
  });

  // Upload progress state for individual files
  const [uploadingFiles, setUploadingFiles] = useState({
    officialNotification: false,
    examDateNotice: false,
    syllabusFile: false,
    admitCardFile: false,
    answerKeyFile: false,
    resultFile: false,
    otherFile: false
  });

  const [selectedReference, setSelectedReference] = useState(null);
  const [referenceSearch, setReferenceSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [showReferenceDropdown, setShowReferenceDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlsoShowLink, setShowAlsoShowLink] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [showOtherFileName, setShowOtherFileName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typeOptions = [
    { value: '', label: 'Select Type', disabled: true },
    { value: 'Job', label: 'Job', color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'Admission', label: 'Admission', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'LatestNotice', label: 'Latest Notice', color: 'text-pink-600', bg: 'bg-pink-50' },
    { value: 'Other', label: 'Other', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const fileTypeLabels = {
    officialNotification: 'Official Notification',
    examDateNotice: 'Exam Date Notice',
    syllabusFile: 'Syllabus File',
    admitCardFile: 'Admit Card File',
    answerKeyFile: 'Answer Key File',
    resultFile: 'Result File',
    otherFile: 'Other File'
  };

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAnswerById(id));
    }

    return () => {
      dispatch(clearReferences());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentAnswer && isEditMode) {
      const formattedData = {
        type: currentAnswer.type || '',
        referenceId: currentAnswer.referenceId?._id || '',
        referenceModel: currentAnswer.referenceModel || '',
        directWebURL: currentAnswer.directWebURL || '',
        linkMenuField: currentAnswer.linkMenuField || '',
        postTypeDetails: currentAnswer.postTypeDetails || '',
        description: currentAnswer.description || '',
        examName: currentAnswer.examName || '',
        publishDate: currentAnswer.publishDate ? new Date(currentAnswer.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        lastDate: currentAnswer.lastDate ? new Date(currentAnswer.lastDate).toISOString().split('T')[0] : '',
        status: currentAnswer.status || 'pending',
        answerStatus: currentAnswer.answerStatus || 'active',
        category: currentAnswer.category || '',
        tags: currentAnswer.tags || [],
        dynamicContent: currentAnswer.dynamicContent || [],
        contentSections: currentAnswer.contentSections || [],
        importantInstructions: currentAnswer.importantInstructions || [],
        documentsRequired: currentAnswer.documentsRequired || []
      };

      setFormData(formattedData);

      if (currentAnswer.referenceId) {
        setSelectedReference(currentAnswer.referenceId);
      }

      // Set existing uploaded file data from current answer
      const existingFileData = {};
      const existingFileNamesData = {};
      Object.keys(fileTypeLabels).forEach(key => {
        if (currentAnswer[key] && currentAnswer[key].fileUrl) {
          existingFileData[key] = currentAnswer[key];
          existingFileNamesData[key] = currentAnswer[key].fileName || '';
        }
      });
      setUploadedFileData(existingFileData);
      setFileNames(existingFileNamesData);
    }
  }, [currentAnswer, isEditMode]);

  useEffect(() => {
    if (formData.type && formData.type !== 'Other' && showAlsoShowLink) {
      setIsSearching(true);
      dispatch(fetchAvailableReferences({ type: formData.type, search: referenceSearch || '' }))
        .finally(() => setIsSearching(false));
    }
  }, [formData.type, showAlsoShowLink, dispatch]);

  useEffect(() => {
    if (formData.type && formData.type !== 'Other' && referenceSearch.trim() && showAlsoShowLink) {
      setIsSearching(true);
      const debounceTimer = setTimeout(() => {
        dispatch(fetchAvailableReferences({ type: formData.type, search: referenceSearch }))
          .finally(() => setIsSearching(false));
      }, 500);

      return () => {
        clearTimeout(debounceTimer);
        setIsSearching(false);
      };
    }
  }, [referenceSearch, formData.type, dispatch, showAlsoShowLink]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.linkMenuField || !formData.linkMenuField.trim()) {
      newErrors.linkMenuField = 'Link menu field is required';
    }

    if (!formData.examName || !formData.examName.trim()) {
      newErrors.examName = 'Exam name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Upload individual file immediately when selected
   * Calls POST /api/upload/single and stores the returned file data
   */
  const uploadFileImmediately = async (fieldName, file) => {
    if (!file) return null;

    try {
      // Start upload for this specific file
      setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));

      // Use custom name if provided
      const customName = fileNames[fieldName] || file.name;

      // Call upload service - pass file directly, not FormData
      const result = await uploadService.uploadSingleFile(file, fieldName, customName);

      if (result.success && result.data) {
        // Store the uploaded file data with structure matching backend expectations
        const uploadedFileInfo = {
          fileUrl: result.data.fileUrl,
          fileName: result.data.fileName || customName,
          cloudinaryId: result.data.cloudinaryId,
          fileType: result.data.fileType || result.data.format,
          uploadedAt: new Date().toISOString()
        };

        setUploadedFileData(prev => ({
          ...prev,
          [fieldName]: uploadedFileInfo
        }));

        toast.success(`${fileTypeLabels[fieldName]} uploaded successfully!`);
        return uploadedFileInfo;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      toast.error(`Failed to upload ${fileTypeLabels[fieldName]}: ${error.message}`);
      return null;
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  /**
   * Handle form submission - now just uses already uploaded files
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submit data with already uploaded file URLs
      const submitData = {
        type: formData.type,
        linkMenuField: formData.linkMenuField.trim(),
        postTypeDetails: formData.postTypeDetails.trim(),
        description: formData.description.trim(),
        examName: formData.examName.trim(),
        publishDate: formData.publishDate,
        answerStatus: formData.answerStatus,
        status: formData.status,
        category: formData.category.trim(),
        tags: formData.tags,
        dynamicContent: formData.dynamicContent,
        contentSections: formData.contentSections,
        importantInstructions: formData.importantInstructions,
        documentsRequired: formData.documentsRequired
      };

      // Add optional fields
      if (formData.type !== 'Other' && formData.referenceId) {
        submitData.referenceId = formData.referenceId;
        submitData.referenceModel = formData.referenceModel;
      }

      if (formData.directWebURL && formData.directWebURL.trim()) {
        submitData.directWebURL = formData.directWebURL.trim();
      }

      if (formData.lastDate) {
        submitData.lastDate = formData.lastDate;
      }

      // Add uploaded file URLs
      Object.keys(uploadedFileData).forEach(fieldName => {
        if (uploadedFileData[fieldName]) {
          submitData[fieldName] = uploadedFileData[fieldName];
        }
      });

      // Step 3: Submit the form with JSON data
      if (isEditMode) {
        await dispatch(updateAnswer({ id, formData: submitData })).unwrap();
        toast.success('Answer updated successfully!');
      } else {
        await dispatch(createAnswer(submitData)).unwrap();
        toast.success('Answer created successfully!');
      }

      navigate(`/${userRole}/answers`);
    } catch (error) {
      toast.error(error?.message || 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTypeSelect = (e) => {
    const type = e.target.value;
    setFormData(prev => ({ ...prev, type }));
    setSelectedReference(null);
    setReferenceSearch('');
    setShowAlsoShowLink(false);
    setErrors(prev => ({ ...prev, type: null, referenceId: null }));
  };

  const handleReferenceSelect = (reference) => {
    setSelectedReference(reference);
    setFormData(prev => ({
      ...prev,
      referenceId: reference._id,
      referenceModel: reference.referenceModel || formData.type,
      postTypeDetails: reference.postName || reference.departmentName || reference.title || reference.name || '',
      examName: reference.postName || reference.departmentName || reference.title || reference.name || ''
    }));
    setReferenceSearch('');
    setShowAlsoShowLink(false);
    setShowReferenceDropdown(false);
    setErrors(prev => ({ ...prev, referenceId: null }));
  };

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    // Store file object
    setFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));

    // Auto-set file name from uploaded file if not already set
    if (!fileNames[fieldName]) {
      setFileNames(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }

    // Show custom name input for "Other File"
    if (fieldName === 'otherFile') {
      setShowOtherFileName(true);
    }

    // Start immediate upload
    await uploadFileImmediately(fieldName, file);
  };

  const handleFileNameChange = (e, fieldName) => {
    const newName = e.target.value;
    setFileNames(prev => ({
      ...prev,
      [fieldName]: newName
    }));

    // If file is already uploaded and we change the name, we might want to re-upload
    // For simplicity, we'll just update the name in uploadedFileData
    if (uploadedFileData[fieldName]) {
      setUploadedFileData(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          fileName: newName
        }
      }));
    }
  };

  const removeFile = async (fieldName) => {
    // Delete from Cloudinary if file was already uploaded
    const uploadedFile = uploadedFileData[fieldName];
    if (uploadedFile?.cloudinaryId) {
      try {
        await uploadService.deleteFile(uploadedFile.cloudinaryId, uploadedFile.fileUrl);
      } catch (error) {
        console.error('Failed to delete file from cloud:', error);
        // Continue with local removal even if cloud delete fails
      }
    }

    // Clear file object
    setFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));

    // Clear uploaded file data
    setUploadedFileData(prev => ({
      ...prev,
      [fieldName]: null
    }));

    // Clear file name
    setFileNames(prev => ({
      ...prev,
      [fieldName]: ''
    }));

    // Hide custom name input for otherFile
    if (fieldName === 'otherFile') {
      setShowOtherFileName(false);
    }

    toast.info(`${fileTypeLabels[fieldName]} removed`);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getFilteredReferences = () => {
    if (!references || references.length === 0) return [];

    // Handle the case where API returns { jobs: [], admissions: [], notices: [] }
    if (Array.isArray(references)) {
      return references;
    } else if (references.jobs || references.admissions || references.notices) {
      const allRefs = [
        ...(references.jobs || []),
        ...(references.admissions || []),
        ...(references.notices || [])
      ];
      return allRefs;
    }

    return [];
  };

  // Check if there's a file (either uploaded or being uploaded)
  const hasFile = (fieldName) => {
    return uploadedFileData[fieldName] !== null || files[fieldName] !== null;
  };

  // Check if file is currently uploading
  const isFileUploading = (fieldName) => {
    return uploadingFiles[fieldName];
  };

  // Get display file name
  const getDisplayFileName = (fieldName) => {
    if (uploadedFileData[fieldName]) {
      return uploadedFileData[fieldName].fileName || 'Uploaded file';
    }
    if (files[fieldName]) {
      return files[fieldName].name;
    }
    return '';
  };

  // Get file status
  const getFileStatus = (fieldName) => {
    if (isFileUploading(fieldName)) return 'uploading';
    if (uploadedFileData[fieldName]) return 'uploaded';
    if (files[fieldName]) return 'selected'; // File selected but not uploaded yet (shouldn't happen with immediate upload)
    return 'none';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/${userRole}/answers`)}
              className="p-2 rounded-lg hover:bg-white/60 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Answer' : 'Create New Answer'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode ? 'Update answer key details' : 'Add a new answer key to the system'}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Type Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeSelect}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.type ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.type}
              </p>
            )}
          </div>

          {/* Reference Selection (if not Other) */}
          {formData.type && formData.type !== 'Other' && (
            <div className="space-y-4 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Link to {formData.type}
                </label>
                <button
                  type="button"
                  onClick={() => setShowAlsoShowLink(!showAlsoShowLink)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAlsoShowLink ? 'Hide' : 'Select from existing'}
                </button>
              </div>

              {showAlsoShowLink && (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={referenceSearch}
                      onChange={(e) => setReferenceSearch(e.target.value)}
                      onFocus={() => setShowReferenceDropdown(true)}
                      placeholder={`Search ${formData.type}...`}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Reference Dropdown */}
                  {showReferenceDropdown && getFilteredReferences().length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-100 max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                      ) : (
                        getFilteredReferences().map((ref) => (
                          <button
                            key={ref._id}
                            type="button"
                            onClick={() => handleReferenceSelect(ref)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {ref.postName || ref.departmentName || ref.title || ref.name}
                            </div>
                            {ref.publishDate && (
                              <div className="text-sm text-gray-500">
                                {new Date(ref.publishDate).toLocaleDateString()}
                              </div>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Selected Reference Display */}
              {selectedReference && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900">Selected {formData.type}</span>
                      </div>
                      <p className="text-gray-700">
                        {selectedReference.postName || selectedReference.departmentName || selectedReference.title || selectedReference.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReference(null);
                        setFormData(prev => ({
                          ...prev,
                          referenceId: '',
                          referenceModel: ''
                        }));
                      }}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Link Menu Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Link Menu Field <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="linkMenuField"
              value={formData.linkMenuField}
              onChange={handleInputChange}
              placeholder="e.g., SSC CGL Answer Key 2024"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.linkMenuField ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.linkMenuField && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.linkMenuField}
              </p>
            )}
          </div>

          {/* Post Type Details */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Post Type Details
            </label>
            <input
              type="text"
              name="postTypeDetails"
              value={formData.postTypeDetails}
              onChange={handleInputChange}
              placeholder="e.g., Combined Graduate Level Examination"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Exam Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleInputChange}
              placeholder="e.g., SSC CGL Tier 1 2024"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.examName ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.examName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.examName}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter answer key details..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Publish Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Last Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* File Uploads Section - IMMEDIATE UPLOAD */}
          <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              File Uploads
              <span className="text-sm font-normal text-gray-500">(Files upload immediately when selected)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(fileTypeLabels).map((fieldName) => {
                const fileStatus = getFileStatus(fieldName);
                const isUploading = isFileUploading(fieldName);
                const isUploaded = fileStatus === 'uploaded';

                return (
                  <div key={fieldName} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {fileTypeLabels[fieldName]}
                      {isUploading && (
                        <span className="ml-2 text-xs text-blue-600">
                          <Loader2 className="inline w-3 h-3 animate-spin mr-1" />
                          Uploading...
                        </span>
                      )}
                      {isUploaded && (
                        <Check className="inline w-4 h-4 text-green-500 ml-1" />
                      )}
                    </label>

                    {hasFile(fieldName) ? (
                      <div className={`p-4 rounded-lg border-2 ${
                        isUploading 
                          ? 'border-blue-300 bg-blue-50' 
                          : isUploaded 
                          ? 'border-green-200 bg-white'
                          : 'border-yellow-200 bg-yellow-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <File className={`w-5 h-5 flex-shrink-0 ${
                              isUploading ? 'text-blue-500' : isUploaded ? 'text-green-500' : 'text-yellow-500'
                            }`} />
                            <span className="text-sm text-gray-700 truncate">
                              {getDisplayFileName(fieldName)}
                            </span>
                            {isUploading && (
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                                Uploading
                              </span>
                            )}
                            {isUploaded && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                Uploaded
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(fieldName)}
                            disabled={isUploading}
                            className="ml-2 p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>

                        {/* Custom name input for otherFile */}
                        {fieldName === 'otherFile' && showOtherFileName && (
                          <div className="mt-3">
                            <input
                              type="text"
                              value={fileNames.otherFile}
                              onChange={(e) => handleFileNameChange(e, 'otherFile')}
                              placeholder="Enter custom file name"
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {isUploaded && (
                              <p className="text-xs text-gray-500 mt-1">
                                Changing name will update in database on form submit
                              </p>
                            )}
                          </div>
                        )}

                        {/* View uploaded file link */}
                        {isUploaded && uploadedFileData[fieldName]?.fileUrl && (
                          <a
                            href={uploadedFileData[fieldName].fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-xs text-blue-600 hover:underline block"
                          >
                            View uploaded file
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          id={`file-${fieldName}`}
                          onChange={(e) => handleFileChange(e, fieldName)}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          className="hidden"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor={`file-${fieldName}`}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                            isUploading
                              ? 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed'
                              : 'bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {isUploading ? 'Uploading...' : 'Choose file'}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>• Files upload immediately when selected</p>
              <p>• Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX (Max 10MB per file)</p>
              <p>• Uploaded files will be saved even if you cancel the form</p>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag and press Enter"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Government Exam"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Direct Web URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Direct Web URL (Optional)
            </label>
            <input
              type="url"
              name="directWebURL"
              value={formData.directWebURL}
              onChange={handleInputChange}
              placeholder="https://example.com/answer-key"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(`/${userRole}/answers`)}
              disabled={isSubmitting || Object.values(uploadingFiles).some(v => v)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isSubmitting || Object.values(uploadingFiles).some(v => v)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditMode ? 'Update Answer' : 'Create Answer'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerForm;