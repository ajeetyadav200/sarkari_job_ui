import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Edit3, Trash2, LogOut } from 'lucide-react';
import PublisherForm from './PublisherForm';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import ApiService from '../../../services/api';
import { setPublishers, setLoading, setError } from '../../../../slice/publisherSlice';

const PublishersList = () => {
  const publishers = useSelector(store => store.publishers);
  const dispatch = useDispatch();
  
  const [showPublisherForm, setShowPublisherForm] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState(null);
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

  const handleLogoutPublisher = (publisher) => {
    setModalConfig({
      isOpen: true,
      type: 'logout-publisher',
      data: {
        name: `${publisher.firstName} ${publisher.lastName}`,
        email: publisher.email
      },
      onConfirm: async () => {
        try {
          await ApiService.publishers.logout(publisher._id);
          setSuccessMessage('Publisher logged out successfully');
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
    loadPublishers();
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Publishers List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Publishers</h3>
          <div className="flex items-center space-x-4">
            <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
              {publishers.list.length} total
            </span>
            <button 
              onClick={() => setShowPublisherForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Publisher
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {publishers.loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading publishers...</p>
            </div>
          ) : publishers.list.length > 0 ? (
            <div className="space-y-4">
              {publishers.list.map((publisher) => (
                <div key={publisher._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {publisher.firstName} {publisher.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{publisher.email}</p>
                      {publisher.phone && (
                        <p className="text-sm text-gray-500">{publisher.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPublisher(publisher)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Publisher"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLogoutPublisher(publisher)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Logout Publisher"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePublisher(publisher)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Publisher"
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
              <p>No publishers found</p>
              <button 
                onClick={() => setShowPublisherForm(true)}
                className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Add your first publisher
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Publisher Form Modal */}
      {(showPublisherForm || editingPublisher) && (
        <PublisherForm
          onClose={() => {
            setShowPublisherForm(false);
            setEditingPublisher(null);
          }}
          onSuccess={handleFormSuccess}
          editData={editingPublisher}
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
    </div>
  );
};

export default PublishersList;