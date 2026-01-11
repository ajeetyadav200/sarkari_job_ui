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
  MapPin,
  GraduationCap,
  FileCheck,
  Users,
  Globe
} from 'lucide-react';

const GovernmentServiceCard = ({
  service,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  isAdmin = false,
  showActions = true
}) => {
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

  const getServiceTypeIcon = (serviceType) => {
    switch (serviceType) {
      case 'scholarship':
        return { icon: GraduationCap, color: 'text-purple-600 bg-purple-100' };
      case 'certificate':
        return { icon: FileCheck, color: 'text-blue-600 bg-blue-100' };
      case 'registration':
        return { icon: FileText, color: 'text-green-600 bg-green-100' };
      case 'verification':
        return { icon: CheckCircle, color: 'text-teal-600 bg-teal-100' };
      case 'governmentScheme':
        return { icon: Building2, color: 'text-indigo-600 bg-indigo-100' };
      case 'welfareScheme':
        return { icon: Users, color: 'text-pink-600 bg-pink-100' };
      case 'documentService':
        return { icon: FileText, color: 'text-cyan-600 bg-cyan-100' };
      case 'financialService':
        return { icon: Building2, color: 'text-emerald-600 bg-emerald-100' };
      default:
        return { icon: Globe, color: 'text-gray-600 bg-gray-100' };
    }
  };

  const getServiceTypeLabel = (serviceType) => {
    const labels = {
      scholarship: 'Scholarship',
      certificate: 'Certificate',
      registration: 'Registration',
      verification: 'Verification',
      governmentScheme: 'Govt. Scheme',
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
      westBengal: 'West Bengal',
      madhyaPradesh: 'Madhya Pradesh',
      tamilNadu: 'Tamil Nadu',
      rajasthan: 'Rajasthan',
      karnataka: 'Karnataka',
      gujarat: 'Gujarat',
      delhi: 'Delhi',
      other: 'Other'
    };
    return stateNames[stateKey] || stateKey;
  };

  const statusBadge = getStatusBadge(service.status);
  const StatusIcon = statusBadge.icon;
  const serviceTypeInfo = getServiceTypeIcon(service.serviceType);
  const ServiceTypeIcon = serviceTypeInfo.icon;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const isApplicationOpen = () => {
    if (!service.importantDates?.applicationStartDate) return true;

    const now = new Date();
    const startDate = new Date(service.importantDates.applicationStartDate);
    const lastDate = service.importantDates?.applicationLastDate
      ? new Date(service.importantDates.applicationLastDate)
      : null;

    if (now < startDate) return false;
    if (lastDate && now > lastDate) return false;
    return true;
  };

  const getApplicationStatus = () => {
    if (!service.importantDates?.applicationStartDate) return { label: 'Ongoing', color: 'bg-green-100 text-green-800' };

    const now = new Date();
    const startDate = new Date(service.importantDates.applicationStartDate);
    const lastDate = service.importantDates?.applicationLastDate
      ? new Date(service.importantDates.applicationLastDate)
      : null;

    if (now < startDate) return { label: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
    if (lastDate && now > lastDate) return { label: 'Closed', color: 'bg-red-100 text-red-800' };
    return { label: 'Open', color: 'bg-green-100 text-green-800' };
  };

  const applicationStatus = getApplicationStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${serviceTypeInfo.color}`}>
                <ServiceTypeIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {getServiceTypeLabel(service.serviceType)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
              {service.serviceName}
            </h3>
            {service.shortTitle && (
              <p className="text-sm text-gray-500 mt-1">{service.shortTitle}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {statusBadge.label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${applicationStatus.color}`}>
              {applicationStatus.label}
            </span>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            {service.organizationName && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 truncate">{service.organizationName}</span>
              </div>
            )}
            {service.state && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{getStateName(service.state)}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Posted:</span>
              <span className="font-semibold">{formatDate(service.postDate)}</span>
            </div>
          </div>

          <div className="space-y-2">
            {service.importantDates?.applicationStartDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Start:</span>
                <span className="font-semibold">{formatDate(service.importantDates.applicationStartDate)}</span>
              </div>
            )}
            {service.importantDates?.applicationLastDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-red-400" />
                <span className="text-gray-600">Last Date:</span>
                <span className="font-semibold text-red-600">{formatDate(service.importantDates.applicationLastDate)}</span>
              </div>
            )}
            {service.isFreeService && (
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Free Service
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Short Description */}
        {service.shortDescription && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              {service.shortDescription}
            </p>
          </div>
        )}

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {service.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {service.tags.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  +{service.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Creator Info */}
        {service.createdBy && (
          <div className="mb-4 text-sm text-gray-500">
            <span>By: </span>
            <span className="font-medium">{service.createdBy.name}</span>
          </div>
        )}

        {/* Footer Actions */}
        {showActions && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(service)}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {service.applyOnlineLink && (
                <a
                  href={service.applyOnlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apply
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Service"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(service)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {isAdmin && onStatusChange && (
                <select
                  value={service.status}
                  onChange={(e) => onStatusChange(service, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default GovernmentServiceCard;
