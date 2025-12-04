import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Trash2, User, AlertTriangle } from 'lucide-react';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { setAssistances, removeAssistance, setLoading, setError } from '../../../slice/assistanceSlice';
import ApiService from '../../../services/api';

const RemoveAssistance = () => {
  const dispatch = useDispatch();
  const { list: assistances, loading } = useSelector(store => store?.assistants);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    assistant: null,
    onConfirm: null
  });

  useEffect(() => {
    loadAssistances();
  }, []);

  const loadAssistances = async () => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService.assistances.getAll();
      dispatch(setAssistances(response.data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filteredAssistances = assistances.filter(assistant =>
    assistant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assistant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assistant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (assistant) => {
    setModalConfig({
      isOpen: true,
      assistant: assistant,
      onConfirm: async () => {
        try {
          await ApiService.assistances.delete(assistant._id);
          dispatch(removeAssistance(assistant._id));
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
      assistant: null,
      onConfirm: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Remove Assistant</h1>
          <p className="text-gray-600 mt-2">Delete assistant accounts from the system</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assistants to remove..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Warning: Irreversible Action</h3>
              <p className="text-red-700 text-sm mt-1">
                Deleting an assistant will permanently remove their account and all associated data.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Assistants List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Assistant Directory
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredAssistances.length} assistants found)
              </span>
            </h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading assistants...</p>
              </div>
            ) : filteredAssistances.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No assistants found</p>
                <p className="text-sm">
                  {searchTerm ? 'Try adjusting your search terms' : 'No assistants available to remove'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssistances.map((assistant) => (
                  <div key={assistant._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {assistant.firstName} {assistant.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{assistant.email}</p>
                        <p className="text-xs text-gray-500">
                          {assistant.department} • {assistant.position}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(assistant)}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        type="delete-assistant"
        data={modalConfig.assistant ? {
          name: `${modalConfig.assistant.firstName} ${modalConfig.assistant.lastName}`,
          email: modalConfig.assistant.email
        } : null}
      />
    </div>
  );
};

export default RemoveAssistance;