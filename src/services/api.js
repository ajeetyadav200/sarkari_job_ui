

// services/api.js
import { BASE_URL } from '../utils/auth';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      // Handle non-JSON responses
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
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth APIs
  auth = {
    login: (credentials) => this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    logout: () => this.request('/api/auth/logout', { method: 'POST' }),
    getProfile: () => this.request('/api/auth/me'),
    updateProfile: (data) => this.request('/api/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  };

  // Assistant APIs
  assistants = {
    getAll: () => this.request('/api/auth/assistants'),
    getById: (id) => this.request(`/api/auth/assistants/${id}`),
    create: (data) => this.request('/api/auth/assistants', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => this.request(`/api/auth/assistants/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id) => this.request(`/api/auth/assistants/${id}`, {
      method: 'DELETE',
    }),
  };

  // Publisher APIs
  publishers = {
    getAll: () => this.request('/api/auth/publishers'),
    getById: (id) => this.request(`/api/auth/publishers/${id}`),
    create: (data) => this.request('/api/auth/publishers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => this.request(`/api/auth/publishers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id) => this.request(`/api/auth/publishers/${id}`, {
      method: 'DELETE',
    }),
    logout: (id) => this.request(`/api/auth/publishers/${id}/logout`, {
      method: 'POST',
    })
  };

  // Job APIs - FIXED
  jobs = {
    // Public endpoints
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;
      return this.request(url);
    },
    getList: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/jobs/list${queryString ? `?${queryString}` : ''}`;
      return this.request(url);
    },
    search: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/jobs/search${queryString ? `?${queryString}` : ''}`);
    },
    getOpenJobs: () => this.request('/api/jobs/open'),
    getById: (id) => this.request(`/api/jobs/${id}`),
    
    // Protected endpoints
    getMyJobs: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/jobs/my/jobs${queryString ? `?${queryString}` : ''}`);
    },
    create: (data) => this.request('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => this.request(`/api/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => this.request(`/api/jobs/${id}`, {
      method: 'DELETE',
    }),
    changeStatus: (id, status, remark = '') => this.request(`/api/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, remark }),
    }),
    getStats: () => this.request('/api/jobs/admin/stats'),
    
    // Filtered jobs endpoints for admin dashboard
    getPendingJobs: (params = {}) => {
      const queryParams = { ...params, status: 'pending' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/jobs${queryString ? `?${queryString}` : ''}`);
    },
    getOnHoldJobs: (params = {}) => {
      const queryParams = { ...params, status: 'onHold' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/jobs${queryString ? `?${queryString}` : ''}`);
    },
    getRejectedJobs: (params = {}) => {
      const queryParams = { ...params, status: 'rejected' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/jobs${queryString ? `?${queryString}` : ''}`);
    },
    getVerifiedJobs: (params = {}) => {
      const queryParams = { ...params, status: 'verified' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/jobs${queryString ? `?${queryString}` : ''}`);
    }
  };

  // Admission APIs
  admissions = {
    // Public endpoints
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/admissions/public${queryString ? `?${queryString}` : ''}`;
      return this.request(url);
    },
    getList: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/admissions/list${queryString ? `?${queryString}` : ''}`;
      return this.request(url);
    },
    getLatest: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/admissions/latest${queryString ? `?${queryString}` : ''}`);
    },
    search: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/admissions/search${queryString ? `?${queryString}` : ''}`);
    },
    getOpenAdmissions: () => this.request('/api/admissions/open'),
    getById: (id) => this.request(`/api/admissions/${id}`),

    // Protected endpoints
    getMyAdmissions: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/admissions/my/admissions${queryString ? `?${queryString}` : ''}`);
    },
    create: (data) => this.request('/api/admissions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => this.request(`/api/admissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => this.request(`/api/admissions/${id}`, {
      method: 'DELETE',
    }),
    changeStatus: (id, status, remark = '', rejectionReason = '') => this.request(`/api/admissions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, remark, rejectionReason }),
    }),
    getStats: () => this.request('/api/admissions/admin/stats'),

    // Filtered admissions endpoints for admin dashboard
    getPendingAdmissions: (params = {}) => {
      const queryParams = { ...params, status: 'pending' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
    },
    getClosedAdmissions: (params = {}) => {
      const queryParams = { ...params, status: 'closed' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
    },
    getRejectedAdmissions: (params = {}) => {
      const queryParams = { ...params, status: 'rejected' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
    },
    getVerifiedAdmissions: (params = {}) => {
      const queryParams = { ...params, status: 'verified' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
    },
    getArchivedAdmissions: (params = {}) => {
      const queryParams = { ...params, status: 'archived' };
      const queryString = new URLSearchParams(queryParams).toString();
      return this.request(`/api/admissions/public${queryString ? `?${queryString}` : ''}`);
    }
  };

  // User Management APIs
  users = {
    create: (data) => this.request('/api/auth/create-user', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    unlockAccount: (userId) => this.request(`/api/auth/unlock-account/${userId}`, {
      method: 'POST',
    }),
    unlockIP: (ipAddress) => this.request(`/api/auth/unlock-ip/${ipAddress}`, {
      method: 'POST',
    }),
  };

  // Permission APIs
  permissions = {
    // Get all users with permissions
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/api/permissions${queryString ? `?${queryString}` : ''}`);
    },
    // Get my permissions
    getMyPermissions: () => this.request('/api/permissions/me'),
    // Get available modules and actions
    getModulesAndActions: () => this.request('/api/permissions/modules'),
    // Get specific user's permission
    getUserPermission: (userId) => this.request(`/api/permissions/${userId}`),
    // Update user's permission
    updatePermission: (userId, data) => this.request(`/api/permissions/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    // Reset user's permission to default
    resetPermission: (userId) => this.request(`/api/permissions/${userId}/reset`, {
      method: 'POST',
    }),
    // Bulk update permissions
    bulkUpdate: (data) => this.request('/api/permissions/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  };
}

export default new ApiService();