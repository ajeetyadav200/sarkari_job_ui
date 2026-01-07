import api from './api.js';

class AdmissionService {
  // Create new admission
  createAdmission = (data) => {
    return api.request('/api/admissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  // Get all admissions with filters
  getAllAdmissions = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
  };

  // Get single admission by ID
  getAdmissionById = (id) => {
    return api.request(`/api/admissions/${id}`);
  };

  // Update admission
  updateAdmission = (id, data) => {
    return api.request(`/api/admissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  // Update status (admin only)
  updateStatus = (id, data) => {
    return api.request(`/api/admissions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  // Delete admission
  deleteAdmission = (id) => {
    return api.request(`/api/admissions/${id}`, {
      method: 'DELETE',
    });
  };

  // Get public admissions
  getPublicAdmissions = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
  };

  // Get admissions list with infinite scrolling
  getAdmissionsList = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/list${queryString ? `?${queryString}` : ''}`);
  };

  // Get latest admissions
  getLatestAdmissions = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/latest${queryString ? `?${queryString}` : ''}`);
  };

  // Get open admissions
  getOpenAdmissions = () => {
    return api.request('/api/admissions/open');
  };

  // Get my admissions
  getMyAdmissions = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/my/admissions${queryString ? `?${queryString}` : ''}`);
  };

  // Get admission stats (admin only)
  getStats = () => {
    return api.request('/api/admissions/admin/stats');
  };

  // Search admissions
  searchAdmissions = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admissions/search${queryString ? `?${queryString}` : ''}`);
  };

  // Filter methods for admin dashboard
  getPendingAdmissions = (params = {}) => {
    const queryParams = { ...params, status: 'pending' };
    return this.getAllAdmissions(queryParams);
  };

  getVerifiedAdmissions = (params = {}) => {
    const queryParams = { ...params, status: 'verified' };
    return this.getAllAdmissions(queryParams);
  };

  getRejectedAdmissions = (params = {}) => {
    const queryParams = { ...params, status: 'rejected' };
    return this.getAllAdmissions(queryParams);
  };

  getClosedAdmissions = (params = {}) => {
    const queryParams = { ...params, status: 'closed' };
    return this.getAllAdmissions(queryParams);
  };

  getArchivedAdmissions = (params = {}) => {
    const queryParams = { ...params, status: 'archived' };
    return this.getAllAdmissions(queryParams);
  };
}

export default new AdmissionService();
