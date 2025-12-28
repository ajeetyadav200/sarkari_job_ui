// components/ResultManagement/ResultDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  User,
  Tag,
  ExternalLink,
  List,
  Award,
  ClipboardCheck
} from 'lucide-react';

import ConfirmationModal from '../../modals/ConfirmationModal';
import { 
  fetchResults, 
  deleteResult, 
  updateResultStatus,
  clearError 
} from '../../slice/resultSlice';
import ApiService from '../../services/api';

const ResultDashboard = ({ mode = 'all', showStats = false, userRole = 'admin' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: results, loading, error, pagination } = useSelector(state => state.results);
  const user = useSelector(state => state.user);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    resultType: '',
    category: '',
    startDate: '',
    endDate: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadResults();
  }, [mode, statusFilter, filters]);

  const loadResults = async () => {
    const params = {
      page: pagination.currentPage || 1,
      limit: pagination.limit || 10,
      status: statusFilter || (mode !== 'all' ? mode : ''),
      type: filters.type,
      resultType: filters.resultType,
      category: filters.category,
      startDate: filters.startDate,
      endDate: filters.endDate,
      search: searchTerm
    };
    
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });
    
    dispatch(fetchResults(params));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadResults();
  };

  const handleViewResult = (result) => {
    navigate(`/${userRole}/results/${result._id}`);
  };

  const handleEditResult = (result) => {
    navigate(`/${userRole}/results/${result._id}/edit`);
  };

  const handleDeleteResult = (result) => {
    setModalConfig({
      isOpen: true,
      type: 'delete',
      data: {
        title: 'Delete Result',
        message: `Are you sure you want to delete "${result.examName || result.postTypeDetails}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteResult(result._id)).unwrap();
          setSuccessMessage('Result deleted successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
          closeModal();
          loadResults();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = (result, newStatus) => {
    const statusMessages = {
      verified: 'Verify',
      rejected: 'Reject',
      onHold: 'Put on Hold',
      pending: 'Mark as Pending'
    };

    setModalConfig({
      isOpen: true,
      type: 'status-change',
      data: {
        title: `${statusMessages[newStatus]} Result`,
        message: `Are you sure you want to ${statusMessages[newStatus].toLowerCase()} "${result.examName || result.postTypeDetails}"?`,
        confirmText: statusMessages[newStatus],
        cancelText: 'Cancel',
        currentStatus: result.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          await dispatch(updateResultStatus({ 
            id: result._id, 
            status: newStatus 
          })).unwrap();
          setSuccessMessage(`Result ${newStatus} successfully`);
          setTimeout(() => setSuccessMessage(''), 3000);
          closeModal();
          loadResults();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleCreateResult = () => {
    navigate(`/${userRole}/results/create`);
  };

  const handleExport = async () => {
    try {
      const response = await ApiService.results.getAll({
        ...filters,
        status: statusFilter,
        limit: 1000
      });
      
      const csvData = response.data.map(result => ({
        'ID': result._id,
        'Type': result.type,
        'Exam Name': result.examName,
        'Result Type': result.resultType,
        'Status': result.status,
        'Result Status': result.resultStatus,
        'Created By': result.createdByDetails?.name,
        'Publish Date': new Date(result.publishDate).toLocaleDateString(),
        'Result Date': result.resultDate ? new Date(result.resultDate).toLocaleDateString() : '',
        'Tags': result.tags?.join(', ')
      }));

      const csv = convertToCSV(csvData);
      downloadCSV(csv, `results-${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const convertToCSV = (data) => {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => `"${row[header] || ''}"`).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: '',
      data: null,
      onConfirm: null
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const params = {
        page: newPage,
        limit: pagination.limit || 10,
        status: statusFilter || (mode !== 'all' ? mode : ''),
        ...filters,
        search: searchTerm
      };
      dispatch(fetchResults(params));
    }
  };

  const statusOptions = [
    { value: '', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'verified', label: 'Verified', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'onHold', label: 'On Hold', color: 'orange' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Job', label: 'Job' },
    { value: 'Admission', label: 'Admission' },
    { value: 'LatestNotice', label: 'Latest Notice' },
    { value: 'Other', label: 'Other' }
  ];

  const resultTypeOptions = [
    { value: '', label: 'All Result Types' },
    { value: 'Final', label: 'Final', icon: Award },
    { value: 'Provisional', label: 'Provisional', icon: FileText },
    { value: 'MeritList', label: 'Merit List', icon: List },
    { value: 'CutOff', label: 'Cut Off', icon: ClipboardCheck },
    { value: 'AnswerKey', label: 'Answer Key', icon: CheckCircle },
    { value: 'ScoreCard', label: 'Score Card', icon: FileText },
    { value: 'Other', label: 'Other', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'my' ? 'My Results' : 
               mode === 'pending' ? 'Pending Review' :
               mode === 'verified' ? 'Verified Results' :
               mode === 'rejected' ? 'Rejected Results' :
               mode === 'onHold' ? 'On Hold Results' :
               'Result Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {mode === 'my' ? 'Manage your results' : 
               'Create, manage, and track all results'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            
            {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
              <button
                onClick={handleCreateResult}
                className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                New Result
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Results</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{pagination.total || 0}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-2">0</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">0</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600 mt-2">0</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">{successMessage}</span>
          </div>
          <button 
            onClick={() => setSuccessMessage('')}
            className="text-green-800 hover:text-green-900"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
          <button 
            onClick={() => dispatch(clearError())}
            className="text-red-800 hover:text-red-900"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search results by exam name, details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <button
                type="button"
                onClick={loadResults}
                className="p-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Result Type
                  </label>
                  <select
                    value={filters.resultType}
                    onChange={(e) => setFilters({...filters, resultType: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {resultTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category..."
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ type: '', resultType: '', category: '', startDate: '', endDate: '' });
                    setSearchTerm('');
                    setStatusFilter('');
                  }}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={loadResults}
                  className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading results...</p>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((result) => (
              <div key={result._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.status === 'verified' ? 'bg-green-100 text-green-800' :
                        result.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        result.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {result.resultType || 'N/A'}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {result.type || 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {result.examName || result.postTypeDetails || 'No Title'}
                    </h3>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{result.createdByDetails?.name || 'Unknown User'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Published: {new Date(result.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  {result.resultDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Result Date: {new Date(result.resultDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {result.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            +{result.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {result.description || 'No description available'}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewResult(result)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {(userRole === 'admin' || result.createdBy === user._id) && (
                      <>
                        <button
                          onClick={() => handleEditResult(result)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteResult(result)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {userRole === 'admin' && (
                    <div className="flex items-center gap-2">
                      {result.status !== 'verified' && (
                        <button
                          onClick={() => handleStatusChange(result, 'verified')}
                          className="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors duration-200"
                        >
                          Verify
                        </button>
                      )}
                      {result.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(result, 'rejected')}
                          className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * pagination.limit, pagination.total)}
                </span> of{' '}
                <span className="font-medium">{pagination.total}</span> results
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`p-2 rounded-lg ${
                    pagination.currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                  const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.currentPage - 2)) + idx;
                  if (pageNum > pagination.totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                        pagination.currentPage === pageNum 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`p-2 rounded-lg ${
                    pagination.currentPage === pagination.totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || statusFilter || Object.values(filters).some(v => v) 
              ? 'No results match your search criteria. Try adjusting your filters.'
              : mode === 'my' 
                ? "You haven't created any results yet."
                : 'No results have been created yet.'}
          </p>
          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <button
              onClick={handleCreateResult}
              className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 inline-flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Create Your First Result
            </button>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        type={modalConfig.type}
        data={modalConfig.data}
      />
    </div>
  );
};

export default ResultDashboard;