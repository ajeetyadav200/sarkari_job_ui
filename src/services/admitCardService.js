import api from './api.js';

class AdmitCardService {
  // Create new admit card
  createAdmitCard = (data) => {
    return api.request('/api/admit-cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  // Get all admit cards with filters
  getAllAdmitCards = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admit-cards${queryString ? `?${queryString}` : ''}`);
  };

  // Get single admit card by ID
  getAdmitCardById = (id) => {
    return api.request(`/api/admit-cards/${id}`);
  };

  // Update admit card
  updateAdmitCard = (id, data) => {
    return api.request(`/api/admit-cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  // Update status (admin only)
  updateStatus = (id, data) => {
    return api.request(`/api/admit-cards/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  // Delete admit card
  deleteAdmitCard = (id) => {
    return api.request(`/api/admit-cards/${id}`, {
      method: 'DELETE',
    });
  };

  // Get admit cards by job ID
  getAdmitCardsByJobId = (jobId) => {
    return api.request(`/api/admit-cards/job/${jobId}`);
  };

  // Get public admit cards
  getPublicAdmitCards = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admit-cards/public${queryString ? `?${queryString}` : ''}`);
  };

  // ✅ ADD THIS METHOD: Get available references for job selection
  getAvailableReferences = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admit-cards/references/available${queryString ? `?${queryString}` : ''}`);
  };

  // Filter methods for admin dashboard
  getPendingAdmitCards = (params = {}) => {
    const queryParams = { ...params, status: 'pending' };
    return this.getAllAdmitCards(queryParams);
  };

  getVerifiedAdmitCards = (params = {}) => {
    const queryParams = { ...params, status: 'verified' };
    return this.getAllAdmitCards(queryParams);
  };

  getRejectedAdmitCards = (params = {}) => {
    const queryParams = { ...params, status: 'rejected' };
    return this.getAllAdmitCards(queryParams);
  };

  getOnHoldAdmitCards = (params = {}) => {
    const queryParams = { ...params, status: 'onHold' };
    return this.getAllAdmitCards(queryParams);
  };
}

export default new AdmitCardService();