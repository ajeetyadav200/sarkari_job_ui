



import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users, FileText, Bell, BarChart3, Settings, LogOut, X, Home, BookOpen, TrendingUp, Shield, Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, activeMenu, setActiveMenu, onLogout }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const user = useSelector(store => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home,
      path: '/admin'
    },
    {
  id: 'assistance',
  label: 'Assistance',
  icon: Users,
  subItems: [
    { id: 'add-assistance', label: 'Add Assistance', path: '/admin/assistances/add' },
    { id: 'all-assistance', label: 'View All Assistance', path: '/admin/assistances/all' },
   
    { id: 'remove-assistance', label: 'Remove Assistance', path: '/admin/assistances/remove' }
  ]
},
    {
      id: 'publisher',
      label: 'Publisher',
      icon: FileText,
      subItems: [
        { id: 'add-publisher', label: 'Add Publisher', path: '/admin/publishers/add' },
        { id: 'all-publishers', label: 'View All Publishers', path: '/admin/publishers/all' },
        
        { id: 'remove-publisher', label: 'Remove Publisher', path: '/admin/publishers/remove' }
      ]
    },
    {
      id: 'job-alert',
      label: 'Job Alert',
      icon: Bell,
      subItems: [
        { id: 'create-alert', label: 'Create Alert', path: '/admin/job-alerts/create' },
        { id: 'manage-alerts', label: 'Manage Alerts', path: '/admin/job-alerts/manage' },
        { id: 'alert-analytics', label: 'Alert Analytics', path: '/admin/job-alerts/analytics' }
      ]
    },
    {
      id: 'results',
      label: 'Results',
      icon: BarChart3,
      subItems: [
        { id: 'add-result', label: 'Add Result', path: '/admin/results/add' },
        { id: 'view-results', label: 'View Results', path: '/admin/results/view' },
        { id: 'result-reports', label: 'Result Reports', path: '/admin/results/reports' }
      ]
    },
    {
      id: 'content',
      label: 'Cyber Management',
      icon: BookOpen,
      subItems: [
        { id: 'CyberCafeAdminDashboard', label: 'CyberCafeAdminDashboard', path: '/admin/cyber-cafes' },
        // { id: 'categories', label: 'Categories', path: '/admin/content/categories' },
        // { id: 'media', label: 'Media Library', path: '/admin/content/media' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      path: '/admin/analytics'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Shield,
      subItems: [
        { id: 'all-users', label: 'All Users', path: '/admin/users/all' },
        { id: 'roles', label: 'Roles & Permissions', path: '/admin/users/roles' },
        { id: 'activity-log', label: 'Activity Log', path: '/admin/users/activity' }
      ]
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: Mail,
      badge: '12',
      path: '/admin/messages'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleNavigation = (path, menuId) => {
    setActiveMenu(menuId);
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-gradient-to-b from-indigo-900 to-indigo-800
        text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="flex items-center justify-between p-6 border-b border-indigo-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AdminPanel</h1>
              <p className="text-xs text-indigo-300">Management System</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleMenu(item.id);
                  } else {
                    handleNavigation(item.path, item.id);
                  }
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${activeMenu === item.id 
                    ? 'bg-white text-indigo-900 shadow-lg' 
                    : 'hover:bg-indigo-700 text-white'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  expandedMenus[item.id] 
                    ? <ChevronDown className="w-4 h-4" />
                    : <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {item.subItems && expandedMenus[item.id] && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleNavigation(subItem.path, subItem.id)}
                      className={`
                        w-full text-left px-4 py-2 rounded-lg text-sm
                        transition-all duration-200
                        ${activeMenu === subItem.id
                          ? 'bg-indigo-700 text-white'
                          : 'hover:bg-indigo-700/50 text-indigo-200'
                        }
                      `}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                     bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;