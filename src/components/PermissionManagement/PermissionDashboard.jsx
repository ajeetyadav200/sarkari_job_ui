import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  RefreshCw,
  Save,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const PermissionDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedPermissions, setEditedPermissions] = useState({});
  const [modulesAndActions, setModulesAndActions] = useState({ modules: [], actions: [] });

  // Module labels for display
  const moduleLabels = {
    jobs: 'Jobs',
    admissions: 'Admissions',
    admitCards: 'Admit Cards',
    answerKeys: 'Answer Keys',
    results: 'Results',
    governmentServices: 'Government Services',
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

  useEffect(() => {
    fetchUsers();
    fetchModulesAndActions();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (searchTerm) params.search = searchTerm;

      const response = await api.permissions.getAll(params);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModulesAndActions = async () => {
    try {
      const response = await api.permissions.getModulesAndActions();
      if (response.success) {
        setModulesAndActions(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch modules and actions:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const toggleUserExpand = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setEditingUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user._id);
    setEditedPermissions(JSON.parse(JSON.stringify(user.permissions)));
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditedPermissions({});
  };

  const togglePermission = (module, action) => {
    setEditedPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module]?.[action]
      }
    }));
  };

  const toggleAllModulePermissions = (module, value) => {
    const actions = ['create', 'read', 'update', 'delete', 'verify', 'publish'];
    const newModulePerms = {};
    actions.forEach(action => {
      newModulePerms[action] = value;
    });
    setEditedPermissions(prev => ({
      ...prev,
      [module]: newModulePerms
    }));
  };

  const savePermissions = async (userId) => {
    try {
      setSaving(true);
      const response = await api.permissions.updatePermission(userId, {
        permissions: editedPermissions
      });

      if (response.success) {
        toast.success('Permissions updated successfully');
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      toast.error('Failed to update permissions');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = async (userId) => {
    if (!window.confirm('Reset permissions to default for this user?')) return;

    try {
      setSaving(true);
      const response = await api.permissions.resetPermission(userId);

      if (response.success) {
        toast.success('Permissions reset to default');
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      toast.error('Failed to reset permissions');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'assistant':
        return 'bg-blue-100 text-blue-800';
      case 'publisher':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const countActivePermissions = (permissions) => {
    let count = 0;
    Object.values(permissions || {}).forEach(modulePerms => {
      Object.values(modulePerms || {}).forEach(value => {
        if (value) count++;
      });
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Permission Management</h1>
                <p className="text-gray-500">Manage user permissions for assistants and publishers</p>
              </div>
            </div>
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="assistant">Assistants</option>
                <option value="publisher">Publishers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="ml-2 text-gray-500">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user._id} className="p-4">
                  {/* User Row */}
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleUserExpand(user._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.firstName?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className="text-sm text-gray-500">
                        {countActivePermissions(user.permissions)} permissions
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {expandedUser === user._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Permissions */}
                  {expandedUser === user._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {/* Action Buttons */}
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Module Permissions</h4>
                        <div className="flex gap-2">
                          {editingUser === user._id ? (
                            <>
                              <button
                                onClick={cancelEditing}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                                disabled={saving}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => resetToDefault(user._id)}
                                className="px-3 py-1 text-sm border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50"
                                disabled={saving}
                              >
                                Reset to Default
                              </button>
                              <button
                                onClick={() => savePermissions(user._id)}
                                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => startEditing(user)}
                              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                              Edit Permissions
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Permissions Grid */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-3 text-left font-medium text-gray-700">Module</th>
                              {Object.keys(actionLabels).map((action) => (
                                <th key={action} className="px-4 py-3 text-center font-medium text-gray-700">
                                  {actionLabels[action]}
                                </th>
                              ))}
                              {editingUser === user._id && (
                                <th className="px-4 py-3 text-center font-medium text-gray-700">All</th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {Object.keys(moduleLabels).map((module) => {
                              const permissions = editingUser === user._id
                                ? editedPermissions[module] || {}
                                : user.permissions?.[module] || {};

                              return (
                                <tr key={module} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 font-medium text-gray-900">
                                    {moduleLabels[module]}
                                  </td>
                                  {Object.keys(actionLabels).map((action) => (
                                    <td key={action} className="px-4 py-3 text-center">
                                      {editingUser === user._id ? (
                                        <button
                                          onClick={() => togglePermission(module, action)}
                                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                            permissions[action]
                                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                          }`}
                                        >
                                          {permissions[action] ? (
                                            <Check className="w-4 h-4" />
                                          ) : (
                                            <X className="w-4 h-4" />
                                          )}
                                        </button>
                                      ) : (
                                        <span
                                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${
                                            permissions[action]
                                              ? 'bg-green-100 text-green-600'
                                              : 'bg-gray-100 text-gray-400'
                                          }`}
                                        >
                                          {permissions[action] ? (
                                            <Check className="w-4 h-4" />
                                          ) : (
                                            <X className="w-4 h-4" />
                                          )}
                                        </span>
                                      )}
                                    </td>
                                  ))}
                                  {editingUser === user._id && (
                                    <td className="px-4 py-3 text-center">
                                      <div className="flex gap-1 justify-center">
                                        <button
                                          onClick={() => toggleAllModulePermissions(module, true)}
                                          className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200"
                                          title="Enable all"
                                        >
                                          All
                                        </button>
                                        <button
                                          onClick={() => toggleAllModulePermissions(module, false)}
                                          className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                                          title="Disable all"
                                        >
                                          None
                                        </button>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Permission Remarks */}
                      {user.permissionRemarks && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Remarks</p>
                              <p className="text-sm text-yellow-700">{user.permissionRemarks}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionDashboard;
