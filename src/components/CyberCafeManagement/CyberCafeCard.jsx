import React from 'react';
import {
  Monitor,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Power
} from 'lucide-react';

const CyberCafeCard = ({
  cafe,
  onView,
  onEdit,
  onDelete,
  onVerify,
  onUnverify,
  onToggleActive,
  onUnlock,
  isAdmin = false,
  showActions = true
}) => {
  const getVerificationBadge = () => {
    if (cafe.isVerified) {
      return {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        label: 'Verified'
      };
    }
    return {
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      label: 'Pending Verification'
    };
  };

  const getActiveBadge = () => {
    if (cafe.isActive) {
      return {
        color: 'bg-blue-100 text-blue-800',
        icon: Power,
        label: 'Active'
      };
    }
    return {
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
      label: 'Inactive'
    };
  };

  const verificationBadge = getVerificationBadge();
  const activeBadge = getActiveBadge();
  const VerificationIcon = verificationBadge.icon;
  const ActiveIcon = activeBadge.icon;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">{cafe.cafeName}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              <User className="inline w-4 h-4 mr-1 text-gray-400" />
              {cafe.ownerName}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${verificationBadge.color} flex items-center gap-1`}>
              <VerificationIcon className="w-3 h-3" />
              {verificationBadge.label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${activeBadge.color} flex items-center gap-1`}>
              <ActiveIcon className="w-3 h-3" />
              {activeBadge.label}
            </span>
          </div>
        </div>

        {/* Cafe Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{cafe.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 truncate">{cafe.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Registered:</span>
              <span className="font-semibold">{formatDate(cafe.createdAt)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{cafe.city}, {cafe.state}</span>
            </div>
            {cafe.pincode && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Pincode:</span>
                <span className="font-semibold">{cafe.pincode}</span>
              </div>
            )}
            {cafe.isLocked && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <Lock className="w-4 h-4" />
                <span className="font-semibold">Account Locked</span>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            <span className="font-medium">Address:</span> {cafe.address}
          </p>
        </div>

        {/* Login Attempts */}
        {cafe.loginAttempts > 0 && (
          <div className="mb-4">
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md">
              Failed Login Attempts: {cafe.loginAttempts}
            </span>
          </div>
        )}

        {/* Footer Actions */}
        {showActions && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(cafe)}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <>
                  {/* Verify/Unverify Button */}
                  {!cafe.isVerified ? (
                    <button
                      onClick={() => onVerify && onVerify(cafe)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Verify Cafe"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnverify && onUnverify(cafe)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Unverify Cafe"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  )}

                  {/* Toggle Active Button */}
                  <button
                    onClick={() => onToggleActive && onToggleActive(cafe)}
                    className={`p-2 ${cafe.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'} rounded-lg transition-colors`}
                    title={cafe.isActive ? 'Deactivate Cafe' : 'Activate Cafe'}
                  >
                    <Power className="w-4 h-4" />
                  </button>

                  {/* Unlock Button (only if locked) */}
                  {cafe.isLocked && (
                    <button
                      onClick={() => onUnlock && onUnlock(cafe)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Unlock Account"
                    >
                      <Unlock className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}

              {onEdit && (
                <button
                  onClick={() => onEdit(cafe)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Cafe"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(cafe)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Cafe"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberCafeCard;
