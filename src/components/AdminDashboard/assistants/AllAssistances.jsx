// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { Search, Filter, Download, Users } from 'lucide-react';
// // import AssistanceList from './AssistanceList';
// // import { setAssistances, setLoading, setError } from '../../../slice/assistanceSlice';
// // import ApiService from '../../../services/api';

// // const AllAssistances = () => {
// //   const dispatch = useDispatch();
// //   const { list: assistances, loading } = useSelector(store => store.assistants);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [departmentFilter, setDepartmentFilter] = useState('');

// //   const departments = [...new Set(assistances.map(a => a.department))];

// //   useEffect(() => {
// //     loadAssistances();
// //   }, []);

// //   const loadAssistances = async () => {
// //     try {
// //       dispatch(setLoading(true));
// //       const response = await ApiService.assistants.getAll();
// //       dispatch(setAssistances(response.data));
// //     } catch (err) {
// //       dispatch(setError(err.message));
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// // const filteredAssistances = assistances.filter(assistant => {
// //   const first = (assistant.firstName || "").toLowerCase();
// //   const last = (assistant.lastName || "").toLowerCase();
// //   const email = (assistant.email || "").toLowerCase();
// //   const position = (assistant.position || "").toLowerCase();

// //   const search = searchTerm.toLowerCase();

// //   const matchesSearch =
// //     first.includes(search) ||
// //     last.includes(search) ||
// //     email.includes(search) ||
// //     position.includes(search);

// //   const matchesDepartment = departmentFilter
// //     ? assistant.department === departmentFilter
// //     : true;

// //   return matchesSearch && matchesDepartment;
// // });


// //   const handleEdit = (assistant) => {
// //     // Implementation for edit will be in parent component
// //     console.log('Edit assistant:', assistant);
// //   };

// //   const handleDelete = (assistant) => {
// //     // Implementation for delete will be in parent component
// //     console.log('Delete assistant:', assistant);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900">All Assistants</h1>
// //               <p className="text-gray-600 mt-2">Manage and view all assistant accounts</p>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
// //                 {assistances.length} assistants
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters and Search */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             {/* Search */}
// //             <div className="relative">
// //               <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search assistants..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //               />
// //             </div>

// //             {/* Department Filter */}
// //             <div className="relative">
// //               <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //               <select
// //                 value={departmentFilter}
// //                 onChange={(e) => setDepartmentFilter(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
// //               >
// //                 <option value="">All Departments</option>
// //                 {departments.map((dept, index) => (
// //                   <option key={`${dept}-${index}`} value={dept}>
// //                     {dept || "Unknown"}
// //                   </option>
// //                 ))}

// //               </select>
// //             </div>

// //             {/* Export Button */}
// //             <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
// //               <Download className="w-5 h-5" />
// //               <span>Export</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Assistants List */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// //           <div className="p-6 border-b border-gray-200">
// //             <h2 className="text-xl font-semibold text-gray-800">Assistant Directory</h2>
// //           </div>

// //           <div className="p-6">
// //             <AssistanceList
// //               assistances={filteredAssistances}
// //               onEdit={handleEdit}
// //               onDelete={handleDelete}
// //               loading={loading}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllAssistances;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Search, Filter, Download, Users, Plus, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import AssistanceList from './AssistanceList';
// import ConfirmationModal from '../../../modals/ConfirmationModal';
// import { 
//   setAssistances, 
//   removeAssistance, 
//   updateAssistance,
//   setLoading, 
//   setError,
//   clearError 
// } from '../../../slice/assistanceSlice';
// import ApiService from '../../../services/api';

// const AllAssistances = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { list: assistances, loading, error } = useSelector(store => store.assistants);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('');
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     type: '',
//     assistant: null,
//     onConfirm: null
//   });
//   const [successMessage, setSuccessMessage] = useState('');

//   const departments = [...new Set(assistances.map(a => a.department).filter(Boolean))];

//   useEffect(() => {
//     loadAssistances();
//   }, []);

//   const loadAssistances = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await ApiService.assistants.getAll();
//       if (response && response.data) {
//         dispatch(setAssistances(response.data));
//       } else {
//         dispatch(setError('Failed to load assistants'));
//       }
//     } catch (err) {
//       dispatch(setError(err.message || 'Failed to load assistants'));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const filteredAssistances = assistances.filter(assistant => {
//     const first = (assistant.firstName || "").toLowerCase();
//     const last = (assistant.lastName || "").toLowerCase();
//     const email = (assistant.email || "").toLowerCase();
//     const position = (assistant.position || "").toLowerCase();

//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       first.includes(search) ||
//       last.includes(search) ||
//       email.includes(search) ||
//       position.includes(search);

//     const matchesDepartment = departmentFilter
//       ? assistant.department === departmentFilter
//       : true;

//     return matchesSearch && matchesDepartment;
//   });

//   const handleEdit = (assistant) => {
//     // Navigate to edit page
//     navigate(`/admin/assistances/update/${assistant._id}`);
//   };

//   const handleDelete = (assistant) => {
//     setModalConfig({
//       isOpen: true,
//       type: 'delete-assistant',
//       assistant: assistant,
//       onConfirm: async () => {
//         try {
//           dispatch(setLoading(true));
//           const response = await ApiService.assistants.delete(assistant._id);
          
//           if (response && response.success) {
//             dispatch(removeAssistance(assistant._id));
//             setSuccessMessage(`Assistant "${assistant.firstName} ${assistant.lastName}" deleted successfully`);
//             setTimeout(() => setSuccessMessage(''), 3000);
//           } else {
//             throw new Error(response?.message || 'Failed to delete assistant');
//           }
//         } catch (err) {
//           dispatch(setError(err.message));
//           setModalConfig({
//             isOpen: true,
//             type: 'error',
//             assistant: assistant,
//             onConfirm: closeModal,
//             message: err.message || 'Failed to delete assistant. Please try again.'
//           });
//         } finally {
//           dispatch(setLoading(false));
//         }
//       }
//     });
//   };

//   const handleAssistanceUpdated = (updatedAssistant) => {
//     dispatch(updateAssistance(updatedAssistant));
//     setSuccessMessage(`Assistant "${updatedAssistant.firstName} ${updatedAssistant.lastName}" updated successfully`);
//     setTimeout(() => setSuccessMessage(''), 3000);
//   };

//   const handleAssistanceDeleted = (assistantId) => {
//     // This will be called from AssistanceList component
//     const assistant = assistances.find(a => a._id === assistantId);
//     if (assistant) {
//       dispatch(removeAssistance(assistantId));
//       setSuccessMessage(`Assistant "${assistant.firstName} ${assistant.lastName}" deleted successfully`);
//       setTimeout(() => setSuccessMessage(''), 3000);
//     }
//   };

//   const closeModal = () => {
//     setModalConfig({
//       isOpen: false,
//       type: '',
//       assistant: null,
//       onConfirm: null
//     });
//   };

//   const handleExport = () => {
//     // Export functionality
//     const csvData = filteredAssistances.map(assistant => ({
//       'First Name': assistant.firstName,
//       'Last Name': assistant.lastName,
//       'Email': assistant.email,
//       'Phone': assistant.phone || '',
//       'Department': assistant.department || '',
//       'Position': assistant.position || '',
//       'Address': assistant.address || '',
//       'Status': assistant.status || 'active'
//     }));

//     const csv = convertToCSV(csvData);
//     downloadCSV(csv, `assistants_export_${new Date().toISOString().split('T')[0]}.csv`);
//   };

//   const convertToCSV = (data) => {
//     if (data.length === 0) return '';
//     const headers = Object.keys(data[0]);
//     const rows = data.map(row => 
//       headers.map(header => `"${row[header] || ''}"`).join(',')
//     );
//     return [headers.join(','), ...rows].join('\n');
//   };

//   const downloadCSV = (csv, filename) => {
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">All Assistants</h1>
//               <p className="text-gray-600 mt-2">Manage and view all assistant accounts</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
//                 {filteredAssistances.length} assistants
//               </span>
//               <button
//                 onClick={() => navigate('/admin/assistances/create')}
//                 className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 <Plus className="w-5 h-5" />
//                 <span>Add Assistant</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Success Message */}
//         {successMessage && (
//           <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
//             {successMessage}
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <AlertCircle className="w-5 h-5" />
//                 <span>{error}</span>
//               </div>
//               <button 
//                 onClick={() => dispatch(clearError())}
//                 className="text-red-800 hover:text-red-900 font-medium"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search assistants..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//               />
//             </div>

//             {/* Department Filter */}
//             <div className="relative">
//               <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <select
//                 value={departmentFilter}
//                 onChange={(e) => setDepartmentFilter(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
//               >
//                 <option value="">All Departments</option>
//                 {departments.map((dept, index) => (
//                   <option key={`${dept}-${index}`} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Export Button */}
//             <button 
//               onClick={handleExport}
//               className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Download className="w-5 h-5" />
//               <span>Export</span>
//             </button>
//           </div>
//         </div>

//         {/* Assistants Count */}
//         {filteredAssistances.length > 0 && (
//           <div className="mb-4">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <Users className="w-5 h-5" />
//               <span className="font-medium">
//                 Showing {filteredAssistances.length} of {assistances.length} assistants
//                 {departmentFilter && ` in ${departmentFilter}`}
//                 {searchTerm && ` matching "${searchTerm}"`}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Assistants List */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800">Assistant Directory</h2>
//           </div>

//           <div className="p-6">
//             <AssistanceList
//               assistances={filteredAssistances}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onAssistanceUpdated={handleAssistanceUpdated}
//               onAssistanceDeleted={handleAssistanceDeleted}
//               loading={loading}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={modalConfig.isOpen}
//         onClose={closeModal}
//         onConfirm={modalConfig.onConfirm}
//         type={modalConfig.type}
//         data={modalConfig.assistant ? {
//           name: `${modalConfig.assistant.firstName} ${modalConfig.assistant.lastName}`,
//           email: modalConfig.assistant.email,
//           department: modalConfig.assistant.department,
//           position: modalConfig.assistant.position
//         } : null}
//         message={modalConfig.message}
//       />
//     </div>
//   );
// };

// export default AllAssistances;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, Download, Users, Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AssistanceList from './AssistanceList';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { 
  setAssistances, 
  removeAssistance, 
  updateAssistance,
  setLoading, 
  setError,
  clearError 
} from '../../../slice/assistanceSlice';
import ApiService from '../../../services/api';

const AllAssistances = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: assistances, loading, error } = useSelector(store => store.assistants);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    assistant: null,
    onConfirm: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const departments = [...new Set(assistances.map(a => a.department).filter(Boolean))];

  useEffect(() => {
    loadAssistances();
  }, []);

  const loadAssistances = async () => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService.assistants.getAll();
      if (response && response.data) {
        dispatch(setAssistances(response.data));
      } else {
        dispatch(setError('Failed to load assistants'));
      }
    } catch (err) {
      dispatch(setError(err.message || 'Failed to load assistants'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filteredAssistances = assistances.filter(assistant => {
    const first = (assistant.firstName || "").toLowerCase();
    const last = (assistant.lastName || "").toLowerCase();
    const email = (assistant.email || "").toLowerCase();
    const position = (assistant.position || "").toLowerCase();

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      first.includes(search) ||
      last.includes(search) ||
      email.includes(search) ||
      position.includes(search);

    const matchesDepartment = departmentFilter
      ? assistant.department === departmentFilter
      : true;

    return matchesSearch && matchesDepartment;
  });

  const handleEdit = (assistant) => {
    navigate(`/admin/assistances/update/${assistant._id}`);
  };

  const handleDelete = (assistant) => {
    // Show confirmation modal
    setModalConfig({
      isOpen: true,
      type: 'delete-assistant',
      assistant: assistant,
      onConfirm: async () => {
        try {
          dispatch(setLoading(true));
          const response = await ApiService.assistants.delete(assistant._id);
          
          if (response && response.success) {
            // Remove from Redux store
            dispatch(removeAssistance(assistant._id));
            
            // Show success message
            setSuccessMessage(`Assistant "${assistant.firstName} ${assistant.lastName}" deleted successfully`);
            setTimeout(() => setSuccessMessage(''), 3000);
            
            // Close modal
            closeModal();
          } else {
            throw new Error(response?.message || 'Failed to delete assistant');
          }
        } catch (err) {
          // Show error modal
          setModalConfig({
            isOpen: true,
            type: 'error',
            assistant: null,
            onConfirm: closeModal,
            message: err.message || 'Failed to delete assistant. Please try again.'
          });
          dispatch(setError(err.message));
        } finally {
          dispatch(setLoading(false));
        }
      }
    });
  };

  const handleAssistanceUpdated = (updatedAssistant) => {
    dispatch(updateAssistance(updatedAssistant));
    setSuccessMessage(`Assistant "${updatedAssistant.firstName} ${updatedAssistant.lastName}" updated successfully`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: '',
      assistant: null,
      onConfirm: null
    });
  };

  const handleExport = () => {
    if (filteredAssistances.length === 0) {
      setModalConfig({
        isOpen: true,
        type: 'error',
        assistant: null,
        onConfirm: closeModal,
        message: 'No assistants to export'
      });
      return;
    }

    const csvData = filteredAssistances.map(assistant => ({
      'First Name': assistant.firstName,
      'Last Name': assistant.lastName,
      'Email': assistant.email,
      'Phone': assistant.phone || '',
      'Department': assistant.department || '',
      'Position': assistant.position || '',
      'Address': assistant.address || '',
      'Status': assistant.status || 'active'
    }));

    const csv = convertToCSV(csvData);
    downloadCSV(csv, `assistants_export_${new Date().toISOString().split('T')[0]}.csv`);
    
    setSuccessMessage('Export completed successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => `"${row[header] || ''}"`).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Assistants</h1>
              <p className="text-gray-600 mt-2">Manage and view all assistant accounts</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredAssistances.length} assistants
              </span>
              <button
                onClick={() => navigate('/admin/assistances/add')}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
              <button 
                onClick={() => dispatch(clearError())}
                className="text-red-800 hover:text-red-900 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
              >
                <option value="">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={`${dept}-${index}`} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <button 
              onClick={handleExport}
              disabled={filteredAssistances.length === 0}
              className={`flex items-center justify-center space-x-2 border px-4 py-2 rounded-lg transition-colors ${
                filteredAssistances.length === 0
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Assistants Count */}
        {filteredAssistances.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                Showing {filteredAssistances.length} of {assistances.length} assistants
                {departmentFilter && ` in ${departmentFilter}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
            </div>
          </div>
        )}

        {/* Assistants List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Assistant Directory</h2>
          </div>

          <div className="p-6">
            <AssistanceList
              assistances={filteredAssistances}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Single Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        type={modalConfig.type}
        data={modalConfig.assistant ? {
          name: `${modalConfig.assistant.firstName} ${modalConfig.assistant.lastName}`,
          email: modalConfig.assistant.email,
          department: modalConfig.assistant.department,
          position: modalConfig.assistant.position
        } : null}
        message={modalConfig.message}
      />
    </div>
  );
};

export default AllAssistances;