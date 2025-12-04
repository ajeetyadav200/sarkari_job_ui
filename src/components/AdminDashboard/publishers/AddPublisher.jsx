import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import PublisherForm from './PublisherForm';
import { useSelector } from 'react-redux';

const AddPublisher = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const [showPublisherForm, setShowPublisherForm] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleFormSuccess = (message) => {
    setSuccessMessage(message);
    // Optionally navigate back after success
    setTimeout(() => {
      navigate('/admin/publishers/all');
    }, 2000);
  };

  const handleFormClose = () => {
    setShowPublisherForm(false);
    navigate('/admin/publishers/all');
  };

  return (
    <AdminLayout user={user}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/publishers/all')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Publisher</h1>
              <p className="text-gray-600 mt-2">
                Create a new publisher account with the required details
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Publisher Form */}
        {showPublisherForm && (
          <PublisherForm
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AddPublisher;