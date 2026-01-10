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
  Tag
} from 'lucide-react';
import { fetchAnswerById, deleteAnswer, updateAnswerStatus } from '../../slice/answerSlice';
import ConfirmationModal from '../../modals/ConfirmationModal';

const AnswerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAnswer, loading, error } = useSelector(state => state.answers);
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
      dispatch(fetchAnswerById(id));
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
      type: 'delete-answer',
      data: {
        title: currentAnswer.examName,
        department: currentAnswer.postTypeDetails
      },
      onConfirm: async () => {
        try {
          await dispatch(deleteAnswer(currentAnswer._id)).unwrap();
          setSuccessMessage('Answer deleted successfully');
          setTimeout(() => navigate('/admin/answers'), 1500);
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
        alert('Rejection reason is required when rejecting an answer.');
        return;
      }
    }

    setModalConfig({
      isOpen: true,
      type: 'change-status',
      data: {
        title: currentAnswer.examName,
        currentStatus: currentAnswer.status,
        newStatus
      },
      onConfirm: async () => {
        try {
          const payload = {
            id: currentAnswer._id,
            status: newStatus,
            rejectionReason: newStatus === 'rejected' ? rejectionReason : ''
          };

          await dispatch(updateAnswerStatus(payload)).unwrap();
          setSuccessMessage(`Answer status updated to ${newStatus}`);
          closeModal();
        } catch (err) {
          closeModal();
        }
      }
    });
  };

  const handleEdit = () => {
    if (user?.role === 'admin') {
      navigate(`/admin/answers/edit/${currentAnswer._id}`);
    } else if (user?.role === 'publisher') {
      navigate(`/publisher/answers/edit/${currentAnswer._id}`);
    } else if (user?.role === 'assistant') {
      navigate(`/assistant/answers/edit/${currentAnswer._id}`);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            onClick={() => navigate('/admin/answers')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Answers
          </button>
        </div>
      </div>
    );
  }

  if (!currentAnswer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Answer Not Found</h2>
          <p className="text-gray-600">The answer you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/answers')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Answers
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(currentAnswer.status);
  const StatusIcon = statusInfo.icon;
  const canEdit = user?.role === 'admin' || currentAnswer.createdBy?._id === user?._id;
  const canDelete = user?.role === 'admin' || currentAnswer.createdBy?._id === user?._id;
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Answer
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
              {currentAnswer.type && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Tag className="w-4 h-4" />
                  Type: {currentAnswer.type}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentAnswer.examName}</h1>
              {currentAnswer.postTypeDetails && (
                <p className="text-lg text-gray-600">{currentAnswer.postTypeDetails}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color} flex items-center gap-2`}>
                <StatusIcon className="w-4 h-4" />
                {statusInfo.label}
              </span>
              {currentAnswer.answerStatus && (
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {currentAnswer.answerStatus}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Basic Information
              </h2>

              <div className="space-y-4">
                {currentAnswer.linkMenuField && (
                  <div className="flex items-start gap-3">
                    <LinkIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Link Menu Field</p>
                      <a
                        href={currentAnswer.linkMenuField}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline break-all"
                      >
                        {currentAnswer.linkMenuField}
                      </a>
                    </div>
                  </div>
                )}

                {currentAnswer.directWebURL && (
                  <div className="flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Direct Web URL</p>
                      <a
                        href={currentAnswer.directWebURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline break-all"
                      >
                        {currentAnswer.directWebURL}
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Publish Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(currentAnswer.publishDate)}</p>
                    </div>
                  </div>

                  {currentAnswer.lastDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Last Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(currentAnswer.lastDate)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {currentAnswer.category && (
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold text-gray-900">{currentAnswer.category}</p>
                    </div>
                  </div>
                )}

                {currentAnswer.tags && currentAnswer.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {currentAnswer.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {currentAnswer.description && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{currentAnswer.description}</p>
                </div>
              )}
            </div>

            {/* Reference Information */}
            {currentAnswer.referenceId && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Reference Information ({currentAnswer.referenceModel})
                </h2>

                <div className="space-y-3">
                  {currentAnswer.referenceId.departmentName && (
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium text-gray-900">{currentAnswer.referenceId.departmentName}</p>
                    </div>
                  )}
                  {currentAnswer.referenceId.postName && (
                    <div>
                      <p className="text-sm text-gray-600">Post Name</p>
                      <p className="font-medium text-gray-900">{currentAnswer.referenceId.postName}</p>
                    </div>
                  )}
                  {currentAnswer.referenceId.title && (
                    <div>
                      <p className="text-sm text-gray-600">Title</p>
                      <p className="font-medium text-gray-900">{currentAnswer.referenceId.title}</p>
                    </div>
                  )}
                  {currentAnswer.referenceId.officialWebsite && (
                    <div>
                      <p className="text-sm text-gray-600">Official Website</p>
                      <a
                        href={currentAnswer.referenceId.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {currentAnswer.referenceId.officialWebsite}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Uploaded Files */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                Uploaded Files
              </h2>

              <div className="space-y-3">
                {renderFileDownload(currentAnswer.officialNotification, 'Official Notification')}
                {renderFileDownload(currentAnswer.examDateNotice, 'Exam Date Notice')}
                {renderFileDownload(currentAnswer.syllabusFile, 'Syllabus File')}
                {renderFileDownload(currentAnswer.admitCardFile, 'Admit Card File')}
                {renderFileDownload(currentAnswer.answerKeyFile, 'Answer Key File')}
                {renderFileDownload(currentAnswer.resultFile, 'Result File')}
                {renderFileDownload(currentAnswer.otherFile, 'Other File')}

                {!currentAnswer.officialNotification &&
                 !currentAnswer.examDateNotice &&
                 !currentAnswer.syllabusFile &&
                 !currentAnswer.admitCardFile &&
                 !currentAnswer.answerKeyFile &&
                 !currentAnswer.resultFile &&
                 !currentAnswer.otherFile && (
                  <p className="text-gray-500 text-center py-4">No files uploaded</p>
                )}
              </div>
            </div>

            {/* Dynamic Content & Sections */}
            {(currentAnswer.dynamicContent?.length > 0 ||
              currentAnswer.contentSections?.length > 0 ||
              currentAnswer.importantInstructions?.length > 0 ||
              currentAnswer.documentsRequired?.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>

                {currentAnswer.importantInstructions?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Important Instructions</p>
                    <ul className="list-disc list-inside space-y-1">
                      {currentAnswer.importantInstructions.map((instruction, index) => (
                        <li key={index} className="text-gray-900">{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentAnswer.documentsRequired?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Documents Required</p>
                    <ul className="list-disc list-inside space-y-1">
                      {currentAnswer.documentsRequired.map((doc, index) => (
                        <li key={index} className="text-gray-900">{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Information */}
            {currentAnswer.createdByDetails && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Creator Information
                </h3>

                <div className="space-y-3">
                  {currentAnswer.createdByDetails.name && (
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{currentAnswer.createdByDetails.name}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{currentAnswer.createdByDetails.email}</p>
                  </div>
                  {currentAnswer.createdByDetails.phone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{currentAnswer.createdByDetails.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium text-gray-900 capitalize">{currentAnswer.createdByDetails.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Verifier Information */}
            {currentAnswer.verifiedByDetails && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Verified By
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{currentAnswer.verifiedByDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium text-gray-900 capitalize">{currentAnswer.verifiedByDetails.role}</p>
                  </div>
                  {currentAnswer.verifiedAt && (
                    <div>
                      <p className="text-sm text-gray-600">Verified At</p>
                      <p className="font-medium text-gray-900">{formatDate(currentAnswer.verifiedAt)}</p>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Change Status
                  </label>
                  <select
                    value={currentAnswer.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="onHold">On Hold</option>
                  </select>

                  {currentAnswer.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">Rejection Reason</p>
                      <p className="text-red-900">{currentAnswer.rejectionReason}</p>
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
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">{formatDate(currentAnswer.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">{formatDate(currentAnswer.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Also Show Link</p>
                  <p className="font-medium text-gray-900">{currentAnswer.alsoShowLink ? 'Yes' : 'No'}</p>
                </div>
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

export default AnswerDetail;
