import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  Edit2,
  Trash2,
  Eye,
  ExternalLink
} from 'lucide-react';

const JobCard = ({ job, onView, onEdit, onDelete, onStatusChange, isAdmin = false, showActions = true }) => {
  const getStatusBadge = (status) => {
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

  const statusBadge = getStatusBadge(job.status);
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

  const isRegistrationOpen = job.isRegistrationOpen || 
    (new Date(job.importantDates.startDate) <= new Date() && 
     new Date(job.importantDates.registrationLastDate) >= new Date());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">{job.departmentName}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{job.postName}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {statusBadge.label}
            </span>
            {isRegistrationOpen && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Registration Open
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Total Posts:</span>
              <span className="font-semibold">{job.totalPost}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Form Mode:</span>
              <span className="font-semibold capitalize">{job.modeOfForm}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Type:</span>
              <span className="font-semibold capitalize">{job.typeOfForm}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Start Date:</span>
              <span className="font-semibold">{formatDate(job.importantDates.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Last Date:</span>
              <span className="font-semibold">{formatDate(job.importantDates.registrationLastDate)}</span>
            </div>
            {job.remainingDays !== null && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Remaining Days:</span>
                <span className={`font-semibold ${job.remainingDays < 7 ? 'text-red-600' : 'text-green-600'}`}>
                  {job.remainingDays} days
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            <span className="font-medium">Eligibility:</span> {job.eligibilityEducational1}
          </p>
        </div>

        {/* Category Posts Summary */}
        {job.categoryPosts && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(job.categoryPosts).map(([category, count]) => (
                count > 0 && (
                  <span key={category} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {category.toUpperCase()}: {count}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {showActions && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(job)}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {job.officialWebsite && (
                <a
                  href={job.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Official Site
                </a>
              )}
            </div>
            
            <div className="flex items-center gap-2">
            {onEdit && (
  <button
    onClick={() => onEdit(job)}
    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    title="Edit Job"
  >
    <Edit2 className="w-4 h-4" />
  </button>
)}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(job)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              {isAdmin && onStatusChange && (
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job, e.target.value)}
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

export default JobCard;