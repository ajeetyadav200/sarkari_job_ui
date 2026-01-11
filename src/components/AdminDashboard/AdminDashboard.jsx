
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Bell, 
  Download,
  Link,
  BookOpen,
  Key,
  School,
  Briefcase,
  Newspaper,
  FileCheck,
  Book,
  ClipboardList,
  Users,
  LogOut
} from 'lucide-react';
import AdminLayout from '../AdminDashboard/AdminLayout';
import ConfirmationModal from '../../modals/ConfirmationModal';
import ApiService from '../../services/api';

const AdminDashboard = () => {
  const user = useSelector(store => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [successMessage, setSuccessMessage] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });

  const handleLogoutAdmin = () => {
    setModalConfig({
      isOpen: true,
      type: 'logout-admin',
      data: { name: user?.name || 'Admin' },
      onConfirm: async () => {
        try {
          await ApiService.auth.logout();
          setSuccessMessage('Logged out successfully');
          
          // Clear user data from store
          dispatch({ type: 'USER_LOGOUT' });
          
          // Redirect to login page
          localStorage.clear();
          navigate("/login");
          
          closeModal();
        } catch (err) {
          console.error('Logout error:', err);
          closeModal();
        }
      }
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: '',
      data: null,
      onConfirm: null
    });
  };

  const managementSections = [
    {
      title: 'Job',
      description: 'Job Management',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      items: [
        { 
          label: 'Job', 
          icon: FileCheck, 
          onClick: () => navigate('/admin/jobs'),
          description: 'Manage job here'
        },
        { 
          label: 'Admit Card', 
          icon: FileCheck, 
          onClick: () => navigate('/admin/admit-cards'),
          description: 'Manage admit cards'
        },
        { 
          label: 'Result', 
          icon: FileCheck, 
          onClick: () => navigate('/admin/results'),
          description: 'Manage results'
        },
        { 
          label: 'Latest Notice', 
          icon: Bell, 
          onClick: () => navigate('/admin/notices'),
          description: 'Latest job notices'
        }
      ]
    },
    {
      title: 'Direct Link',
      description: 'Direct Links & Downloads',
      icon: Link,
      color: 'from-green-500 to-green-600',
      items: [
        { 
          label: 'Govt. Link', 
          icon: Link, 
          onClick: () => navigate('/admin/government-services'),
          description: 'Government links'
        },
        { 
          label: 'Form Download', 
          icon: Download, 
          onClick: () => navigate('/admin/forms'),
          description: 'Downloadable forms'
        },
        { 
          label: 'Newspaper Cutting', 
          icon: Newspaper, 
          onClick: () => navigate('/admin/newspaper-cuttings'),
          description: 'Newspaper cuttings gallery'
        }
      ]
    },
    {
      title: 'Answer Key',
      description: 'Examination Resources',
      icon: Key,
      color: 'from-purple-500 to-purple-600',
      items: [
        { 
          label: 'Answer Key', 
          icon: Book, 
          onClick: () => navigate('/admin/answers'),
          description: 'Exam syllabus'
        },
        { 
          label: 'Admission Details', 
          icon: ClipboardList, 
          onClick: () => navigate('/admin/admissions'),
          description: 'Admission information'
        }
      ]
    }
  ];

  return (
    <AdminLayout user={user} onLogout={handleLogoutAdmin}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}!</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Management Sections - Matching Image Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {managementSections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Section Header */}
            <div className={`px-6 py-4 bg-gradient-to-r ${section.color} text-white`}>
              <div className="flex items-center gap-3">
                <section.icon className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-bold">{section.title}</h3>
                  <p className="text-sm opacity-90">{section.description}</p>
                </div>
              </div>
            </div>
            
            {/* Section Items */}
            <div className="p-6">
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.onClick}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 group border border-gray-200 hover:border-blue-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-white border border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors duration-200`}>
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                      </div>
                      <div>
                        <span className="text-gray-800 group-hover:text-blue-700 font-medium text-base block">
                          {item.label}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogoutAdmin}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout Admin
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        type={modalConfig.type}
        data={modalConfig.data}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;