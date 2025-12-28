// components/ResultManagement/ResultForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createResult,
  updateResult,
  fetchResultById,
  fetchAvailableReferences,
  clearReferences
} from '../../slice/resultSlice';
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
  ChevronDown,
  Award,
  FileText,
  List,
  ClipboardCheck,
  Plus
} from 'lucide-react';

const ResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  // Extract user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[1];

  const { currentResult, loading, references } = useSelector(state => state?.results);
  const user = useSelector(store => store?.user);

  const [formData, setFormData] = useState({
    type: '',
    referenceId: '',
    referenceModel: '',
    directWebURL: '',
    linkMenuField: '',
    postTypeDetails: '',
    description: '',
    resultType: 'Final',
    examName: '',
    publishDate: new Date().toISOString().split('T')[0],
    resultDate: '',
    status: user.role === 'admin' ? 'pending' : 'pending',
    resultStatus: 'active',
    category: '',
    tags: [],
    dynamicContent: [],
    contentSections: [],
    importantInstructions: [],
    documentsRequired: []
  });

  const [selectedReference, setSelectedReference] = useState(null);
  const [referenceSearch, setReferenceSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [showReferenceDropdown, setShowReferenceDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlsoShowLink, setShowAlsoShowLink] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

  const typeOptions = [
    { value: '', label: 'Select Type', disabled: true },
    { value: 'Job', label: 'Job', color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'Admission', label: 'Admission', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'LatestNotice', label: 'Latest Notice', color: 'text-pink-600', bg: 'bg-pink-50' },
    { value: 'Other', label: 'Other', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const resultTypeOptions = [
    { value: 'Final', label: 'Final', icon: Award },
    { value: 'Provisional', label: 'Provisional', icon: FileText },
    { value: 'MeritList', label: 'Merit List', icon: List },
    { value: 'CutOff', label: 'Cut Off', icon: ClipboardCheck },
    { value: 'AnswerKey', label: 'Answer Key', icon: CheckCircle },
    { value: 'ScoreCard', label: 'Score Card', icon: FileText },
    { value: 'Other', label: 'Other', icon: FileText }
  ];

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchResultById(id));
    }

    return () => {
      dispatch(clearReferences());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentResult && isEditMode) {
      const formattedData = {
        type: currentResult.type || '',
        referenceId: currentResult.referenceId?._id || '',
        referenceModel: currentResult.referenceModel || '',
        directWebURL: currentResult.directWebURL || '',
        linkMenuField: currentResult.linkMenuField || '',
        postTypeDetails: currentResult.postTypeDetails || '',
        description: currentResult.description || '',
        resultType: currentResult.resultType || 'Final',
        examName: currentResult.examName || '',
        publishDate: currentResult.publishDate ? new Date(currentResult.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        resultDate: currentResult.resultDate ? new Date(currentResult.resultDate).toISOString().split('T')[0] : '',
        status: currentResult.status || 'pending',
        resultStatus: currentResult.resultStatus || 'active',
        category: currentResult.category || '',
        tags: currentResult.tags || [],
        dynamicContent: currentResult.dynamicContent || [],
        contentSections: currentResult.contentSections || [],
        importantInstructions: currentResult.importantInstructions || [],
        documentsRequired: currentResult.documentsRequired || []
      };

      setFormData(formattedData);

      if (currentResult.referenceId) {
        setSelectedReference(currentResult.referenceId);
      }
    }
  }, [currentResult, isEditMode]);

  useEffect(() => {
    if (formData.type && formData.type !== 'Other' && showAlsoShowLink) {
      setIsSearching(true);
      dispatch(fetchAvailableReferences({ type: formData.type, search: referenceSearch || '' }))
        .finally(() => setIsSearching(false));
    }
  }, [formData.type, showAlsoShowLink, dispatch]);

  useEffect(() => {
    if (formData.type && formData.type !== 'Other' && referenceSearch.trim() && showAlsoShowLink) {
      setIsSearching(true);
      const debounceTimer = setTimeout(() => {
        dispatch(fetchAvailableReferences({ type: formData.type, search: referenceSearch }))
          .finally(() => setIsSearching(false));
      }, 500);

      return () => {
        clearTimeout(debounceTimer);
        setIsSearching(false);
      };
    }
  }, [referenceSearch, formData.type, dispatch, showAlsoShowLink]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.linkMenuField || !formData.linkMenuField.trim()) {
      newErrors.linkMenuField = 'Link menu field is required';
    }

    if (!formData.examName || !formData.examName.trim()) {
      newErrors.examName = 'Exam name is required';
    }

    if (!formData.resultType) {
      newErrors.resultType = 'Result type is required';
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

    // Build submit data
    const submitData = {
      type: formData.type,
      linkMenuField: formData.linkMenuField.trim(),
      postTypeDetails: formData.postTypeDetails.trim(),
      description: formData.description.trim(),
      resultType: formData.resultType,
      examName: formData.examName.trim(),
      publishDate: formData.publishDate,
      resultDate: formData.resultDate || null,
      resultStatus: formData.resultStatus,
      status: formData.status,
      category: formData.category.trim(),
      tags: formData.tags,
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

    // Add reference if not 'Other' type
    if (formData.type !== 'Other' && formData.referenceId) {
      submitData.referenceId = formData.referenceId;
      submitData.referenceModel = formData.referenceModel;
    }

    // Add directWebURL if provided
    if (formData.directWebURL && formData.directWebURL.trim()) {
      submitData.directWebURL = formData.directWebURL.trim();
    }

    // Add arrays if they have content
    if (formData.dynamicContent.length > 0) {
      submitData.dynamicContent = formData.dynamicContent;
    }
    if (formData.contentSections.length > 0) {
      submitData.contentSections = formData.contentSections;
    }
    if (formData.importantInstructions.length > 0) {
      submitData.importantInstructions = formData.importantInstructions;
    }
    if (formData.documentsRequired.length > 0) {
      submitData.documentsRequired = formData.documentsRequired;
    }

    console.log('Submitting result data:', submitData);

    try {
      if (isEditMode) {
        await dispatch(updateResult({ id, data: submitData }));
      } else {
        await dispatch(createResult(submitData));
      }
      navigate(`/${userRole}/results`);
    } catch (error) {
      console.error('Error submitting result:', error);
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
    setSelectedReference(null);
    setReferenceSearch('');
    setShowAlsoShowLink(false);
    setErrors(prev => ({ ...prev, type: null, referenceId: null }));
  };

  const handleReferenceSelect = (reference) => {
    setSelectedReference(reference);
    setFormData(prev => ({
      ...prev,
      referenceId: reference._id,
      referenceModel: reference.referenceModel || formData.type,
      postTypeDetails: reference.postName || reference.departmentName || reference.title || reference.name || '',
      examName: reference.postName || reference.departmentName || reference.title || reference.name || ''
    }));
    setReferenceSearch('');
    setShowAlsoShowLink(false);
    setShowReferenceDropdown(false);
    setErrors(prev => ({ ...prev, referenceId: null }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addInstruction = () => {
    const instruction = prompt('Enter important instruction:');
    if (instruction && instruction.trim()) {
      setFormData(prev => ({
        ...prev,
        importantInstructions: [...prev.importantInstructions, instruction.trim()]
      }));
    }
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      importantInstructions: prev.importantInstructions.filter((_, i) => i !== index)
    }));
  };

  const addDocument = () => {
    const doc = prompt('Enter document required:');
    if (doc && doc.trim()) {
      setFormData(prev => ({
        ...prev,
        documentsRequired: [...prev.documentsRequired, doc.trim()]
      }));
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documentsRequired: prev.documentsRequired.filter((_, i) => i !== index)
    }));
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading result details...</p>
        </div>
      </div>
    );
  }

  const backPath = isEditMode
    ? `/${userRole}/results/${id}`
    : `/${userRole}/results`;

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
              <span>Back to Results</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Result' : 'Post Your Result Details'}
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-gray-300 rounded-sm shadow-sm">
          {/* Post Details Header */}
          <div className="bg-purple-700 text-white px-4 py-2">
            <h2 className="text-base font-semibold">Result Details</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* First Row - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Link Menu Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Link Menu Field :
                </label>
                <input
                  type="text"
                  name="linkMenuField"
                  className={`w-full px-3 py-2 border ${
                    errors.linkMenuField ? 'border-red-300' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500`}
                  value={formData.linkMenuField}
                  onChange={handleInputChange}
                  placeholder="Enter link menu field"
                />
                {errors.linkMenuField && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.linkMenuField}
                  </p>
                )}
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Type :
                </label>
                <div className="relative">
                  <select
                    name="type"
                    className={`w-full px-3 py-2 border ${
                      errors.type ? 'border-red-300' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none cursor-pointer pr-8`}
                    value={formData.type}
                    onChange={handleTypeSelect}
                  >
                    {typeOptions.map((option) => (
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

              {/* Also Show Link - Only shows when type is Job, Admission, or LatestNotice */}
              {formData.type && formData.type !== 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-600">*</span>Also Show Link :
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.type && formData.type !== 'Other') {
                          setShowAlsoShowLink(!showAlsoShowLink);
                          if (!showAlsoShowLink) {
                            dispatch(fetchAvailableReferences({ type: formData.type }));
                          }
                        }
                      }}
                      className={`w-full px-3 py-2 border ${
                        errors.referenceId ? 'border-red-300' : 'border-gray-300'
                      } rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white text-left`}
                    >
                      {selectedReference ? (
                        <span className="text-gray-900">
                          {selectedReference.departmentName && selectedReference.postName
                            ? `${selectedReference.departmentName} - ${selectedReference.postName}`
                            : selectedReference.title || selectedReference.name}
                        </span>
                      ) : (
                        <span className="text-gray-500">Select Reference</span>
                      )}
                    </button>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                    {/* Dropdown for reference selection */}
                    {showAlsoShowLink && formData.type && formData.type !== 'Other' && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-hidden flex flex-col">
                        {/* Search box */}
                        <div className="p-2 border-b border-gray-200 bg-gray-50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                              placeholder={`Search ${formData.type}...`}
                              value={referenceSearch}
                              onChange={(e) => setReferenceSearch(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        {/* Scrollable list */}
                        <div className="overflow-y-auto max-h-64 overscroll-contain">
                          {isSearching ? (
                            <div className="p-4 text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                              <p className="text-sm text-gray-600">Searching...</p>
                            </div>
                          ) : references.length > 0 ? (
                            references.map((reference) => (
                              <button
                                key={reference._id}
                                type="button"
                                onClick={() => handleReferenceSelect(reference)}
                                className="w-full p-3 text-left hover:bg-purple-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
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
                                {referenceSearch ? `No results found for "${referenceSearch}"` : `No ${formData.type}s available`}
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
              )}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Post Type Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Type Details :
                </label>
                <input
                  type="text"
                  name="postTypeDetails"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.postTypeDetails}
                  onChange={handleInputChange}
                  placeholder="Enter post type details"
                />
              </div>

              {/* Result Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Result Type :
                </label>
                <select
                  name="resultType"
                  className={`w-full px-3 py-2 border ${
                    errors.resultType ? 'border-red-300' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white`}
                  value={formData.resultType}
                  onChange={handleInputChange}
                >
                  {resultTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.resultType && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.resultType}
                  </p>
                )}
              </div>

              {/* Exam Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-600">*</span>Exam Name :
                </label>
                <input
                  type="text"
                  name="examName"
                  className={`w-full px-3 py-2 border ${
                    errors.examName ? 'border-red-300' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500`}
                  value={formData.examName}
                  onChange={handleInputChange}
                  placeholder="Enter exam name"
                />
                {errors.examName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.examName}
                  </p>
                )}
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publish Date */}
              <div>
                <input
                  type="date"
                  name="publishDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Result Date */}
              <div>
                <input
                  type="date"
                  name="resultDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.resultDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description :
              </label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter result description"
              />
            </div>

            {/* Direct URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Website URL (Optional) :
              </label>
              <input
                type="url"
                name="directWebURL"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={formData.directWebURL}
                onChange={handleInputChange}
                placeholder="https://example.com/result"
              />
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category :
                </label>
                <input
                  type="text"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter category"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-purple-900 hover:text-purple-950"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Important Instructions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Important Instructions :
                </label>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Instruction
                </button>
              </div>
              {formData.importantInstructions.length > 0 ? (
                <div className="space-y-2">
                  {formData.importantInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span className="text-gray-700">{instruction}</span>
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No instructions added yet.</p>
              )}
            </div>

            {/* Documents Required */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Documents Required :
                </label>
                <button
                  type="button"
                  onClick={addDocument}
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Document
                </button>
              </div>
              {formData.documentsRequired.length > 0 ? (
                <div className="space-y-2">
                  {formData.documentsRequired.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span className="text-gray-700">{doc}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No documents added yet.</p>
              )}
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result Status :
                </label>
                <select
                  name="resultStatus"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  value={formData.resultStatus}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {user.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status :
                  </label>
                  <select
                    name="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="onHold">On Hold</option>
                  </select>
                </div>
              )}
            </div>

            {/* Selected Reference Display */}
            {selectedReference && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">
                        {selectedReference.departmentName && selectedReference.postName
                          ? `${selectedReference.departmentName} - ${selectedReference.postName}`
                          : selectedReference.title || selectedReference.name}
                      </h4>
                      <p className="text-sm text-green-600">
                        ID: {selectedReference._id?.slice(-8)}
                        {selectedReference.publishDate && ` • Published: ${new Date(selectedReference.publishDate).toLocaleDateString()}`}
                        {selectedReference.referenceModel && ` • ${selectedReference.referenceModel}`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReference(null);
                      setFormData(prev => ({
                        ...prev,
                        referenceId: '',
                        referenceModel: '',
                        postTypeDetails: '',
                        examName: ''
                      }));
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isEditMode ? 'Update Result' : 'Create Result'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultForm;