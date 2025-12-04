
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   Users, 
//   FileText, 
//   Bell, 
//   BarChart3, 
//   Plus,
//   Edit3,
//   Trash2,
//   Download,
//   Link,
//   BookOpen,
//   Key,
//   School
// } from 'lucide-react';
// import AdminLayout from '../AdminDashboard/AdminLayout';
// import StatsCard from '../AdminDashboard/StatsCard';
// import RecentActivity from '../AdminDashboard/RecentActivity';
// import AssistantForm from '../AdminDashboard/assistants/AssistanceForm';
// import ConfirmationModal from '../../modals/ConfirmationModal';
// import ApiService from '../../services/api';
// import { setAssistances, setLoading, setError } from '../../slice/assistanceSlice';
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const user = useSelector(store => store.user);
//   const assistants = useSelector(store => store.assistants);
//   const dispatch = useDispatch();
//   const  navigate  = useNavigate()
  
//   const [showAssistantForm, setShowAssistantForm] = useState(false);
//   const [editingAssistant, setEditingAssistant] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     type: '',
//     data: null,
//     onConfirm: null
//   });

//   // Mock data - replace with actual API calls
//   const stats = [
//     { 
//       title: 'Total Assistance', 
//       value: assistants?.list?.length, 
//       icon: Users, 
//       color: 'bg-blue-500', 
//       trend: 12.5,
//       description: 'Active assistants'
//     },
//     { 
//       title: 'Active Publishers', 
//       value: '89', 
//       icon: FileText, 
//       color: 'bg-green-500', 
//       trend: 8.2,
//       description: 'Registered publishers'
//     },
//     { 
//       title: 'Job Alerts', 
//       value: '456', 
//       icon: Bell, 
//       color: 'bg-yellow-500', 
//       trend: -3.1,
//       description: 'This month'
//     },
//     { 
//       title: 'Results Posted', 
//       value: '2,341', 
//       icon: BarChart3, 
//       color: 'bg-purple-500', 
//       trend: 15.3,
//       description: 'Total results'
//     }
//   ];

//   const recentActivity = [
//     { id: 1, action: 'New assistance request', user: 'John Doe', time: '5 min ago', type: 'assistance', icon: Users },
//     { id: 2, action: 'Publisher updated', user: 'Jane Smith', time: '12 min ago', type: 'publisher', icon: FileText },
//     { id: 3, action: 'Job alert created', user: 'Mike Johnson', time: '1 hour ago', type: 'alert', icon: Bell },
//     { id: 4, action: 'Result published', user: 'Sarah Williams', time: '2 hours ago', type: 'result', icon: BarChart3 },
//     { id: 5, action: 'Latest Notice Published', user: 'Admin', time: '3 hours ago', type: 'notice', icon: Bell },
//     { id: 6, action: 'Govt. Link Updated', user: 'System', time: '4 hours ago', type: 'link', icon: Link },
//     { id: 7, action: 'Form Download Added', user: 'Admin', time: '5 hours ago', type: 'download', icon: Download },
//     { id: 8, action: 'Admission Details Updated', user: 'University Dept', time: '6 hours ago', type: 'admission', icon: School },
//     { id: 9, action: 'Syllabus Uploaded', user: 'Education Board', time: '1 day ago', type: 'syllabus', icon: BookOpen },
//     { id: 10, action: 'Answer Key Released', user: 'Exam Committee', time: '1 day ago', type: 'answer-key', icon: Key }
//   ];

//   useEffect(() => {
//     loadAssistants();
//   }, []);

//   const loadAssistants = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await ApiService.assistants.getAll();
//       dispatch(setAssistances(response.data));
//     } catch (err) {
//       dispatch(setError(err.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handleDeleteAssistant = (assistant) => {
//     setModalConfig({
//       isOpen: true,
//       type: 'delete-assistant',
//       data: {
//         name: `${assistant.firstName} ${assistant.lastName}`,
//         email: assistant.email
//       },
//       onConfirm: async () => {
//         try {
//           await ApiService.assistants.delete(assistant._id);
//           setSuccessMessage('Assistant deleted successfully');
//           loadAssistants();
//           closeModal();
//         } catch (err) {
//           dispatch(setError(err.message));
//           closeModal();
//         }
//       }
//     });
//   };

//   const handleLogoutAdmin = () => {
//     setModalConfig({
//       isOpen: true,
//       type: 'logout-admin',
//       data: { name: user?.name || 'Admin' },
//       onConfirm: async () => {
//         // Implement admin logout logic
//         try {
//           await ApiService.auth.logout();
//           setSuccessMessage('Logged out successfully');
          
//           // Clear user data from store
//           dispatch({ type: 'USER_LOGOUT' });
          
//           // Redirect to login page
//           localStorage.clear()
//            navigate("/login");
          
//           closeModal();
//         } catch (err) {
//           dispatch(setError(err.message));
//           closeModal();
//         }
//       }
//     });
//   };

//   const closeModal = () => {
//     setModalConfig({
//       isOpen: false,
//       type: '',
//       data: null,
//       onConfirm: null
//     });
//   };

//   const handleFormSuccess = (message) => {
//     setSuccessMessage(message);
//     loadAssistants();
//   };

//   return (
//     <AdminLayout user={user} onLogout={handleLogoutAdmin}>
//       {/* Success Message */}
//       {successMessage && (
//         <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
//           {successMessage}
//         </div>
//       )}

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <StatsCard key={index} {...stat} />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Recent Activity */}
//         <div className="lg:col-span-1">
//           <RecentActivity activities={recentActivity} />
//         </div>

//         {/* Quick Actions & Assistants */}
//         <div className="lg:col-span-1 space-y-8">
//           {/* Quick Actions */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <button 
//               onClick={() => setShowAssistantForm(true)}
//               className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 text-left"
//             >
//               <Users className="w-8 h-8 mb-3" />
//               <h4 className="font-bold text-lg mb-2">Add Assistance</h4>
//               <p className="text-sm text-blue-100">Create new assistance entry</p>
//             </button>
            
//             <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 text-left">
//               <FileText className="w-8 h-8 mb-3" />
//               <h4 className="font-bold text-lg mb-2">Add Publisher</h4>
//               <p className="text-sm text-green-100">Register new publisher</p>
//             </button>
//           </div>

//           {/* Assistants List */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//               <h3 className="text-lg font-bold text-gray-800">Assistants</h3>
//               <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
//                 {assistants?.list?.length} total
//               </span>
//             </div>
            
//             <div className="p-6">
//               {assistants.loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
//                   <p className="text-gray-500 mt-2">Loading assistants...</p>
//                 </div>
//               ) : assistants.list.length > 0 ? (
//                 <div className="space-y-4">
//                   {assistants.list.map((assistant) => (
//                     <div key={assistant._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <Users className="w-5 h-5 text-indigo-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-800">
//                             {assistant.firstName} {assistant.lastName}
//                           </p>
//                           <p className="text-sm text-gray-500">{assistant.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => setEditingAssistant(assistant)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           <Edit3 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteAssistant(assistant)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                   <p>No assistants found</p>
//                   <button 
//                     onClick={() => setShowAssistantForm(true)}
//                     className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
//                   >
//                     Add your first assistant
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Assistant Form Modal */}
//       {(showAssistantForm || editingAssistant) && (
//         <AssistantForm
//           onClose={() => {
//             setShowAssistantForm(false);
//             setEditingAssistant(null);
//           }}
//           onSuccess={handleFormSuccess}
//           editData={editingAssistant}
//         />
//       )}

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={modalConfig.isOpen}
//         onClose={closeModal}
//         onConfirm={modalConfig.onConfirm}
//         type={modalConfig.type}
//         data={modalConfig.data}
//       />
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  FileText, 
  Bell, 
  BarChart3, 
  Plus,
  Edit3,
  Trash2,
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
  AlertCircle,
  CheckCircle,
  XCircle,
  PauseCircle
} from 'lucide-react';
import AdminLayout from '../AdminDashboard/AdminLayout';
import StatsCard from '../AdminDashboard/StatsCard';
import AssistantForm from '../AdminDashboard/assistants/AssistanceForm';
import ConfirmationModal from '../../modals/ConfirmationModal';
import ApiService from '../../services/api';
import { setAssistances, setLoading, setError } from '../../slice/assistanceSlice';
import { fetchJobStats } from '../../slice/jobSlice';

const AdminDashboard = () => {
  const user = useSelector(store => store.user);
  const assistants = useSelector(store => store.assistants);
  const jobs = useSelector(store => store.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showAssistantForm, setShowAssistantForm] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });

  useEffect(() => {
    loadAssistants();
    dispatch(fetchJobStats());
  }, [dispatch]);

  // Stats with actual job data
  const stats = [
    { 
      title: 'Total Jobs', 
      value: jobs?.stats?.totalJobs || 0, 
      icon: Briefcase, 
      color: 'bg-blue-500', 
      trend: 12.5,
      description: 'All job postings',
      onClick: () => navigate('/admin/jobs')
    },
    { 
      title: 'Pending Review', 
      value: jobs?.stats?.statusWise?.find(s => s._id === 'pending')?.count || 0, 
      icon: AlertCircle, 
      color: 'bg-yellow-500', 
      trend: 8.2,
      description: 'Jobs pending verification',
      onClick: () => navigate('/admin/jobs/pending')
    },
    { 
      title: 'Active Publishers', 
      value: '89', 
      icon: FileText, 
      color: 'bg-green-500', 
      trend: -3.1,
      description: 'Registered publishers',
      onClick: () => navigate('/admin/publishers/all')
    },
    { 
      title: 'Total Assistance', 
      value: assistants?.list?.length || 0, 
      icon: Users, 
      color: 'bg-purple-500', 
      trend: 15.3,
      description: 'Active assistants',
      onClick: () => navigate('/admin/assistances/all')
    }
  ];

  const jobStatusCounts = {
    pending: jobs?.stats?.statusWise?.find(s => s._id === 'pending')?.count || 0,
    verified: jobs?.stats?.statusWise?.find(s => s._id === 'verified')?.count || 0,
    rejected: jobs?.stats?.statusWise?.find(s => s._id === 'rejected')?.count || 0,
    onHold: jobs?.stats?.statusWise?.find(s => s._id === 'onHold')?.count || 0
  };

  const loadAssistants = async () => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService.assistants.getAll();
      dispatch(setAssistances(response.data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteAssistant = (assistant) => {
    setModalConfig({
      isOpen: true,
      type: 'delete-assistant',
      data: {
        name: `${assistant.firstName} ${assistant.lastName}`,
        email: assistant.email
      },
      onConfirm: async () => {
        try {
          await ApiService.assistants.delete(assistant._id);
          setSuccessMessage('Assistant deleted successfully');
          loadAssistants();
          closeModal();
        } catch (err) {
          dispatch(setError(err.message));
          closeModal();
        }
      }
    });
  };

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
          dispatch(setError(err.message));
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

  const handleFormSuccess = (message) => {
    setSuccessMessage(message);
    loadAssistants();
  };

  const managementSections = [
    {
      title: 'Job Management',
      description: 'Manage all job postings',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      items: [
        { label: 'All Jobs', count: jobs?.stats?.totalJobs || 0, onClick: () => navigate('/admin/jobs') },
        { label: 'Pending Jobs', count: jobStatusCounts.pending, onClick: () => navigate('/admin/jobs/pending') },
        { label: 'Verified Jobs', count: jobStatusCounts.verified, onClick: () => navigate('/admin/jobs/verified') },
        { label: 'Rejected Jobs', count: jobStatusCounts.rejected, onClick: () => navigate('/admin/jobs/rejected') },
        { label: 'On Hold Jobs', count: jobStatusCounts.onHold, onClick: () => navigate('/admin/jobs/on-hold') }
      ]
    },
    {
      title: 'Content Management',
      description: 'Manage website content',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      items: [
        { label: 'Admit Card & Results', icon: FileCheck, onClick: () => navigate('/admin/admit-cards') },
        { label: 'Latest Notice', icon: Bell, onClick: () => navigate('/admin/notices') },
        { label: 'Govt. Links & Downloads', icon: Download, onClick: () => navigate('/admin/downloads') },
        { label: 'News Paper Gallery', icon: Newspaper, onClick: () => navigate('/admin/gallery') },
        { label: 'Answer Key', icon: Key, onClick: () => navigate('/admin/answer-keys') },
        { label: 'Syllabus', icon: Book, onClick: () => navigate('/admin/syllabus') },
        { label: 'Admission Details', icon: ClipboardList, onClick: () => navigate('/admin/admissions') }
      ]
    },
    {
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      items: [
        { label: 'All Assistants', count: assistants?.list?.length || 0, onClick: () => navigate('/admin/assistances/all') },
        { label: 'All Publishers', count: '89', onClick: () => navigate('/admin/publishers/all') },
        { label: 'Add Assistant', icon: Plus, onClick: () => setShowAssistantForm(true) },
        { label: 'Add Publisher', icon: Plus, onClick: () => navigate('/admin/publishers/add') }
      ]
    }
  ];

  return (
    <AdminLayout user={user} onLogout={handleLogoutAdmin}>
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} onClick={stat.onClick} className="cursor-pointer">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {managementSections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.onClick}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <item.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                      <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                        {item.label}
                      </span>
                    </div>
                    {item.count !== undefined && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Job Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/admin/jobs/create')}
              className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 text-left group"
            >
              <Briefcase className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-lg mb-2">Create Job</h4>
              <p className="text-sm text-blue-100">Add new job posting</p>
            </button>
            
            <button 
              onClick={() => setShowAssistantForm(true)}
              className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 text-left group"
            >
              <Users className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-lg mb-2">Add Assistant</h4>
              <p className="text-sm text-purple-100">Create assistant account</p>
            </button>
          </div>
        </div>

        {/* Job Status Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Job Status Overview</h3>
          <div className="space-y-4">
            {[
              { status: 'pending', label: 'Pending Review', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
              { status: 'verified', label: 'Verified', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
              { status: 'rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-100 text-red-800' },
              { status: 'onHold', label: 'On Hold', icon: PauseCircle, color: 'bg-orange-100 text-orange-800' }
            ].map((statusItem) => {
              const Icon = statusItem.icon;
              const count = jobStatusCounts[statusItem.status] || 0;
              const percentage = jobs?.stats?.totalJobs ? Math.round((count / jobs.stats.totalJobs) * 100) : 0;
              
              return (
                <div key={statusItem.status} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${statusItem.color.replace('text-', 'bg-').replace('800', '100')}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-700">{statusItem.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">{count}</span>
                      <span className="text-sm text-gray-500 ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${statusItem.color.replace('text-', 'bg-').replace('800', '500')}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assistants Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Assistants</h3>
            <p className="text-sm text-gray-600">Manage assistant accounts</p>
          </div>
          <button 
            onClick={() => setShowAssistantForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Assistant
          </button>
        </div>
        
        <div className="p-6">
          {assistants.loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading assistants...</p>
            </div>
          ) : assistants.list.length > 0 ? (
            <div className="space-y-4">
              {assistants.list.map((assistant) => (
                <div key={assistant._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {assistant.firstName} {assistant.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{assistant.email}</p>
                      {assistant.phone && (
                        <p className="text-sm text-gray-500">{assistant.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingAssistant(assistant)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Assistant"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAssistant(assistant)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Assistant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No assistants found</p>
              <button 
                onClick={() => setShowAssistantForm(true)}
                className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Add your first assistant
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Assistant Form Modal */}
      {(showAssistantForm || editingAssistant) && (
        <AssistantForm
          onClose={() => {
            setShowAssistantForm(false);
            setEditingAssistant(null);
          }}
          onSuccess={handleFormSuccess}
          editData={editingAssistant}
        />
      )}

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