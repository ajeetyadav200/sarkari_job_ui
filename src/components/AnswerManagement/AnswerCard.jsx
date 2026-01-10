import React from 'react';
import {
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
  Eye,
  ExternalLink,
  Download
} from 'lucide-react';

const AnswerCard = ({ answer, onView, onEdit, onDelete, onStatusChange, isAdmin = false, showActions = true }) => {
  const getStatusBadge = (status) => {
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

  const statusBadge = getStatusBadge(answer.status);
  const StatusIcon = statusBadge.icon;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const isAnswerAvailable = answer.isAvailable ||
    (new Date(answer.publishDate) <= new Date());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">{answer.department}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{answer.postName}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {statusBadge.label}
            </span>
            {isAnswerAvailable && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Available
              </span>
            )}
          </div>
        </div>

        {/* Answer Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Exam Name:</span>
              <span className="font-semibold text-xs line-clamp-1">{answer.examName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Exam Date:</span>
              <span className="font-semibold">{formatDate(answer.examDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Publish Date:</span>
              <span className="font-semibold">{formatDate(answer.publishDate)}</span>
            </div>
          </div>

          <div className="space-y-2">
            {answer.answerKeyPdfUrl && (
              <div className="flex items-center gap-2 text-sm">
                <Download className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Answer Key:</span>
                <span className="font-semibold text-green-600">Available</span>
              </div>
            )}
            {answer.examType && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold capitalize">{answer.examType}</span>
              </div>
            )}
            {answer.createdBy && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">By:</span>
                <span className="font-semibold text-xs">{answer.createdBy.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {answer.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              <span className="font-medium">Description:</span> {answer.description}
            </p>
          </div>
        )}

        {/* Answer Files Summary */}
        {answer.answerFiles && answer.answerFiles.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {answer.answerFiles.length} File{answer.answerFiles.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {showActions && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(answer)}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {answer.answerKeyPdfUrl && (
                <a
                  href={answer.answerKeyPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(answer)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Answer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(answer)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Answer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {isAdmin && onStatusChange && (
                <select
                  value={answer.status}
                  onChange={(e) => onStatusChange(answer, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verify</option>
                  <option value="rejected">Reject</option>
                  <option value="onHold">On Hold</option>
                </select>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
