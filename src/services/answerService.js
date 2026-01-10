// services/answerService.js
import api from './api';

/**
 * Answer Service - Industry Standard Pattern
 *
 * File Upload Pattern:
 * 1. Upload files using uploadService -> Get file URLs
 * 2. Submit form with URLs using this service (JSON)
 *
 * This separates concerns and makes the code more scalable
 */

class AnswerService {
  /**
   * Create new answer with file URLs (not FormData)
   * Files should be uploaded first using uploadService
   * @param {Object} data - Answer data with file URLs
   */
  createAnswer = (data) => {
    return api.request('/api/answers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /**
   * Get all answers with filters
   * @param {Object} params - Query parameters
   */
  getAllAnswers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get single answer by ID
   * @param {string} id - Answer ID
   */
  getAnswerById = (id) => {
    return api.request(`/api/answers/${id}`);
  };

  /**
   * Update answer with file URLs (not FormData)
   * New files should be uploaded first using uploadService
   * @param {string} id - Answer ID
   * @param {Object} data - Answer data with file URLs
   */
  updateAnswer = (id, data) => {
    return api.request(`/api/answers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  /**
   * Update status (admin only)
   * @param {string} id - Answer ID
   * @param {Object} data - Status data
   */
  updateStatus = (id, data) => {
    return api.request(`/api/answers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  /**
   * Delete answer
   * @param {string} id - Answer ID
   */
  deleteAnswer = (id) => {
    return api.request(`/api/answers/${id}`, {
      method: 'DELETE',
    });
  };

  /**
   * Get answers by job ID
   * @param {string} jobId - Job ID
   */
  getAnswersByJobId = (jobId) => {
    return api.request(`/api/answers/job/${jobId}`);
  };

  /**
   * Get public answers
   * @param {Object} params - Query parameters
   */
  getPublicAnswers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers/public${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get answers list with infinite scrolling
   * @param {Object} params - Query parameters
   */
  getAnswersList = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers/list${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get available references for answer selection
   * @param {Object} params - Query parameters
   */
  getAvailableReferences = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers/references/available${queryString ? `?${queryString}` : ''}`);
  };

  // Filter methods for dashboard
  getPendingAnswers = (params = {}) => {
    const queryParams = { ...params, status: 'pending' };
    return this.getAllAnswers(queryParams);
  };

  getVerifiedAnswers = (params = {}) => {
    const queryParams = { ...params, status: 'verified' };
    return this.getAllAnswers(queryParams);
  };

  getRejectedAnswers = (params = {}) => {
    const queryParams = { ...params, status: 'rejected' };
    return this.getAllAnswers(queryParams);
  };

  getOnHoldAnswers = (params = {}) => {
    const queryParams = { ...params, status: 'onHold' };
    return this.getAllAnswers(queryParams);
  };
}

export default new AnswerService();
