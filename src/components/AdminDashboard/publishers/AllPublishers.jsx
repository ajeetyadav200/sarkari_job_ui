import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Users, Edit3, Trash2, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import ApiService from '../../../services/api';
import { setPublishers, setLoading, setError } from '../../../slice/publisherSlice';

const AllPublishers = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const publishers = useSelector(store => store.publishers);
  const dispatch = useDispatch();
  
  const [successMessage, setSuccessMessage] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    data: null,
    onConfirm: null
  });

  useEffect(() => {
    loadPublishers();
  }, []);

  const loadPublishers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService.publishers.getAll();
      dispatch(setPublishers(response.data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeletePublisher = (publisher) => {
    setModalConfig({
      isOpen: true,
      type: 'delete-publisher',
      data: {
        name: `${publisher.firstName} ${publisher.lastName}`,
        email: publisher.email
      },
      onConfirm: async () => {
        try {
          await ApiService.publishers.delete(publisher._id);
          setSuccessMessage('Publisher deleted successfully');
          loadPublishers();
          closeModal();
        } catch (err) {
          dispatch(setError(err.message));
          closeModal();
        }
      }
    });
  };

//   const handleLogoutPublisher = (publisher) => {
//     setModalConfig({
//       isOpen: true,
//       type: 'logout-publisher',
//       data: {
//         name: `${publisher.firstName} ${publisher.lastName}`,
//         email: publisher.email
//       },
//       onConfirm: async () => {
//         try {
//           await ApiService.publishers.logout(publisher._id);
//           setSuccessMessage('Publisher logged out successfully');
//           closeModal();
//         } catch (err) {
//           dispatch(setError(err.message));
//           closeModal();
//         }
//       }
//     });
//   };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: '',
      data: null,
      onConfirm: null
    });
  };

  return (
    <AdminLayout user={user}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">All Publishers</h1>
              <p className="text-gray-600 mt-2">
                Manage all publisher accounts in the system
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/publishers/add')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Publisher</span>
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Publishers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                Publishers ({publishers.list.length})
              </h3>
            </div>
          </div>
          
          <div className="p-6">
            {publishers.loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading publishers...</p>
              </div>
            ) : publishers.list.length > 0 ? (
              <div className="grid gap-4">
                {publishers.list.map((publisher) => (
                  <div key={publisher._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-lg">
                          {publisher.firstName} {publisher.lastName}
                        </p>
                        <p className="text-gray-600">{publisher.email}</p>
                        {publisher.phone && (
                          <p className="text-sm text-gray-500">{publisher.phone}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          Created: {new Date(publisher.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/publishers/update/${publisher._id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      {/* <button
                        onClick={() => handleLogoutPublisher(publisher)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button> */}
                      <button
                        onClick={() => handleDeletePublisher(publisher)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No publishers found</p>
                <p className="text-sm mb-4">Get started by adding your first publisher</p>
                <button 
                  onClick={() => navigate('/admin/publishers/add')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Publisher
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={modalConfig.onConfirm}
          type={modalConfig.type}
          data={modalConfig.data}
        />
      </div>
    </AdminLayout>
  );
};

export default AllPublishers;