import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader } from 'lucide-react';
import AssistanceForm from './AssistanceForm';
import { updateAssistance } from '../../../slice/assistanceSlice';
import ApiService from '../../../services/api';

const UpdateAssistance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: assistances } = useSelector(store => store?.assistants);
  const [assistant, setAssistant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssistant();
  }, [id]);

  const loadAssistant = async () => {
    try {
      setLoading(true);
      // Try to find in Redux store first
      const existingAssistant = assistances.find(a => a._id === id);
      
      if (existingAssistant) {
        setAssistant(existingAssistant);
      } else {
        // Fetch from API if not in store
        const response = await ApiService.assistants.getById(id);
        setAssistant(response.data);
      }
    } catch (error) {
      console.error('Error loading assistant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (message) => {
    // The form will handle the update and dispatch
    setShowForm(false);
    navigate('/admin/assistances/all');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          <p className="text-gray-600 mt-2">Loading assistant details...</p>
        </div>
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Assistant not found</p>
          <button
            onClick={() => navigate('/admin/assistances/all')}
            className="text-indigo-600 hover:text-indigo-800 mt-2"
          >
            Back to all assistants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/assistances/all')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Assistants</span>
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Update Assistant</h1>
              <p className="text-gray-600 mt-2">
                Edit details for {assistant.firstName} {assistant.lastName}
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Edit Assistant</span>
            </button>
          </div>
        </div>

        {/* Current Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {assistant.firstName} {assistant.lastName}</p>
                <p><strong>Email:</strong> {assistant.email}</p>
                <p><strong>Phone:</strong> {assistant.phone || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Professional Information</h3>
              <div className="space-y-2">
                <p><strong>Department:</strong> {assistant.department}</p>
                <p><strong>Position:</strong> {assistant.position}</p>
                <p><strong>Address:</strong> {assistant.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            <strong>Note:</strong> Click "Edit Assistant" to modify this assistant's information.
            Password changes are only available during assistant creation.
          </p>
        </div>
      </div>

      {/* Assistance Form Modal */}
      {showForm && (
        <AssistanceForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
          editData={assistant}
        />
      )}
    </div>
  );
};

export default UpdateAssistance;