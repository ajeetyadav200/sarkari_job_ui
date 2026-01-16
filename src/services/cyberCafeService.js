import api from './api.js';

class CyberCafeService {
  // Get all cyber cafes with filters
  getAllCafes = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admin/cyber-cafes${queryString ? `?${queryString}` : ''}`);
  };

  // Get cyber cafe by ID
  getCafeById = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}`);
  };

  // Verify cyber cafe
  verifyCafe = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}/verify`, {
      method: 'PATCH',
    });
  };

  // Unverify cyber cafe
  unverifyCafe = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}/unverify`, {
      method: 'PATCH',
    });
  };

  // Toggle active status
  toggleActiveStatus = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}/toggle-active`, {
      method: 'PATCH',
    });
  };

  // Unlock account
  unlockAccount = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}/unlock`, {
      method: 'PATCH',
    });
  };

  // Delete cyber cafe
  deleteCafe = (id) => {
    return api.request(`/api/admin/cyber-cafes/${id}`, {
      method: 'DELETE',
    });
  };

  // Bulk verify cafes
  bulkVerifyCafes = (cafeIds) => {
    return api.request('/api/admin/cyber-cafes/bulk-verify', {
      method: 'POST',
      body: JSON.stringify({ ids: cafeIds }),
    });
  };

  // Get dashboard stats
  getDashboardStats = () => {
    return api.request('/api/admin/cyber-cafes/dashboard-stats');
  };

  // Get cafes by status (for filtering)
  getCafesByStatus = (status, params = {}) => {
    const queryParams = { ...params, status };
    return this.getAllCafes(queryParams);
  };

  // Export cafes to CSV
  exportCafes = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/admin/cyber-cafes/export${queryString ? `?${queryString}` : ''}`, {
      responseType: 'blob',
    });
  };

  // Get available states and cities for filters
  getLocations = () => {
    return api.request('/api/admin/cyber-cafes/locations');
  };
}

export default new CyberCafeService();