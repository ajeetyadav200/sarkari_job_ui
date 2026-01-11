// services/governmentServiceService.js
import api from './api';

/**
 * Government Service - Handles Scholarships, Certificates, Registrations, etc.
 *
 * File Upload Pattern:
 * 1. Upload files using uploadService -> Get file URLs
 * 2. Submit form with URLs using this service (JSON)
 */

class GovernmentServiceService {
  /**
   * Create new government service with file URLs (not FormData)
   * @param {Object} data - Service data with file URLs
   */
  createService = (data) => {
    return api.request('/api/government-services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /**
   * Get all government services with filters
   * @param {Object} params - Query parameters
   */
  getAllServices = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/government-services${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get single service by ID or slug
   * @param {string} id - Service ID or slug
   */
  getServiceById = (id) => {
    return api.request(`/api/government-services/${id}`);
  };

  /**
   * Update service with file URLs
   * @param {string} id - Service ID
   * @param {Object} data - Service data with file URLs
   */
  updateService = (id, data) => {
    return api.request(`/api/government-services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  /**
   * Update status (admin only)
   * @param {string} id - Service ID
   * @param {Object} data - Status data
   */
  updateStatus = (id, data) => {
    return api.request(`/api/government-services/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  /**
   * Delete service
   * @param {string} id - Service ID
   */
  deleteService = (id) => {
    return api.request(`/api/government-services/${id}`, {
      method: 'DELETE',
    });
  };

  /**
   * Get public services (verified and active only)
   * @param {Object} params - Query parameters
   */
  getPublicServices = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/government-services/public${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get services list with infinite scrolling
   * @param {Object} params - Query parameters
   */
  getServicesList = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/government-services/list${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get services by type (scholarship, certificate, etc.)
   * @param {string} serviceType - Service type
   * @param {Object} params - Query parameters
   */
  getServicesByType = (serviceType, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/government-services/by-type/${serviceType}${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * Get available service types and categories
   */
  getServiceTypes = () => {
    return api.request('/api/government-services/types');
  };

  /**
   * Get statistics
   */
  getStatistics = () => {
    return api.request('/api/government-services/admin/statistics');
  };

  /**
   * Record apply button click
   * @param {string} id - Service ID
   */
  recordApplyClick = (id) => {
    return api.request(`/api/government-services/${id}/apply-click`, {
      method: 'POST',
    });
  };

  // Filter methods for dashboard
  getPendingServices = (params = {}) => {
    return this.getAllServices({ ...params, status: 'pending' });
  };

  getVerifiedServices = (params = {}) => {
    return this.getAllServices({ ...params, status: 'verified' });
  };

  getRejectedServices = (params = {}) => {
    return this.getAllServices({ ...params, status: 'rejected' });
  };

  getOnHoldServices = (params = {}) => {
    return this.getAllServices({ ...params, status: 'onHold' });
  };

  // Service type specific methods
  getScholarships = (params = {}) => {
    return this.getServicesByType('scholarship', params);
  };

  getCertificates = (params = {}) => {
    return this.getServicesByType('certificate', params);
  };

  getRegistrations = (params = {}) => {
    return this.getServicesByType('registration', params);
  };

  getVerifications = (params = {}) => {
    return this.getServicesByType('verification', params);
  };

  getGovernmentSchemes = (params = {}) => {
    return this.getServicesByType('governmentScheme', params);
  };

  getWelfareSchemes = (params = {}) => {
    return this.getServicesByType('welfareScheme', params);
  };
}

export default new GovernmentServiceService();
