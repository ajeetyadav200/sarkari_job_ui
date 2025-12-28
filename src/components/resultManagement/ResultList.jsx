// components/ResultManagement/ResultList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  fetchResults,
  deleteResult,
  updateResultStatus,
  setFilters
} from '../../slice/resultSlice';
import { toast } from 'react-toastify';
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  PauseCircle,
  Search,
  Filter,
  Plus,
  Award,
  Calendar,
  User
} from 'lucide-react';

const ResultList = ({ userRole = 'admin', mode = 'all' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { list, loading, error, pagination, filters } = useSelector(state => state.results);
  const { user } = useSelector(state => state.user);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const initialFilters = {};
    
    if (mode === 'my') {
      initialFilters.createdBy = user._id;
    } else if (mode === 'pending') {
      initialFilters.status = 'pending';
    } else if (mode === 'verified') {
      initialFilters.status = 'verified';
    } else if (mode === 'rejected') {
      initialFilters.status = 'rejected';
    } else if (mode === 'onHold') {
      initialFilters.status = 'onHold';
    }
    
    dispatch(setFilters(initialFilters));
    loadResults();
  }, [mode, user._id, dispatch]);

  useEffect(() => {
    loadResults();
  }, [filters]);

  const loadResults = () => {
    const queryParams = { 
      ...filters, 
      page: pagination.currentPage,
      limit: 10
    };
    dispatch(fetchResults(queryParams));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    dispatch(setFilters({ status: status || '' }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      await dispatch(deleteResult(id));
      loadResults();
    }
  };

  const handleStatusUpdate = async (id, status) => {
    if (status === 'rejected') {
      const reason = prompt('Please enter rejection reason:');
      if (!reason) {
        toast.error('Rejection reason is required');
        return;
      }
      await dispatch(updateResultStatus({ id, status, rejectionReason: reason }));
    } else {
      await dispatch(updateResultStatus({ id, status }));
    }
    loadResults();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'warning',
      verified: 'success',
      rejected: 'danger',
      onHold: 'info'
    };
    return statusMap[status] || 'secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getPageTitle = () => {
    const titles = {
      all: 'All Results',
      my: 'My Results',
      pending: 'Pending Results',
      verified: 'Verified Results',
      rejected: 'Rejected Results',
      onHold: 'On Hold Results'
    };
    return titles[mode] || 'Results';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700">
          <XCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h2>
            <p className="text-gray-600 mt-1">
              {mode === 'my' ? 'Your results' : `Manage all ${mode} results`}
            </p>
          </div>
          <div>
            {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
              <Link 
                to={`/${userRole}/results/create`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Create New Result
              </Link>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search by exam name, details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
                <option value="onHold">On Hold</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('');
                  dispatch(setFilters({ search: '', status: '' }));
                }}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publish Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">No results found</p>
                    <p className="text-sm mt-1">
                      {searchTerm || selectedStatus 
                        ? 'Try adjusting your search criteria'
                        : 'No results available'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              list.map((result) => (
                <tr key={result._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {result.examName || result.postTypeDetails}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.resultType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      result.type === 'Job' ? 'bg-blue-100 text-blue-800' :
                      result.type === 'Admission' ? 'bg-indigo-100 text-indigo-800' :
                      result.type === 'LatestNotice' ? 'bg-pink-100 text-pink-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {result.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.status === 'verified' ? 'bg-green-100 text-green-800' :
                        result.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        result.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.resultStatus === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {result.resultStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {result.createdByDetails?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.createdByDetails?.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(result.publishDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/${userRole}/results/${result._id}`}
                        className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      {(userRole === 'admin' || result.createdBy === user._id) && (
                        <Link
                          to={`/${userRole}/results/${result._id}/edit`}
                          className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      )}
                      
                      {userRole === 'admin' && (
                        <>
                          {result.status !== 'verified' && (
                            <button
                              onClick={() => handleStatusUpdate(result._id, 'verified')}
                              className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                              title="Verify"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {result.status !== 'rejected' && (
                            <button
                              onClick={() => handleStatusUpdate(result._id, 'rejected')}
                              className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {result.status !== 'onHold' && (
                            <button
                              onClick={() => handleStatusUpdate(result._id, 'onHold')}
                              className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded"
                              title="Put on Hold"
                            >
                              <PauseCircle className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                      
                      {(userRole === 'admin' || result.createdBy === user._id) && (
                        <button
                          onClick={() => handleDelete(result._id)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(pagination.currentPage * pagination.limit, pagination.total)}
              </span> of{' '}
              <span className="font-medium">{pagination.total}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(setFilters({ page: pagination.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.currentPage - 2)) + idx;
                if (pageNum > pagination.totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => dispatch(setFilters({ page: pageNum }))}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      pagination.currentPage === pageNum
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => dispatch(setFilters({ page: pagination.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;