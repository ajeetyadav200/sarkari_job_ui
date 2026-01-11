import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeft,
  Building2,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  Edit2,
  Trash2,
  Download,
  ExternalLink,
  User,
  Info,
  Link as LinkIcon,
  Tag,
  MapPin,
  Phone,
  Mail,
  Globe,
  IndianRupee,
  Users,
  GraduationCap,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import { fetchServiceById, deleteGovernmentService, updateServiceStatus } from '../../slice/governmentServiceSlice';
import ConfirmationModal from '../../modals/ConfirmationModal';

const GovernmentServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentService, loading, error } = useSelector(state => state.governmentServices || {});
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
      dispatch(fetchServiceById(id));
    }
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Pending Review' };
      case 'verified':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Verified' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
      case 'onHold':
        return { color: 'bg-orange-100 text-orange-800', icon: PauseCircle, label: 'On Hold' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: status };
    }
  };

  const getServiceTypeIcon = (serviceType) => {
    switch (serviceType) {
      case 'scholarship': return GraduationCap;
      case 'certificate': return FileCheck;
      case 'registration': return FileText;
      case 'verification': return CheckCircle;
      case 'governmentScheme': return Building2;
      case 'welfareScheme': return Users;
      default: return Globe;
    }
  };

  const getServiceTypeLabel = (serviceType) => {
    const labels = {
      scholarship: 'Scholarship',
      certificate: 'Certificate',
      registration: 'Registration',
      verification: 'Verification',
      governmentScheme: 'Government Scheme',
      welfareScheme: 'Welfare Scheme',
      documentService: 'Document Service',
      financialService: 'Financial Service',
      other: 'Other'
    };
    return labels[serviceType] || serviceType;
  };

  const getStateName = (stateKey) => {
    const stateNames = {
      allIndia: 'All India',
      uttarPradesh: 'Uttar Pradesh',
      maharashtra: 'Maharashtra',
      bihar: 'Bihar',
      delhi: 'Delhi',
      rajasthan: 'Rajasthan'
    };
    return stateNames[stateKey] || stateKey;
  };

  const handleDelete = () => {
    setModalConfig({
      isOpen: true,
      type: 'delete-service',
      data: {
        title: currentService.serviceName,
        serviceType: currentService.serviceType
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteGovernmentService(currentService._id)).unwrap();
          setSuccessMessage('Service deleted successfully');
          setTimeout(() => navigate(-1), 1500);
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleStatusChange = (newStatus) => {
    let rejectionReason = '';

    if (newStatus === 'rejected') {
      rejectionReason = window.prompt('Please enter the rejection reason:');
      if (rejectionReason === null) return;
      if (!rejectionReason.trim()) {
        alert('Rejection reason is required when rejecting a service.');
        return;
      }
    }

    setModalConfig({
      isOpen: true,
      type: 'change-status',
      data: {
        title: currentService.serviceName,
        currentStatus: currentService.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          await dispatch(updateServiceStatus({
            id: currentService._id,
            status: newStatus,
            rejectionReason
          })).unwrap();
          setSuccessMessage(`Service status updated to ${newStatus}`);
          closeModal();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleEdit = () => {
    const basePath = user?.role === 'admin' ? '/admin' : user?.role === 'publisher' ? '/publisher' : '/assistant';
    navigate(`${basePath}/government-services/edit/${currentService._id}`);
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: '', data: null, onConfirm: null });
  };

  const renderFileDownload = (fileObj, label) => {
    if (!fileObj || !fileObj.fileUrl) return null;

    return (
      <a
        href={fileObj.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{fileObj.fileName || label}</p>
            <p className="text-xs text-gray-500">{fileObj.fileType?.toUpperCase()}</p>
          </div>
        </div>
        <Download className="w-4 h-4 text-gray-600" />
      </a>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentService) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(currentService.status);
  const StatusIcon = statusInfo.icon;
  const ServiceTypeIcon = getServiceTypeIcon(currentService.serviceType);
  const canEdit = user?.role === 'admin' || currentService.createdBy?.userId === user?._id;
  const canDelete = user?.role === 'admin' || currentService.createdBy?.userId === user?._id;
  const canChangeStatus = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex items-center gap-3">
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Service
                </button>
              )}

              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Title and Status */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ServiceTypeIcon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {getServiceTypeLabel(currentService.serviceType)}
                </span>
                {currentService.state && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {getStateName(currentService.state)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentService.serviceName}</h1>
              {currentService.serviceNameHindi && (
                <p className="text-lg text-gray-600">{currentService.serviceNameHindi}</p>
              )}
              {currentService.organizationName && (
                <p className="text-md text-gray-500 mt-1">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  {currentService.organizationName}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color} flex items-center gap-2`}>
                <StatusIcon className="w-4 h-4" />
                {statusInfo.label}
              </span>
              {currentService.activeStatus && (
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentService.activeStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {currentService.activeStatus}
                </span>
              )}
              {currentService.isFreeService && (
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Free Service
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Service */}
            {(currentService.aboutService || currentService.fullDescription) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-green-600" />
                  About This Service
                </h2>
                <div className="prose max-w-none">
                  {currentService.aboutService && (
                    <p className="text-gray-700 whitespace-pre-wrap">{currentService.aboutService}</p>
                  )}
                  {currentService.fullDescription && (
                    <p className="text-gray-700 whitespace-pre-wrap mt-4">{currentService.fullDescription}</p>
                  )}
                </div>
              </div>
            )}

            {/* Important Dates */}
            {currentService.importantDates && Object.values(currentService.importantDates).some(d => d) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Important Dates
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {currentService.importantDates.applicationStartDate && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Application Start</p>
                      <p className="font-semibold text-gray-900">{formatDate(currentService.importantDates.applicationStartDate)}</p>
                    </div>
                  )}
                  {currentService.importantDates.applicationLastDate && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Application Last Date</p>
                      <p className="font-semibold text-red-700">{formatDate(currentService.importantDates.applicationLastDate)}</p>
                    </div>
                  )}
                  {currentService.importantDates.lastDateForFreshApply && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Fresh Apply Last Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(currentService.importantDates.lastDateForFreshApply)}</p>
                    </div>
                  )}
                  {currentService.importantDates.lastDateForRenewal && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Renewal Last Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(currentService.importantDates.lastDateForRenewal)}</p>
                    </div>
                  )}
                  {currentService.importantDates.hardCopySubmissionLastDate && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Hard Copy Submission</p>
                      <p className="font-semibold text-gray-900">{formatDate(currentService.importantDates.hardCopySubmissionLastDate)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Application Fee */}
            {(currentService.applicationFee || currentService.categoryFees) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                  Application Fee
                </h2>
                {currentService.isFreeService ? (
                  <p className="text-green-600 font-semibold">No Application Fee Required</p>
                ) : (
                  <>
                    {currentService.applicationFee && (
                      <p className="text-gray-700 mb-4">{currentService.applicationFee}</p>
                    )}
                    {currentService.categoryFees && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {Object.entries(currentService.categoryFees).map(([category, fee]) => (
                          fee > 0 && (
                            <div key={category} className="p-2 bg-gray-50 rounded text-center">
                              <p className="text-xs text-gray-500 capitalize">{category}</p>
                              <p className="font-semibold text-gray-900">Rs. {fee}/-</p>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Documents Required */}
            {currentService.documentsRequired && currentService.documentsRequired.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Documents Required
                </h2>
                <ul className="space-y-2">
                  {currentService.documentsRequired.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to Apply */}
            {currentService.howToApply && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                  How to Apply
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{currentService.howToApply}</p>
                </div>
              </div>
            )}

            {/* Important Instructions */}
            {currentService.importantInstructions && currentService.importantInstructions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Important Instructions
                </h2>
                <ul className="space-y-2">
                  {currentService.importantInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Uploaded Files */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                Uploaded Files
              </h2>
              <div className="space-y-3">
                {renderFileDownload(currentService.officialNotification, 'Official Notification')}
                {renderFileDownload(currentService.applicationForm, 'Application Form')}
                {renderFileDownload(currentService.instructionSheet, 'Instruction Sheet')}
                {renderFileDownload(currentService.guidelinesFile, 'Guidelines File')}
                {renderFileDownload(currentService.sampleForm, 'Sample Form')}
                {renderFileDownload(currentService.otherFile1, 'Other File 1')}
                {renderFileDownload(currentService.otherFile2, 'Other File 2')}

                {!currentService.officialNotification &&
                 !currentService.applicationForm &&
                 !currentService.instructionSheet &&
                 !currentService.guidelinesFile &&
                 !currentService.sampleForm &&
                 !currentService.otherFile1 &&
                 !currentService.otherFile2 && (
                  <p className="text-gray-500 text-center py-4">No files uploaded</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-green-600" />
                Important Links
              </h3>
              <div className="space-y-3">
                {currentService.applyOnlineLink && (
                  <a
                    href={currentService.applyOnlineLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <span className="font-medium text-green-700">Apply Online</span>
                    <ExternalLink className="w-4 h-4 text-green-600" />
                  </a>
                )}
                {currentService.loginLink && (
                  <a
                    href={currentService.loginLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span className="font-medium text-blue-700">Login</span>
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </a>
                )}
                {currentService.statusCheckLink && (
                  <a
                    href={currentService.statusCheckLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <span className="font-medium text-purple-700">Check Status</span>
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                  </a>
                )}
                {currentService.officialWebsite && (
                  <a
                    href={currentService.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-700">Official Website</span>
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                )}

                {/* Custom Links */}
                {currentService.importantLinks && currentService.importantLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-700">{link.linkTitle}</span>
                      <span className="text-xs text-gray-500 ml-2">({link.linkCategory})</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            {(currentService.helplineNumber || currentService.helpEmail || currentService.helpAddress) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Contact & Help
                </h3>
                <div className="space-y-3">
                  {currentService.helplineNumber && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{currentService.helplineNumber}</span>
                    </div>
                  )}
                  {currentService.helpEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${currentService.helpEmail}`} className="text-blue-600 hover:underline">
                        {currentService.helpEmail}
                      </a>
                    </div>
                  )}
                  {currentService.helpAddress && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{currentService.helpAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {currentService.tags && currentService.tags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentService.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Creator Information */}
            {currentService.createdBy && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Creator Information
                </h3>
                <div className="space-y-3">
                  {currentService.createdBy.name && (
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{currentService.createdBy.name}</p>
                    </div>
                  )}
                  {currentService.createdBy.email && (
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{currentService.createdBy.email}</p>
                    </div>
                  )}
                  {currentService.createdBy.role && (
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-medium text-gray-900 capitalize">{currentService.createdBy.role}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin Actions */}
            {canChangeStatus && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Actions</h3>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Change Status</label>
                  <select
                    value={currentService.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="onHold">On Hold</option>
                  </select>

                  {currentService.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">Rejection Reason</p>
                      <p className="text-red-900">{currentService.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Posted On</p>
                  <p className="font-medium text-gray-900">{formatDate(currentService.postDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">{formatDate(currentService.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">{formatDate(currentService.updatedAt)}</p>
                </div>
                {currentService.viewCount !== undefined && (
                  <div>
                    <p className="text-gray-600">Views</p>
                    <p className="font-medium text-gray-900">{currentService.viewCount}</p>
                  </div>
                )}
              </div>
            </div>
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

export default GovernmentServiceDetail;
