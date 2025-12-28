import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createAdmitCard,
  updateAdmitCard,
  fetchAdmitCardById,
  fetchAvailableReferences,
  clearReferences
} from '../../slice/admitCardSlice';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const AdmitCardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  // Extract user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[1];

  const { currentAdmitCard, loading, references } = useSelector(state => state?.admitCards);
  const user = useSelector(store => store?.user);

  const [formData, setFormData] = useState({
    type: '',
    referenceId: '',
    referenceModel: '',
    directWebURL: '',
    linkMenuField: '',
    postTypeDetails: '',
    admitCardStatus: 'active',
    status: user.role === 'admin' ? 'pending' : 'pending'
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobSearch, setJobSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlsoShowLink, setShowAlsoShowLink] = useState(false);

  const postTypeOptions = [
    { value: '', label: 'Select Post Type', disabled: true },
    { value: 'Job', label: 'Job', color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'Admission', label: 'Admission', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'LatestNotice', label: 'Latest Notice', color: 'text-pink-600', bg: 'bg-pink-50' },
    { value: 'OtherModel', label: 'Other', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAdmitCardById(id));
    }

    return () => {
      dispatch(clearReferences());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentAdmitCard && isEditMode) {
      setFormData({
        type: currentAdmitCard.type || '',
        referenceId: currentAdmitCard.referenceId?._id || '',
        referenceModel: currentAdmitCard.referenceModel || '',
        directWebURL: currentAdmitCard.directWebURL || '',
        linkMenuField: currentAdmitCard.linkMenuField || '',
        postTypeDetails: currentAdmitCard.postTypeDetails || '',
        admitCardStatus: currentAdmitCard.admitCardStatus || 'active',
        status: currentAdmitCard.status || 'pending'
      });

      if (currentAdmitCard.referenceId) {
        setSelectedJob(currentAdmitCard.referenceId);
      }
    }
  }, [currentAdmitCard, isEditMode]);

  // Fetch all jobs when type is selected or when Also Show Link is opened
  useEffect(() => {
    if (formData.type && formData.type !== 'OtherModel' && showAlsoShowLink) {
      setIsSearching(true);
      dispatch(fetchAvailableReferences({ type: formData.type, search: jobSearch || '' }))
        .finally(() => setIsSearching(false));
    }
  }, [formData.type, showAlsoShowLink, dispatch]);

  // Debounced search for references
  useEffect(() => {
    if (formData.type && formData.type !== 'OtherModel' && jobSearch.trim() && showAlsoShowLink) {
      setIsSearching(true);
      const debounceTimer = setTimeout(() => {
        dispatch(fetchAvailableReferences({ type: formData.type, search: jobSearch }))
          .finally(() => setIsSearching(false));
      }, 500);

      return () => {
        clearTimeout(debounceTimer);
        setIsSearching(false);
      };
    }
  }, [jobSearch, formData.type, dispatch, showAlsoShowLink]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (formData.type !== 'OtherModel' && !formData.referenceId) {
      newErrors.referenceId = `Please select a ${formData.type}`;
    }

    if (!formData.linkMenuField || !formData.linkMenuField.trim()) {
      newErrors.linkMenuField = 'Link menu field is required';
    }

    if (!formData.postTypeDetails || !formData.postTypeDetails.trim()) {
      newErrors.postTypeDetails = 'Exam name or other details is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (formData.type !== 'OtherModel' && !formData.referenceId) {
      toast.error(`Please select a ${formData.type} first before creating admit card`);
      return;
    }

    // Build submit data based on type
    const submitData = {
      type: formData.type,
      linkMenuField: formData.linkMenuField.trim(),
      postTypeDetails: formData.postTypeDetails.trim(),
      admitCardStatus: formData.admitCardStatus,
      status: formData.status,
      createdByDetails: {
        name: user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        userId: user.id || user._id || ''
      }
    };

    // Only add referenceId and referenceModel if type is not OtherModel
    if (formData.type !== 'OtherModel') {
      submitData.referenceId = formData.referenceId;
      submitData.referenceModel = formData.referenceModel;
    }

    // Add directWebURL if provided
    if (formData.directWebURL && formData.directWebURL.trim()) {
      submitData.directWebURL = formData.directWebURL.trim();
    }

    console.log('Submitting admit card data:', submitData);

    try {
      if (isEditMode) {
        await dispatch(updateAdmitCard({ id, data: submitData }));
      } else {
        await dispatch(createAdmitCard(submitData));
      }
      navigate(`/${userRole}/admit-cards`);
    } catch (error) {
      console.error('Error submitting admit card:', error);
      // Error toast is already shown by the slice
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTypeSelect = (e) => {
    const type = e.target.value;
    setFormData(prev => ({ ...prev, type }));
    setSelectedJob(null);
    setJobSearch('');
    setShowAlsoShowLink(false);
    setErrors(prev => ({ ...prev, type: null, referenceId: null }));
  };

  const handleReferenceSelect = (reference) => {
    setSelectedJob(reference);
    setFormData(prev => ({
      ...prev,
      referenceId: reference._id,
      referenceModel: reference.referenceModel || formData.type,
      postTypeDetails: reference.postName || reference.departmentName || reference.title || reference.name || ''
    }));
    setJobSearch('');
    setShowAlsoShowLink(false);
    setShowJobDropdown(false);
    setErrors(prev => ({ ...prev, referenceId: null }));
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admit card details...</p>
        </div>
      </div>
    );
  }

  const backPath = isEditMode
    ? `/${userRole}/admit-cards/${id}`
    : `/${userRole}/admit-cards`;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(backPath)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Admit Cards</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Admit Card' : 'Post Your Admit, Result, Answer Key Details'}
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-gray-300 rounded-sm shadow-sm">
          {/* Post Details Header */}
          <div className="bg-green-700 text-white px-4 py-2">
            <h2 className="text-base font-semibold">Post Details Here</h2>
          </div>

          <div className="p-6">
            {/* First Row - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Link Menu Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Link Menu Filed :
                </label>
                <input
                  type="text"
                  name="linkMenuField"
                  className={`w-full px-3 py-2 border ${
                    errors.linkMenuField ? 'border-red-300' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.linkMenuField}
                  onChange={handleInputChange}
                  placeholder=""
                />
                {errors.linkMenuField && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.linkMenuField}
                  </p>
                )}
              </div>

              {/* Post Type Details Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Post Type Details :
                </label>
                <div className="relative">
                  <select
                    name="type"
                    className={`w-full px-3 py-2 border ${
                      errors.type ? 'border-red-300' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer pr-8`}
                    value={formData.type}
                    onChange={handleTypeSelect}
                    style={{
                      backgroundImage: 'none'
                    }}
                  >
                    {postTypeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={option.value === '' ? 'text-red-600 font-semibold' : ''}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                {errors.type && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Also Show Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Also Show Link :
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.type && formData.type !== 'OtherModel') {
                        setShowAlsoShowLink(!showAlsoShowLink);
                      } else if (!formData.type) {
                        toast.error('Please select a Post Type first');
                      }
                    }}
                    className={`w-full px-3 py-2 border ${
                      errors.referenceId ? 'border-red-300' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-left`}
                  >
                    {selectedJob ? (
                      <span className="text-gray-900">
                        {selectedJob.departmentName && selectedJob.postName
                          ? `${selectedJob.departmentName} - ${selectedJob.postName}`
                          : selectedJob.title || selectedJob.name}
                      </span>
                    ) : (
                      <span className="text-gray-500">Select Post Type</span>
                    )}
                  </button>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                  {/* Dropdown for job selection */}
                  {showAlsoShowLink && formData.type && formData.type !== 'OtherModel' && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-hidden flex flex-col">
                      {/* Search box */}
                      <div className="p-2 border-b border-gray-200 bg-gray-50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Search ${formData.type}...`}
                            value={jobSearch}
                            onChange={(e) => setJobSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Scrollable list */}
                      <div className="overflow-y-auto max-h-64 overscroll-contain">
                        {isSearching ? (
                          <div className="p-4 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600">Searching...</p>
                          </div>
                        ) : references.length > 0 ? (
                          references.map((reference) => (
                            <button
                              key={reference._id}
                              type="button"
                              onClick={() => handleReferenceSelect(reference)}
                              className="w-full p-3 text-left hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-sm truncate">
                                    {reference.departmentName && reference.postName
                                      ? `${reference.departmentName} - ${reference.postName}`
                                      : reference.title || reference.name}
                                  </h4>
                                  {reference.description && (
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                                      {reference.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                    {reference.publishDate && (
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(reference.publishDate).toLocaleDateString()}
                                      </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                      {reference.referenceModel}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              {jobSearch ? `No results found for "${jobSearch}"` : `No ${formData.type}s available`}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Close button */}
                      <div className="p-2 border-t border-gray-200 bg-gray-50">
                        <button
                          type="button"
                          onClick={() => setShowAlsoShowLink(false)}
                          className="w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors duration-150"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {errors.referenceId && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.referenceId}
                  </p>
                )}
              </div>

              {/* Exam Name or Other */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Exam Name or Other :
                </label>
                <input
                  type="text"
                  name="postTypeDetails"
                  className={`w-full px-3 py-2 border ${
                    errors.postTypeDetails ? 'border-red-300' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.postTypeDetails}
                  onChange={handleInputChange}
                  placeholder=""
                />
                {errors.postTypeDetails && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.postTypeDetails}
                  </p>
                )}
              </div>
            </div>

            {/* Direct URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Website URL (Optional)
              </label>
              <input
                type="url"
                name="directWebURL"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={formData.directWebURL}
                onChange={handleInputChange}
                placeholder="https://example.com/admit-card"
              />
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admit Card Status
              </label>
              <select
                name="admitCardStatus"
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={formData.admitCardStatus}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Post Details Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  'Post Details'
                )}
              </button>
            </div>

            {/* Selected Job Display */}
            {selectedJob && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">
                        {selectedJob.departmentName && selectedJob.postName
                          ? `${selectedJob.departmentName} - ${selectedJob.postName}`
                          : selectedJob.title || selectedJob.name}
                      </h4>
                      <p className="text-sm text-green-600">
                        ID: {selectedJob._id.slice(-8)}
                        {selectedJob.publishDate && ` • Published: ${new Date(selectedJob.publishDate).toLocaleDateString()}`}
                        {selectedJob.referenceModel && ` • ${selectedJob.referenceModel}`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJob(null);
                      setFormData(prev => ({
                        ...prev,
                        referenceId: '',
                        referenceModel: '',
                        postTypeDetails: ''
                      }));
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdmitCardForm;
