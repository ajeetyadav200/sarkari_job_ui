// import api from './api.js';

// class ResultService {
//   // Create new result
//   createResult = (data) => {
//     return api.request('/api/results', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   };

//   // Get all results with filters
//   getAllResults = (params = {}) => {
//     const queryString = new URLSearchParams(params).toString();
//     return api.request(`/api/results${queryString ? `?${queryString}` : ''}`);
//   };

//   // Get single result by ID
//   getResultById = (id) => {
//     return api.request(`/api/results/${id}`);
//   };

//   // Update result
//   updateResult = (id, data) => {
//     return api.request(`/api/results/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(data),
//     });
//   };

//   // Update status (admin only)
//   updateStatus = (id, data) => {
//     return api.request(`/api/results/${id}/status`, {
//       method: 'PATCH',
//       body: JSON.stringify(data),
//     });
//   };

//   // Delete result
//   deleteResult = (id) => {
//     return api.request(`/api/results/${id}`, {
//       method: 'DELETE',
//     });
//   };

//   // Get results by job ID
//   getResultsByJobId = (jobId) => {
//     return api.request(`/api/results/job/${jobId}`);
//   };

//   // Get public results
//   getPublicResults = (params = {}) => {
//     const queryString = new URLSearchParams(params).toString();
//     return api.request(`/api/results/public${queryString ? `?${queryString}` : ''}`);
//   };

//   // Get available references for result selection
//   getAvailableReferences = (params = {}) => {
//     const queryString = new URLSearchParams(params).toString();
//     return api.request(`/api/results/references/available${queryString ? `?${queryString}` : ''}`);
//   };

//   // Filter methods for admin dashboard
//   getPendingResults = (params = {}) => {
//     const queryParams = { ...params, status: 'pending' };
//     return this.getAllResults(queryParams);
//   };

//   getVerifiedResults = (params = {}) => {
//     const queryParams = { ...params, status: 'verified' };
//     return this.getAllResults(queryParams);
//   };

//   getRejectedResults = (params = {}) => {
//     const queryParams = { ...params, status: 'rejected' };
//     return this.getAllResults(queryParams);
//   };

//   getOnHoldResults = (params = {}) => {
//     const queryParams = { ...params, status: 'onHold' };
//     return this.getAllResults(queryParams);
//   };
// }

// export default new ResultService();

// services/resultService.js
import api from './api';

class ResultService {
  // Create new result
  createResult = (data) => {
    return api.request('/api/results', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  // Get all results with filters
  getAllResults = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/results${queryString ? `?${queryString}` : ''}`);
  };

  // Get single result by ID
  getResultById = (id) => {
    return api.request(`/api/results/${id}`);
  };

  // Update result
  updateResult = (id, data) => {
    return api.request(`/api/results/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  // Update status (admin only)
  updateStatus = (id, data) => {
    return api.request(`/api/results/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  // Delete result
  deleteResult = (id) => {
    return api.request(`/api/results/${id}`, {
      method: 'DELETE',
    });
  };

  // Get results by job ID
  getResultsByJobId = (jobId) => {
    return api.request(`/api/results/job/${jobId}`);
  };

  // Get public results
  getPublicResults = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/results/public${queryString ? `?${queryString}` : ''}`);
  };

  // Get results list with infinite scrolling
  getResultsList = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/results/list${queryString ? `?${queryString}` : ''}`);
  };

  // Get available references for reference selection
  getAvailableReferences = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.request(`/api/results/references/available${queryString ? `?${queryString}` : ''}`);
  };

  // Filter methods for dashboard
  getPendingResults = (params = {}) => {
    const queryParams = { ...params, status: 'pending' };
    return this.getAllResults(queryParams);
  };

  getVerifiedResults = (params = {}) => {
    const queryParams = { ...params, status: 'verified' };
    return this.getAllResults(queryParams);
  };

  getRejectedResults = (params = {}) => {
    const queryParams = { ...params, status: 'rejected' };
    return this.getAllResults(queryParams);
  };

  getOnHoldResults = (params = {}) => {
    const queryParams = { ...params, status: 'onHold' };
    return this.getAllResults(queryParams);
  };
}

export default new ResultService();