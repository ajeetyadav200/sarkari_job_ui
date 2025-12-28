

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
}

export default new ApiService();