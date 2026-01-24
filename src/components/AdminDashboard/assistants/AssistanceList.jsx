import React, { useState } from 'react';
import { Edit3, Trash2, User, Mail, Phone, MapPin, Briefcase, Shield, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

const AssistanceList = ({
  assistances,
  onEdit,
  onDelete,
  loading,
  showActions = true
}) => {
  const [expandedId, setExpandedId] = useState(null);

  // Module labels for display
  const moduleLabels = {
    jobs: 'Jobs',
    admissions: 'Admissions',
    admitCards: 'Admit Cards',
    answerKeys: 'Answer Keys',
    results: 'Results',
    governmentServices: 'Govt Services',
    users: 'Users',
    cyberCafe: 'Cyber Cafe'
  };

  // Action labels for display
  const actionLabels = {
    create: 'Create',
    read: 'Read',
    update: 'Update',
    delete: 'Delete',
    verify: 'Verify',
    publish: 'Publish'
  };

  const countActivePermissions = (permissions) => {
    if (!permissions) return 0;
    let count = 0;
    Object.values(permissions).forEach(modulePerms => {
      Object.values(modulePerms || {}).forEach(value => {
        if (value) count++;
      });
    });
    return count;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Loading assistants...</p>
      </div>
    );
  }

  if (assistances.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No assistants found</p>
        <p className="text-sm">Add your first assistant to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assistances.map((assistant) => (
        <div key={assistant._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {assistant.firstName} {assistant.lastName}
                  </h4>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {assistant.position || 'Assistant'}
                  </span>
                  {assistant.isActive !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assistant.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {assistant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{assistant.email}</span>
                  </div>

                  {assistant.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{assistant.phone}</span>
                    </div>
                  )}

                  {assistant.department && (
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>{assistant.department}</span>
                    </div>
                  )}

                  {/* Permissions Summary */}
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-indigo-600 font-medium">
                      {countActivePermissions(assistant.permissions)} permissions
                    </span>
                    <button
                      onClick={() => toggleExpand(assistant._id)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {expandedId === assistant._id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {assistant.address && (
                    <div className="flex items-center space-x-2 col-span-1 md:col-span-2 lg:col-span-3">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{assistant.address}</span>
                    </div>
                  )}

                  {assistant.createdAt && (
                    <div className="flex items-center space-x-2 col-span-1 md:col-span-2 lg:col-span-3">
                      <span className="text-xs text-gray-500">
                        Added: {new Date(assistant.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showActions && (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit && onEdit(assistant)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 hover:border-blue-300"
                  title="Edit assistant"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete && onDelete(assistant)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                  title="Delete assistant"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Expanded Permissions Section */}
          {expandedId === assistant._id && assistant.permissions && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Module Permissions
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Module</th>
                      {Object.keys(actionLabels).map((action) => (
                        <th key={action} className="px-2 py-2 text-center font-medium text-gray-700">
                          {actionLabels[action]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.keys(moduleLabels).map((module) => {
                      const permissions = assistant.permissions?.[module] || {};
                      return (
                        <tr key={module} className="hover:bg-gray-50">
                          <td className="px-2 py-2 font-medium text-gray-900">
                            {moduleLabels[module]}
                          </td>
                          {Object.keys(actionLabels).map((action) => (
                            <td key={action} className="px-2 py-2 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                                  permissions[action]
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {permissions[action] ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {assistant.permissionRemarks && (
                <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                  <strong>Remarks:</strong> {assistant.permissionRemarks}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssistanceList;
