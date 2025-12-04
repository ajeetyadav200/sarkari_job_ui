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
  ChevronRight
} from 'lucide-react';
import JobCard from './JobCard';
import JobForm from './JobForm';
import ConfirmationModal from '../../modals/ConfirmationModal';
import StatusFilter from './StatusFilter';
import { 
  fetchJobs, 
  deleteJob, 
  changeJobStatus, 
  fetchJobStats,
  fetchMyJobs,
  clearError 
} from '../../slice/jobSlice';
import ApiService from '../../services/api';

const JobDashboard = ({ mode = 'all', showStats = false, userRole = 'admin' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: jobs, loading, error, pagination, stats } = useSelector(state => state.jobs);
  const user = useSelector(state => state.user);
  
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(mode === 'all' ? '' : mode);
  const [filters, setFilters] = useState({
    departmentName: '',
    typeOfForm: '',
    modeOfForm: '',
    registrationOpen: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const page = pagination.currentPage || 1;
  const limit = pagination.limit || 10;

  useEffect(() => {
    loadJobs();
    if (showStats && userRole === 'admin') {
      dispatch(fetchJobStats());
    }
  }, [mode, userRole]);

  const loadJobs = async () => {
    const params = {
      page,
      limit,
      status: statusFilter || (mode === 'my' ? '' : mode === 'all' ? '' : mode),
      ...filters,
      ...(searchTerm && { 
        departmentName: searchTerm,
        postName: searchTerm 
      })
    };

    if (mode === 'my') {
      dispatch(fetchMyJobs(params));
    } else {
      dispatch(fetchJobs(params));
    }
  };

  const handleViewJob = (job) => {
    navigate(`/admin/jobs/${job._id}`);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (job) => {
    setModalConfig({
      isOpen: true,
      type: 'delete-job',
      data: {
        title: job.postName,
        department: job.departmentName
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteJob(job._id)).unwrap();
          setSuccessMessage('Job deleted successfully');
          closeModal();
          loadJobs();
        } catch (err) {
          setSuccessMessage('');
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = async (job, newStatus) => {
    setModalConfig({
      isOpen: true,
      type: 'change-status',
      data: {
        title: job.postName,
        currentStatus: job.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          await dispatch(changeJobStatus({ 
            id: job._id, 
            status: newStatus,
            remark: `Status changed from ${job.status} to ${newStatus}` 
          })).unwrap();
          setSuccessMessage(`Job status updated to ${newStatus}`);
          closeModal();
          loadJobs();
        } catch (err) {
          setSuccessMessage('');
          closeModal();
        }
      }
    });
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleFormSuccess = (message) => {
    setSuccessMessage(message);
    setShowJobForm(false);
    setEditingJob(null);
    loadJobs();
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
        limit,
        status: statusFilter || (mode === 'my' ? '' : mode === 'all' ? '' : mode),
        ...filters
      };

      if (mode === 'my') {
        dispatch(fetchMyJobs(params));
      } else {
        dispatch(fetchJobs(params));
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await ApiService.jobs.getAll({
        ...filters,
        status: statusFilter,
        limit: 1000
      });
      
      const csvData = response.data.map(job => ({
        'Department': job.departmentName,
        'Post': job.postName,
        'Total Posts': job.totalPost,
        'Status': job.status,
        'Start Date': job.importantDates.startDate,
        'Last Date': job.importantDates.registrationLastDate,
        'Mode': job.modeOfForm,
        'Type': job.typeOfForm,
        'Eligibility': job.eligibilityEducational1
      }));

      const csv = convertToCSV(csvData);
      downloadCSV(csv, `jobs_export_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const convertToCSV = (data) => {
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
    if (!stats?.statusWise) return 0;
    const statusData = stats.statusWise.find(s => s._id === status);
    return statusData ? statusData.count : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === 'my' ? 'My Jobs' : 
             mode === 'pending' ? 'Pending Jobs' :
             mode === 'verified' ? 'Verified Jobs' :
             mode === 'rejected' ? 'Rejected Jobs' :
             mode === 'onHold' ? 'On Hold Jobs' :
             'All Jobs'}
          </h1>
          <p className="text-gray-600">
            {mode === 'my' ? 'Jobs created by you' : 
             'Manage and monitor all job postings'}
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
              onClick={handleCreateJob}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Job
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
      {showStats && userRole === 'admin' && stats && (
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
                placeholder="Search by department or post name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && loadJobs()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onClick={loadJobs}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Filter by department..."
                  value={filters.departmentName}
                  onChange={(e) => setFilters({...filters, departmentName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Type
                </label>
                <select
                  value={filters.typeOfForm}
                  onChange={(e) => setFilters({...filters, typeOfForm: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="semi-government">Semi-Government</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Mode
                </label>
                <select
                  value={filters.modeOfForm}
                  onChange={(e) => setFilters({...filters, modeOfForm: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Modes</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="registrationOpen"
                  checked={filters.registrationOpen}
                  onChange={(e) => setFilters({...filters, registrationOpen: e.target.checked})}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="registrationOpen" className="text-sm text-gray-700">
                  Show only registration open jobs
                </label>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={loadJobs}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setFilters({
                      departmentName: '',
                      typeOfForm: '',
                      modeOfForm: '',
                      registrationOpen: false
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
          </div>
        )}
      </div>

      {/* Status Filter Tabs */}
      <StatusFilter 
        activeStatus={statusFilter} 
        onStatusChange={setStatusFilter}
        stats={stats}
      />

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading jobs...</p>
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onView={handleViewJob}
                onEdit={userRole !== 'admin' && mode === 'my' ? handleEditJob : null}
                onDelete={userRole !== 'admin' && mode === 'my' ? handleDeleteJob : null}
                onStatusChange={userRole === 'admin' ? handleStatusChange : null}
                isAdmin={userRole === 'admin'}
                showActions={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                <span className="font-medium">{Math.min(page * limit, pagination.totalJobs)}</span> of{' '}
                <span className="font-medium">{pagination.totalJobs}</span> results
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
                      className={`px-3 py-1 rounded-lg ${page === pageNum ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-6">
            {statusFilter 
              ? `No jobs with status "${statusFilter}" found`
              : 'No jobs match your filters'}
          </p>
          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <button
              onClick={handleCreateJob}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Your First Job
            </button>
          )}
        </div>
      )}

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm
          onClose={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
          onSuccess={handleFormSuccess}
          editData={editingJob}
          user={user}
        />
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

export default JobDashboard;