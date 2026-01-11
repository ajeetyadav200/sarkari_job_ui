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
  GraduationCap,
  FileCheck,
  FileText,
  Building2,
  Users,
  Globe
} from 'lucide-react';
import GovernmentServiceCard from './GovernmentServiceCard';
import ConfirmationModal from '../../modals/ConfirmationModal';
import StatusFilter from '../JobManagement/StatusFilter';
import {
  fetchGovernmentServices,
  deleteGovernmentService,
  updateServiceStatus,
  clearError
} from '../../slice/governmentServiceSlice';
import governmentServiceService from '../../services/governmentServiceService';

const GovernmentServiceDashboard = ({ mode = 'all', showStats = false, userRole = 'admin' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: services, loading, error, pagination, statistics } = useSelector(state => state.governmentServices || { list: [], pagination: {} });
  const user = useSelector(state => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(mode === 'all' ? '' : mode);
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [filters, setFilters] = useState({
    serviceType: '',
    state: '',
    serviceCategory: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const page = pagination?.currentPage || 1;
  const limit = pagination?.limit || 10;

  const serviceTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'scholarship', label: 'Scholarship', icon: GraduationCap },
    { value: 'certificate', label: 'Certificate', icon: FileCheck },
    { value: 'registration', label: 'Registration', icon: FileText },
    { value: 'verification', label: 'Verification', icon: CheckCircle },
    { value: 'governmentScheme', label: 'Govt. Scheme', icon: Building2 },
    { value: 'welfareScheme', label: 'Welfare Scheme', icon: Users },
    { value: 'documentService', label: 'Document Service', icon: FileText },
    { value: 'financialService', label: 'Financial Service', icon: Building2 },
    { value: 'other', label: 'Other', icon: Globe }
  ];

  const stateOptions = [
    { value: '', label: 'All States' },
    { value: 'allIndia', label: 'All India' },
    { value: 'uttarPradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'madhyaPradesh', label: 'Madhya Pradesh' },
    { value: 'tamilNadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' }
  ];

  useEffect(() => {
    loadServices();
  }, [mode, userRole, statusFilter, serviceTypeFilter, stateFilter]);

  const loadServices = async () => {
    const params = {
      page,
      limit,
      ...(statusFilter && { status: statusFilter }),
      ...(serviceTypeFilter && { serviceType: serviceTypeFilter }),
      ...(stateFilter && { state: stateFilter }),
      ...filters,
      ...(searchTerm && { search: searchTerm })
    };

    if (mode === 'all' && !statusFilter) {
      delete params.status;
    }

    dispatch(fetchGovernmentServices(params));
  };

  const handleViewService = (service) => {
    navigate(`/${userRole}/government-services/${service._id}`);
  };

  const handleEditService = (service) => {
    navigate(`/${userRole}/government-services/edit/${service._id}`);
  };

  const handleDeleteService = (service) => {
    setModalConfig({
      isOpen: true,
      type: 'delete-service',
      data: {
        title: service.serviceName,
        serviceType: service.serviceType
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteGovernmentService(service._id)).unwrap();
          setSuccessMessage('Service deleted successfully');
          closeModal();
          loadServices();
        } catch (err) {
          setSuccessMessage('');
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = async (service, newStatus) => {
    setModalConfig({
      isOpen: true,
      type: 'change-status',
      data: {
        title: service.serviceName,
        currentStatus: service.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          let rejectionReason = '';
          if (newStatus === 'rejected') {
            rejectionReason = window.prompt('Please enter the rejection reason:');
            if (rejectionReason === null) {
              closeModal();
              return;
            }
          }

          await dispatch(updateServiceStatus({
            id: service._id,
            status: newStatus,
            rejectionReason
          })).unwrap();
          setSuccessMessage(`Service status updated to ${newStatus}`);
          closeModal();
          loadServices();
        } catch (err) {
          setSuccessMessage('');
          closeModal();
        }
      }
    });
  };

  const handleCreateService = () => {
    navigate(`/${userRole}/government-services/create`);
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
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      const params = {
        page: newPage,
        limit,
        status: statusFilter || '',
        serviceType: serviceTypeFilter || '',
        state: stateFilter || '',
        ...filters
      };

      dispatch(fetchGovernmentServices(params));
    }
  };

  const handleExport = async () => {
    try {
      const response = await governmentServiceService.getAllServices({
        ...filters,
        status: statusFilter,
        serviceType: serviceTypeFilter,
        state: stateFilter,
        limit: 1000
      });

      const csvData = (response.data || []).map(service => ({
        'Service Name': service.serviceName,
        'Type': service.serviceType,
        'Category': service.serviceCategory,
        'Organization': service.organizationName,
        'State': service.state,
        'Post Date': service.postDate,
        'Start Date': service.importantDates?.applicationStartDate || '',
        'Last Date': service.importantDates?.applicationLastDate || '',
        'Status': service.status,
        'Active Status': service.activeStatus,
        'Free Service': service.isFreeService ? 'Yes' : 'No'
      }));

      const csv = convertToCSV(csvData);
      downloadCSV(csv, `government_services_export_${new Date().toISOString().split('T')[0]}.csv`);
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
      status: 'pending',
      label: 'Pending Review',
      icon: AlertCircle,
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
      status: 'rejected',
      label: 'Rejected',
      icon: XCircle,
      color: 'text-red-600 bg-red-50',
      border: 'border-red-200'
    },
    {
      status: 'onHold',
      label: 'On Hold',
      icon: PauseCircle,
      color: 'text-orange-600 bg-orange-50',
      border: 'border-orange-200'
    }
  ];

  const getStatusCount = (status) => {
    if (!statistics?.statusWise) return 0;
    const statusData = statistics.statusWise.find(s => s._id?.status === status);
    return statusData ? statusData.count : 0;
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'my': return 'My Government Services';
      case 'pending': return 'Pending Services';
      case 'verified': return 'Verified Services';
      case 'rejected': return 'Rejected Services';
      case 'onHold': return 'On Hold Services';
      default: return 'All Government Services';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{getModeTitle()}</h1>
          <p className="text-gray-600">
            {mode === 'my' ? 'Services created by you' : 'Manage scholarships, certificates, registrations & more'}
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

          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <button
              onClick={handleCreateService}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Service
            </button>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={() => dispatch(clearError())}
            className="ml-2 text-red-800 font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Stats Cards (Admin only) */}
      {showStats && userRole === 'admin' && statistics && (
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
                placeholder="Search by service name, organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && loadServices()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Service Type Filter */}
            <select
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {serviceTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {stateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              More
            </button>

            <button
              onClick={loadServices}
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
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={loadServices}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setFilters({ serviceType: '', state: '', serviceCategory: '' });
                  setSearchTerm('');
                  setStatusFilter('');
                  setServiceTypeFilter('');
                  setStateFilter('');
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
      <StatusFilter
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        stats={statistics}
      />

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading government services...</p>
        </div>
      ) : services && services.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <GovernmentServiceCard
                key={service._id}
                service={service}
                onView={handleViewService}
                onEdit={(userRole === 'admin' || (userRole !== 'admin' && mode === 'my')) ? handleEditService : null}
                onDelete={(userRole === 'admin' || (userRole !== 'admin' && mode === 'my')) ? handleDeleteService : null}
                onStatusChange={userRole === 'admin' ? handleStatusChange : null}
                isAdmin={userRole === 'admin'}
                showActions={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                <span className="font-medium">{Math.min(page * limit, pagination.total)}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> results
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
                      className={`px-3 py-1 rounded-lg ${page === pageNum ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
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
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-500 mb-6">
            {statusFilter || serviceTypeFilter
              ? `No services matching your filters`
              : 'No government services available'}
          </p>
          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <button
              onClick={handleCreateService}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Your First Service
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

export default GovernmentServiceDashboard;
