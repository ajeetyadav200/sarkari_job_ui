import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import PublisherForm from './PublisherForm';
import { useSelector } from 'react-redux';
import ApiService from '../../../services/api';

const UpdatePublisher = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(store => store.user);
  const [publisher, setPublisher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPublisherForm, setShowPublisherForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadPublisher();
  }, [id]);

  const loadPublisher = async () => {
    try {
      setLoading(true);
      const response = await ApiService.publishers.getById(id);
      setPublisher(response.data);
      setShowPublisherForm(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      navigate('/admin/publishers/all');
    }, 2000);
  };

  const handleFormClose = () => {
    setShowPublisherForm(false);
    navigate('/admin/publishers/all');
  };

  if (loading) {
    return (
      <AdminLayout user={user}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading publisher details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout user={user}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate('/admin/publishers/all')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Publishers
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-800">
                Update Publisher
              </h1>
              <p className="text-gray-600 mt-2">
                Update the details for {publisher?.firstName} {publisher?.lastName}
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
        {showPublisherForm && publisher && (
          <PublisherForm
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
            editData={publisher}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UpdatePublisher;