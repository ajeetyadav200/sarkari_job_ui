


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import AssistanceForm from './AssistanceForm';
import { addAssistance } from '../../../slice/assistanceSlice';
import ApiService from '../../../services/api';

const AddAssistance = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.assistants);
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = async (message) => {
    // Refresh the list
    try {
      const response = await ApiService.assistants.getAll();
      dispatch(addAssistance(response.data));
    } catch (error) {
      console.error('Error refreshing assistants:', error);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Assistant</h1>
          <p className="text-gray-600 mt-2">Create a new assistant account with basic information</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Assistant Information</h2>
              <button
                onClick={() => setShowForm(true)}
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Assistant</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Assistant Added Yet</h3>
              <p className="text-gray-500 mb-6">
                Click the "Add New Assistant" button to create your first assistant account with basic details.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Your First Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assistance Form Modal */}
      {showForm && (
        <AssistanceForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AddAssistance;