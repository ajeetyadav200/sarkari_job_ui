import React from 'react';
import { 
  AlertTriangle, 
  LogOut, 
  Trash2, 
  Edit3, 
  User,
  FileText,
  Save,
  X,
  Mail
} from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  isLoading = false,
  data 
}) => {
  if (!isOpen) return null;

  const getModalConfig = () => {
    const configs = {
      'delete-assistant': {
        icon: Trash2,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
        confirmColor: 'bg-red-600 hover:bg-red-700',
        title: 'Delete Assistant',
        message: 'Are you sure you want to delete this assistant? This action cannot be undone.'
      },
      'update-assistant': {
        icon: Edit3,
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-100',
        confirmColor: 'bg-blue-600 hover:bg-blue-700',
        title: 'Update Assistant',
        message: 'Are you sure you want to save these changes?'
      },
      'logout-admin': {
        icon: LogOut,
        iconColor: 'text-orange-600',
        bgColor: 'bg-orange-100',
        confirmColor: 'bg-orange-600 hover:bg-orange-700',
        title: 'Logout Admin',
        message: 'Are you sure you want to logout from admin panel?'
      },
      'logout-assistant': {
        icon: LogOut,
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-100',
        confirmColor: 'bg-purple-600 hover:bg-purple-700',
        title: 'Logout Assistant',
        message: 'Are you sure you want to logout this assistant?'
      },
      'logout-publisher': {
        icon: LogOut,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100',
        confirmColor: 'bg-green-600 hover:bg-green-700',
        title: 'Logout Publisher',
        message: 'Are you sure you want to logout this publisher?'
      },
      'delete-publisher': {
        icon: Trash2,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
        confirmColor: 'bg-red-600 hover:bg-red-700',
        title: 'Delete Publisher',
        message: 'Are you sure you want to delete this publisher? All associated data will be lost.'
      },
      'delete-job-alert': {
        icon: Trash2,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
        confirmColor: 'bg-red-600 hover:bg-red-700',
        title: 'Delete Job Alert',
        message: 'Are you sure you want to delete this job alert?'
      },
      'delete-result': {
        icon: Trash2,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
        confirmColor: 'bg-red-600 hover:bg-red-700',
        title: 'Delete Result',
        message: 'Are you sure you want to delete this result? This action cannot be undone.'
      },
      'clear-all-data': {
        icon: AlertTriangle,
        iconColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        confirmColor: 'bg-yellow-600 hover:bg-yellow-700',
        title: 'Clear All Data',
        message: 'This will delete all data from the system. This action cannot be undone. Are you sure?'
      },
    
    };

    return configs[type] || {
      icon: AlertTriangle,
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-100',
      confirmColor: 'bg-gray-600 hover:bg-gray-700',
      title: title || 'Confirmation',
      message: message || 'Are you sure you want to proceed?'
    };
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl animate-fadeIn scale-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${config.bgColor}`}>
              <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {config.title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-gray-600 mb-2">{config.message}</p>
          
          {/* Show additional data if provided */}
          {data && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              {data.name && (
                <p className="text-sm font-medium text-gray-800">
                  <User className="w-4 h-4 inline mr-2" />
                  {data.name}
                </p>
              )}
              {data.email && (
                <p className="text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {data.email}
                </p>
              )}
              {data.type && (
                <p className="text-sm text-gray-600 mt-1">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Type: {data.type}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 ${config.confirmColor} text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-colors`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="ml-2">{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;