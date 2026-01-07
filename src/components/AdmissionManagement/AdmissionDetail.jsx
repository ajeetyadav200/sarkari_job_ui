import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeft, 
  Building2, 
  Briefcase, 
  Calendar, 
  Users,
  Clock,
  Mail,
  Phone,
  Globe,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  Edit2,
  Trash2,
  Download,
  ExternalLink,
  User,
  Award,
  CreditCard,
  Info
} from 'lucide-react';
import { fetchAdmissionById, deleteAdmission, changeAdmissionStatus } from '../../slice/admissionSlice';
import ConfirmationModal from '../../modals/ConfirmationModal';
import admissionService from '../../services/admissionService';

const AdmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAdmission, loading, error } = useSelector(state => state.admissions);
  const user = useSelector(state => state.user);
  
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchAdmissionById(id));
    }
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: AlertCircle,
          label: 'Pending Review'
        };
      case 'verified':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Verified'
        };
      case 'rejected':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          label: 'Rejected'
        };
      case 'onHold':
        return { 
          color: 'bg-orange-100 text-orange-800',
          icon: PauseCircle,
          label: 'On Hold'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: AlertCircle,
          label: status
        };
    }
  };

  const handleDelete = () => {
    setModalConfig({
      isOpen: true,
      type: 'delete-admission',
      data: {
        title: currentAdmission.postName,
        department: currentAdmission.departmentName
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteAdmission(currentAdmission._id)).unwrap();
          setSuccessMessage('Job deleted successfully');
          setTimeout(() => navigate('/admin/admissions'), 1500);
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = (newStatus) => {
    let rejectionReason = '';

    // If changing to rejected, prompt for rejection reason
    if (newStatus === 'rejected') {
      rejectionReason = window.prompt('Please enter the rejection reason:');
      if (rejectionReason === null) {
        // User cancelled
        return;
      }
      if (!rejectionReason.trim()) {
        alert('Rejection reason is required when rejecting a admission.');
        return;
      }
    }

    setModalConfig({
      isOpen: true,
      type: 'change-status',
      data: {
        title: currentAdmission.postName,
        currentStatus: currentAdmission.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          const payload = {
            id: currentAdmission._id,
            status: newStatus,
            remark: `Status changed from ${currentAdmission.status} to ${newStatus}`
          };

          // Add rejection reason if status is rejected
          if (newStatus === 'rejected' && rejectionReason) {
            payload.rejectionReason = rejectionReason;
          }

          await dispatch(changeAdmissionStatus(payload)).unwrap();
          setSuccessMessage(`Job status updated to ${newStatus}`);
          closeModal();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: '',
      data: null,
      onConfirm: null
    });
  };

  const handleEdit = () => {
    navigate(`/admin/admissions/edit/${currentAdmission._id}`);
  };

  const handleDownload = async () => {
    try {
      const response = await admissionService.getById(currentAdmission._id);
      const jobData = response.data;
      
      // Create a formatted text representation
      const text = `
JOB DETAILS
===========

Department: ${jobData.departmentName}
Post: ${jobData.postName}
Status: ${jobData.status}
Total Posts: ${jobData.totalPost}

IMPORTANT DATES
---------------
Start Date: ${formatDate(jobData.importantDates.startDate)}
Application Last Date: ${formatDate(jobData.importantDates.applicationLastDate)}
Fee Last Date: ${formatDate(jobData.importantDates.feeLastDate)}
Exam Date: ${formatDate(jobData.importantDates.examDate)}
Result Date: ${formatDate(jobData.importantDates.resultDate)}

ELIGIBILITY
-----------
${jobData.eligibilityEducational1}
${jobData.eligibilityEducational2 ? '\n' + jobData.eligibilityEducational2 : ''}

CONTACT
-------
Email: ${jobData.helpEmailId}
Phone: ${jobData.helpCareNo}
Website: ${jobData.officialWebsite}

Generated on: ${new Date().toLocaleString()}
      `;
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${jobData.departmentName}_${jobData.postName}_Details.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Job</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentAdmission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Info className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Not Found</h3>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(currentAdmission.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentAdmission.postName}</h1>
                <p className="text-gray-600">{currentAdmission.departmentName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} flex items-center gap-2`}>
                <StatusIcon className="w-4 h-4" />
                {statusInfo.label}
              </span>

              {currentAdmission.isLatestJob && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Latest Job
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Download Details"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                {currentAdmission.canEdit && (
                  <button
                    onClick={handleEdit}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Job"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
                
                {(user.role === 'admin' || currentAdmission.createdBy.userId === user._id) && (
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{currentAdmission.departmentName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Post Name</p>
                      <p className="font-medium">{currentAdmission.postName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Total Posts</p>
                      <p className="font-medium">{currentAdmission.totalPost}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Form Mode</p>
                      <p className="font-medium capitalize">{currentAdmission.modeOfForm}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Form Type</p>
                      <p className="font-medium capitalize">{currentAdmission.typeOfForm}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Mode</p>
                      <p className="font-medium capitalize">{currentAdmission.paymentMode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Important Dates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Application Last Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.applicationLastDate)}</p>
                    {currentAdmission.remainingDays !== null && (
                      <p className={`text-sm ${currentAdmission.remainingDays < 7 ? 'text-red-600' : 'text-green-600'}`}>
                        {currentAdmission.remainingDays} days remaining
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fee Last Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.feeLastDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exam Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.examDate)}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Admit Card Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.admitCardDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Answer Key Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.answerKeyDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Result Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.resultDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age On Date</p>
                    <p className="font-medium">{formatDate(currentAdmission.importantDates.ageOnDate)}</p>
                  </div>
                </div>
              </div>
              
              {/* Age Details */}
              {(currentAdmission.importantDates.minimumAge || currentAdmission.importantDates.maximumAge) && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3">Age Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Minimum Age</p>
                      <p className="font-medium">{currentAdmission.importantDates.minimumAge || 'Not specified'} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Maximum Age</p>
                      <p className="font-medium">{currentAdmission.importantDates.maximumAge || 'Not specified'} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age Relaxation</p>
                      <p className="font-medium">{currentAdmission.importantDates.ageRelaxation || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Primary Qualification</p>
                  <p className="text-gray-800">{currentAdmission.eligibilityEducational1}</p>
                </div>
                {currentAdmission.eligibilityEducational2 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Additional Qualification</p>
                    <p className="text-gray-800">{currentAdmission.eligibilityEducational2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Other Details */}
            {(currentAdmission?.otherDetails?.bisixf1 || currentAdmission?.otherDetails?.format || 
              currentAdmission?.otherDetails?.captchaCode || currentAdmission?.otherDetails?.digitCode) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Other Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentAdmission.otherDetails.bisixf1 && (
                    <div>
                      <p className="text-sm text-gray-500">B I S I X F 1</p>
                      <p className="font-medium">{currentAdmission.otherDetails.bisixf1}</p>
                    </div>
                  )}
                  {currentAdmission.otherDetails.format && (
                    <div>
                      <p className="text-sm text-gray-500">Format</p>
                      <p className="font-medium">{currentAdmission.otherDetails.format}</p>
                    </div>
                  )}
                  {currentAdmission.otherDetails.captchaCode && (
                    <div>
                      <p className="text-sm text-gray-500">Captcha Code</p>
                      <p className="font-medium">{currentAdmission.otherDetails.captchaCode}</p>
                    </div>
                  )}
                  {currentAdmission.otherDetails.digitCode && (
                    <div>
                      <p className="text-sm text-gray-500">6 Digit Code</p>
                      <p className="font-medium">{currentAdmission.otherDetails.digitCode}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${currentAdmission.helpEmailId}`} className="text-blue-600 hover:underline">
                      {currentAdmission.helpEmailId}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${currentAdmission.helpCareNo}`} className="text-blue-600 hover:underline">
                      {currentAdmission.helpCareNo}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a 
                      href={currentAdmission.officialWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Posts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Category-wise Posts</h2>
              <div className="space-y-3">
                {Object.entries(currentAdmission.categoryPosts || {}).map(([category, count]) => (
                  count > 0 && (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{category}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  )
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>{currentAdmission.totalPost}</span>
                </div>
              </div>
            </div>

            {/* Category Fees */}
            {Object.values(currentAdmission.categoryFees || {}).some(fee => fee > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Application Fees (₹)</h2>
                <div className="space-y-3">
                  {Object.entries(currentAdmission.categoryFees || {}).map(([category, fee]) => (
                    fee > 0 && (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{category}</span>
                        <span className="font-medium">₹{fee}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Creator Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Created By</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{currentAdmission.createdBy.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{currentAdmission.createdBy.role}</p>
                  <p className="text-sm text-gray-500">{currentAdmission.createdBy.email}</p>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            {user.role === 'admin' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Admin Actions</h2>
                <div className="space-y-3">
                  <select
                    value={currentAdmission.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="onHold">On Hold</option>
                  </select>
                  
                  {currentAdmission.statusRemark && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-1">Status Remark</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {currentAdmission.statusRemark}
                      </p>
                    </div>
                  )}

                  {currentAdmission.status === 'rejected' && currentAdmission.rejectionReason && (
                    <div className="mt-3">
                      <p className="text-sm text-red-600 font-medium mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
                        {currentAdmission.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default AdmissionDetail;