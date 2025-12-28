// components/AdmitCardDashboard.jsx
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
  Upload
} from 'lucide-react';

import ConfirmationModal from '../../modals/ConfirmationModal';

import { 
  fetchAdmitCards, 
  deleteAdmitCard, 
  updateAdmitCardStatus,
  clearError 
} from '../../slice/admitCardSlice';
import ApiService from '../../services/api';

const AdmitCardDashboard = ({ mode = 'all', showStats = false, userRole = 'admin' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: admitCards, loading, error, pagination } = useSelector(state => state.admitCards);
  const user = useSelector(state => state.user);
  
  const [showAdmitCardForm, setShowAdmitCardForm] = useState(false);
  const [editingAdmitCard, setEditingAdmitCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filters, setFilters] = useState({
    type: '',
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
    loadAdmitCards();
  }, [mode, statusFilter, filters]);

 const loadAdmitCards = async () => {
  const params = {
    page: pagination.currentPage || 1,
    limit: pagination.limit || 10,
    status: statusFilter || (mode !== 'all' ? mode : ''),
    type: filters.type,
    category: filters.category,
    startDate: filters.startDate, // Send startDate
    endDate: filters.endDate,     // Send endDate
    search: searchTerm
  };
  
  // Remove empty values
  Object.keys(params).forEach(key => {
    if (params[key] === '' || params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });
  
  dispatch(fetchAdmitCards(params));
};

  const handleSearch = (e) => {
    e.preventDefault();
    loadAdmitCards();
  };

  const handleViewAdmitCard = (admitCard) => {
    navigate(`/${userRole}/admit-cards/${admitCard._id}`);
  };

  const handleEditAdmitCard = (admitCard) => {
    navigate(`/${userRole}/admit-cards/${admitCard._id}/edit`);
  };

  const handleDeleteAdmitCard = (admitCard) => {
    setModalConfig({
      isOpen: true,
      type: 'delete',
      data: {
        title: 'Delete Admit Card',
        message: `Are you sure you want to delete "${admitCard.postTypeDetails}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteAdmitCard(admitCard._id)).unwrap();
          setSuccessMessage('Admit card deleted successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
          closeModal();
          loadAdmitCards();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = (admitCard, newStatus) => {
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
        title: `${statusMessages[newStatus]} Admit Card`,
        message: `Are you sure you want to ${statusMessages[newStatus].toLowerCase()} "${admitCard.postTypeDetails}"?`,
        confirmText: statusMessages[newStatus],
        cancelText: 'Cancel',
        currentStatus: admitCard.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          await dispatch(updateAdmitCardStatus({ 
            id: admitCard._id, 
            status: newStatus 
          })).unwrap();
          setSuccessMessage(`Admit card ${newStatus} successfully`);
          setTimeout(() => setSuccessMessage(''), 3000);
          closeModal();
          loadAdmitCards();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleCreateAdmitCard = () => {
    navigate(`/${userRole}/admit-cards/create`);
  };

  const handleExport = async () => {
    try {
      const response = await ApiService.admitCards.getAll({
        ...filters,
        status: statusFilter,
        limit: 1000
      });
      
      const csvData = response.data.map(admitCard => ({
        'ID': admitCard._id,
        'Type': admitCard.type,
        'Post Details': admitCard.postTypeDetails,
        'Category': admitCard.category,
        'Status': admitCard.status,
        'Created By': admitCard.createdByDetails?.name,
        'Publish Date': new Date(admitCard.publishDate).toLocaleDateString(),
        'Last Date': admitCard.lastDate ? new Date(admitCard.lastDate).toLocaleDateString() : '',
        'Tags': admitCard.tags?.join(', ')
      }));

      const csv = convertToCSV(csvData);
      downloadCSV(csv, `admit-cards-${new Date().toISOString().split('T')[0]}.csv`);
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
      dispatch(fetchAdmitCards(params));
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
    { value: 'job', label: 'Job' },
    { value: 'admission', label: 'Admission' },
    { value: 'latestNotice', label: 'Latest Notice' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'my' ? 'My Admit Cards' : 
               mode === 'pending' ? 'Pending Review' :
               mode === 'verified' ? 'Verified Admit Cards' :
               mode === 'rejected' ? 'Rejected Admit Cards' :
               mode === 'onHold' ? 'On Hold Admit Cards' :
               'Admit Card Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {mode === 'my' ? 'Manage your admit cards' : 
               'Create, manage, and track all admit cards'}
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
                onClick={handleCreateAdmitCard}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                New Admit Card
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
                  <p className="text-sm font-medium text-gray-600">Total Admit Cards</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{pagination.total || 0}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search admit cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
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
                onClick={loadAdmitCards}
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category..."
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
  type="button"
  onClick={() => {
    setFilters({ type: '', category: '', startDate: '', endDate: '' });
    setSearchTerm('');
    setStatusFilter('');
  }}
  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
>
  Clear All
</button>
                <button
                  type="button"
                  onClick={loadAdmitCards}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Admit Cards List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading admit cards...</p>
        </div>
      ) : admitCards.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {admitCards.map((admitCard) => (
              <div key={admitCard._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        admitCard.status === 'verified' ? 'bg-green-100 text-green-800' :
                        admitCard.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        admitCard.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {admitCard.status.charAt(0).toUpperCase() + admitCard.status.slice(1)}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {admitCard.type || 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {admitCard.postTypeDetails || 'No Title'}
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
                    <span>{admitCard.createdByDetails?.name || 'Unknown User'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Published: {new Date(admitCard.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  {admitCard.tags && admitCard.tags.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-1">
                        {admitCard.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {admitCard.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            +{admitCard.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {admitCard.postDetails?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewAdmitCard(admitCard)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {(userRole === 'admin' || admitCard.createdBy === user._id) && (
                      <>
                        <button
                          onClick={() => handleEditAdmitCard(admitCard)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAdmitCard(admitCard)}
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
                      {admitCard.status !== 'verified' && (
                        <button
                          onClick={() => handleStatusChange(admitCard, 'verified')}
                          className="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors duration-200"
                        >
                          Verify
                        </button>
                      )}
                      {admitCard.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(admitCard, 'rejected')}
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
                          ? 'bg-blue-600 text-white' 
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
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No admit cards found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || statusFilter || Object.values(filters).some(v => v) 
              ? 'No admit cards match your search criteria. Try adjusting your filters.'
              : mode === 'my' 
                ? "You haven't created any admit cards yet."
                : 'No admit cards have been created yet.'}
          </p>
          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <button
              onClick={handleCreateAdmitCard}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Create Your First Admit Card
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

export default AdmitCardDashboard;