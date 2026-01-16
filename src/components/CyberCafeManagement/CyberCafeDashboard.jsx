import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Monitor,
  CheckCircle,
  XCircle,
  Clock,
  Power,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CyberCafeCard from './CyberCafeCard';
import CyberCafeStatusFilter from './CyberCafeStatusFilter';
import ConfirmationModal from '../../modals/ConfirmationModal';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7777";

const CyberCafeDashboard = ({ mode = 'all', showStats = true }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCafes: 0,
    limit: 10
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [filters, setFilters] = useState({
    state: '',
    city: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const page = pagination.currentPage;
  const limit = pagination.limit;

  useEffect(() => {
    loadCafes();
    if (showStats) {
      fetchStats();
    }
  }, [statusFilter]);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status) {
      setStatusFilter(status);
    }
  }, [searchParams]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/dashboard-stats`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const loadCafes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      if (statusFilter) {
        params.append('status', statusFilter);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (filters.state) {
        params.append('state', filters.state);
      }
      if (filters.city) {
        params.append('city', filters.city);
      }

      const response = await fetch(`${API_URL}/api/admin/cyber-cafes?${params.toString()}`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setCafes(data.data);
        setPagination(data.pagination);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch cyber cafes');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCafe = (cafe) => {
    navigate(`/admin/cyber-cafes/${cafe._id}`);
  };

  const handleDeleteCafe = (cafe) => {
    setModalConfig({
      isOpen: true,
      type: 'delete-cafe',
      data: {
        title: cafe.cafeName,
        owner: cafe.ownerName
      },
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${cafe._id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
          const data = await response.json();
          if (data.success) {
            setSuccessMessage('Cafe deleted successfully');
            closeModal();
            loadCafes();
            fetchStats();
          } else {
            setError(data.message);
            closeModal();
          }
        } catch (err) {
          setError('Failed to delete cafe');
          closeModal();
        }
      }
    });
  };

  const handleVerifyCafe = async (cafe) => {
    setModalConfig({
      isOpen: true,
      type: 'verify-cafe',
      data: {
        title: cafe.cafeName,
        owner: cafe.ownerName
      },
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${cafe._id}/verify`, {
            method: 'PATCH',
            headers: getAuthHeaders()
          });
          const data = await response.json();
          if (data.success) {
            setSuccessMessage('Cafe verified successfully');
            closeModal();
            loadCafes();
            fetchStats();
          } else {
            setError(data.message);
            closeModal();
          }
        } catch (err) {
          setError('Failed to verify cafe');
          closeModal();
        }
      }
    });
  };

  const handleUnverifyCafe = async (cafe) => {
    setModalConfig({
      isOpen: true,
      type: 'unverify-cafe',
      data: {
        title: cafe.cafeName,
        owner: cafe.ownerName
      },
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${cafe._id}/unverify`, {
            method: 'PATCH',
            headers: getAuthHeaders()
          });
          const data = await response.json();
          if (data.success) {
            setSuccessMessage('Cafe unverified successfully');
            closeModal();
            loadCafes();
            fetchStats();
          } else {
            setError(data.message);
            closeModal();
          }
        } catch (err) {
          setError('Failed to unverify cafe');
          closeModal();
        }
      }
    });
  };

  const handleToggleActive = async (cafe) => {
    const newStatus = cafe.isActive ? 'deactivate' : 'activate';
    setModalConfig({
      isOpen: true,
      type: 'toggle-active',
      data: {
        title: cafe.cafeName,
        currentStatus: cafe.isActive ? 'Active' : 'Inactive',
        newStatus: cafe.isActive ? 'Inactive' : 'Active'
      },
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${cafe._id}/toggle-active`, {
            method: 'PATCH',
            headers: getAuthHeaders()
          });
          const data = await response.json();
          if (data.success) {
            setSuccessMessage(`Cafe ${newStatus}d successfully`);
            closeModal();
            loadCafes();
            fetchStats();
          } else {
            setError(data.message);
            closeModal();
          }
        } catch (err) {
          setError(`Failed to ${newStatus} cafe`);
          closeModal();
        }
      }
    });
  };

  const handleUnlockCafe = async (cafe) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${cafe._id}/unlock`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Account unlocked successfully');
        loadCafes();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to unlock account');
    }
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
      setPagination(prev => ({ ...prev, currentPage: newPage }));
      loadCafes();
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes?limit=1000`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();

      if (data.success) {
        const csvData = data.data.map(cafe => ({
          'Cafe Name': cafe.cafeName,
          'Owner Name': cafe.ownerName,
          'Email': cafe.email,
          'Phone': cafe.phone,
          'State': cafe.state,
          'City': cafe.city,
          'Address': cafe.address,
          'Pincode': cafe.pincode,
          'Verified': cafe.isVerified ? 'Yes' : 'No',
          'Active': cafe.isActive ? 'Yes' : 'No',
          'Registered Date': new Date(cafe.createdAt).toLocaleDateString()
        }));

        const csv = convertToCSV(csvData);
        downloadCSV(csv, `cyber_cafes_export_${new Date().toISOString().split('T')[0]}.csv`);
      }
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
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statusStats = [
    {
      status: 'unverified',
      label: 'Pending Verification',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-50',
      border: 'border-yellow-200'
    },
    {
      status: 'verified',
      label: 'Verified',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
      border: 'border-green-200'
    },
    {
      status: 'active',
      label: 'Active',
      icon: Power,
      color: 'text-blue-600 bg-blue-50',
      border: 'border-blue-200'
    },
    {
      status: 'inactive',
      label: 'Inactive',
      icon: XCircle,
      color: 'text-red-600 bg-red-50',
      border: 'border-red-200'
    }
  ];

  const getStatusCount = (status) => {
    if (!stats) return 0;
    switch (status) {
      case 'verified':
        return stats.verified || 0;
      case 'unverified':
        return stats.unverified || 0;
      case 'active':
        return stats.active || 0;
      case 'inactive':
        return stats.inactive || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Monitor className="w-8 h-8 text-purple-600" />
            {mode === 'all' ? 'All Cyber Cafes' :
              statusFilter === 'verified' ? 'Verified Cafes' :
                statusFilter === 'unverified' ? 'Pending Verification' :
                  statusFilter === 'active' ? 'Active Cafes' :
                    statusFilter === 'inactive' ? 'Inactive Cafes' :
                      'Cyber Cafes'}
          </h1>
          <p className="text-gray-600">
            Manage and monitor all registered cyber cafes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
          {successMessage}
          <button
            onClick={() => setSuccessMessage('')}
            className="text-green-800 font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
          {error}
          <button
            onClick={() => setError(null)}
            className="text-red-800 font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statusStats.map((stat) => {
            const Icon = stat.icon;
            const count = getStatusCount(stat.status);

            return (
              <div
                key={stat.status}
                className={`p-4 rounded-xl border ${stat.border} ${stat.color} hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => setStatusFilter(stat.status === statusFilter ? '' : stat.status)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{count}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('600', '100')}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by cafe name, owner name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && loadCafes()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={loadCafes}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Filter by state..."
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Filter by city..."
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={loadCafes}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setFilters({
                    state: '',
                    city: ''
                  });
                  setSearchTerm('');
                  setStatusFilter('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Filter Tabs */}
      <CyberCafeStatusFilter
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        stats={stats}
      />

      {/* Cafes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading cyber cafes...</p>
        </div>
      ) : cafes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cafes.map((cafe) => (
              <CyberCafeCard
                key={cafe._id}
                cafe={cafe}
                onView={handleViewCafe}
                onDelete={handleDeleteCafe}
                onVerify={handleVerifyCafe}
                onUnverify={handleUnverifyCafe}
                onToggleActive={handleToggleActive}
                onUnlock={handleUnlockCafe}
                isAdmin={true}
                showActions={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                <span className="font-medium">{Math.min(page * limit, pagination.totalCafes)}</span> of{' '}
                <span className="font-medium">{pagination.totalCafes}</span> results
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`p-2 rounded-lg ${page === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                  const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, page - 2)) + idx;
                  if (pageNum > pagination.totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded-lg ${page === pageNum ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.totalPages}
                  className={`p-2 rounded-lg ${page === pagination.totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cyber cafes found</h3>
          <p className="text-gray-500 mb-6">
            {statusFilter
              ? `No cafes with status "${statusFilter}" found`
              : 'No cafes match your filters'}
          </p>
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

export default CyberCafeDashboard;
