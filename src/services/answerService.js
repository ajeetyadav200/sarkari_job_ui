import api from './api';
import { BASE_URL } from '../utils/auth';

class AnswerService {
  // Create new answer with files
  createAnswer = async (formData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/answers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - browser will set it with boundary for FormData
      },
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  };

  // Get all answers with filters
  getAllAnswers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers${queryString ? `?${queryString}` : ''}`);
  };

  // Get single answer by ID
  getAnswerById = (id) => {
    return api.request(`/api/answers/${id}`);
  };

  // Update answer with files
  updateAnswer = async (id, formData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/answers/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - browser will set it with boundary for FormData
      },
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  };

  // Update status (admin only)
  updateStatus = (id, data) => {
    return api.request(`/api/answers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  // Delete answer
  deleteAnswer = (id) => {
    return api.request(`/api/answers/${id}`, {
      method: 'DELETE',
    });
  };

  // Get answers by job ID
  getAnswersByJobId = (jobId) => {
    return api.request(`/api/answers/job/${jobId}`);
  };

  // Get public answers
  getPublicAnswers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers/public${queryString ? `?${queryString}` : ''}`);
  };

  // Get answers list with infinite scrolling
  getAnswersList = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/answers/list${queryString ? `?${queryString}` : ''}`);
  };

  // Get available references for answer selection
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
