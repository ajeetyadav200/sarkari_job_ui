// components/AnswerManagement/AnswerForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createAnswer,
  updateAnswer,
  fetchAnswerById,
  fetchAvailableReferences,
  clearReferences
} from '../../slice/answerSlice';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  File,
  Plus
} from 'lucide-react';

const AnswerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  // Extract user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[1];

  const { currentAnswer, loading, references } = useSelector(state => state?.answers);
  const user = useSelector(store => store?.user);

  const [formData, setFormData] = useState({
    type: '',
    referenceId: '',
    referenceModel: '',
    directWebURL: '',
    linkMenuField: '',
    postTypeDetails: '',
    description: '',
    examName: '',
    publishDate: new Date().toISOString().split('T')[0],
    lastDate: '',
    status: user?.role === 'admin' ? 'pending' : 'pending',
    answerStatus: 'active',
    category: '',
    tags: [],
    dynamicContent: [],
    contentSections: [],
    importantInstructions: [],
    documentsRequired: []
  });

  // File state
  const [files, setFiles] = useState({
    officialNotification: null,
    examDateNotice: null,
    syllabusFile: null,
    admitCardFile: null,
    answerKeyFile: null,
    resultFile: null,
    otherFile: null
  });

  const [fileNames, setFileNames] = useState({
    officialNotification: '',
    examDateNotice: '',
    syllabusFile: '',
    admitCardFile: '',
    answerKeyFile: '',
    resultFile: '',
    otherFile: ''
  });

  const [selectedReference, setSelectedReference] = useState(null);
  const [referenceSearch, setReferenceSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [showReferenceDropdown, setShowReferenceDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlsoShowLink, setShowAlsoShowLink] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [showOtherFileName, setShowOtherFileName] = useState(false);

  const typeOptions = [
    { value: '', label: 'Select Type', disabled: true },
    { value: 'Job', label: 'Job', color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'Admission', label: 'Admission', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'LatestNotice', label: 'Latest Notice', color: 'text-pink-600', bg: 'bg-pink-50' },
    { value: 'Other', label: 'Other', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const fileTypeLabels = {
    officialNotification: 'Official Notification',
    examDateNotice: 'Exam Date Notice',
    syllabusFile: 'Syllabus File',
    admitCardFile: 'Admit Card File',
    answerKeyFile: 'Answer Key File',
    resultFile: 'Result File',
    otherFile: 'Other File'
  };

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAnswerById(id));
    }

    return () => {
      dispatch(clearReferences());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentAnswer && isEditMode) {
      const formattedData = {
        type: currentAnswer.type || '',
        referenceId: currentAnswer.referenceId?._id || '',
        referenceModel: currentAnswer.referenceModel || '',
        directWebURL: currentAnswer.directWebURL || '',
        linkMenuField: currentAnswer.linkMenuField || '',
        postTypeDetails: currentAnswer.postTypeDetails || '',
        description: currentAnswer.description || '',
        examName: currentAnswer.examName || '',
        publishDate: currentAnswer.publishDate ? new Date(currentAnswer.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        lastDate: currentAnswer.lastDate ? new Date(currentAnswer.lastDate).toISOString().split('T')[0] : '',
        status: currentAnswer.status || 'pending',
        answerStatus: currentAnswer.answerStatus || 'active',
        category: currentAnswer.category || '',
        tags: currentAnswer.tags || [],
        dynamicContent: currentAnswer.dynamicContent || [],
        contentSections: currentAnswer.contentSections || [],
        importantInstructions: currentAnswer.importantInstructions || [],
        documentsRequired: currentAnswer.documentsRequired || []
      };

      setFormData(formattedData);

      if (currentAnswer.referenceId) {
        setSelectedReference(currentAnswer.referenceId);
      }

      // Set existing file names
      const existingFileNames = {};
      Object.keys(fileTypeLabels).forEach(key => {
        if (currentAnswer[key] && currentAnswer[key].fileName) {
          existingFileNames[key] = currentAnswer[key].fileName;
        }
      });
      setFileNames(existingFileNames);
    }
  }, [currentAnswer, isEditMode]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Create FormData for file uploads
    const submitData = new FormData();

    // Add all text fields
    submitData.append('type', formData.type);
    submitData.append('linkMenuField', formData.linkMenuField.trim());
    submitData.append('postTypeDetails', formData.postTypeDetails.trim());
    submitData.append('description', formData.description.trim());
    submitData.append('examName', formData.examName.trim());
    submitData.append('publishDate', formData.publishDate);
    submitData.append('answerStatus', formData.answerStatus);
    submitData.append('status', formData.status);
    submitData.append('category', formData.category.trim());

    // Add optional fields
    if (formData.type !== 'Other' && formData.referenceId) {
      submitData.append('referenceId', formData.referenceId);
      submitData.append('referenceModel', formData.referenceModel);
    }

    if (formData.directWebURL && formData.directWebURL.trim()) {
      submitData.append('directWebURL', formData.directWebURL.trim());
    }

    if (formData.lastDate) {
      submitData.append('lastDate', formData.lastDate);
    }

    // Add arrays as JSON strings
    if (formData.tags.length > 0) {
      submitData.append('tags', JSON.stringify(formData.tags));
    }
    if (formData.dynamicContent.length > 0) {
      submitData.append('dynamicContent', JSON.stringify(formData.dynamicContent));
    }
    if (formData.contentSections.length > 0) {
      submitData.append('contentSections', JSON.stringify(formData.contentSections));
    }
    if (formData.importantInstructions.length > 0) {
      submitData.append('importantInstructions', JSON.stringify(formData.importantInstructions));
    }
    if (formData.documentsRequired.length > 0) {
      submitData.append('documentsRequired', JSON.stringify(formData.documentsRequired));
    }

    // Add files
    Object.keys(files).forEach(fieldName => {
      if (files[fieldName]) {
        submitData.append(fieldName, files[fieldName]);
        // Add custom file name if provided
        if (fileNames[fieldName]) {
          submitData.append(`${fieldName}_name`, fileNames[fieldName]);
        }
      }
    });

    try {
      if (isEditMode) {
        await dispatch(updateAnswer({ id, formData: submitData })).unwrap();
        toast.success('Answer updated successfully!');
      } else {
        await dispatch(createAnswer(submitData)).unwrap();
        toast.success('Answer created successfully!');
      }
      navigate(`/${userRole}/answers`);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error(error?.message || 'Failed to submit answer');
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));

      // Auto-set file name from uploaded file
      if (!fileNames[fieldName]) {
        setFileNames(prev => ({
          ...prev,
          [fieldName]: file.name
        }));
      }

      // Show custom name input for "Other File"
      if (fieldName === 'otherFile') {
        setShowOtherFileName(true);
      }
    }
  };

  const handleFileNameChange = (e, fieldName) => {
    setFileNames(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }));
  };

  const removeFile = (fieldName) => {
    setFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));
    setFileNames(prev => ({
      ...prev,
      [fieldName]: ''
    }));

    if (fieldName === 'otherFile') {
      setShowOtherFileName(false);
    }
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

  const getFilteredReferences = () => {
    if (!references || references.length === 0) return [];

    // Handle the case where API returns { jobs: [], admissions: [], notices: [] }
    if (Array.isArray(references)) {
      return references;
    } else if (references.jobs || references.admissions || references.notices) {
      const allRefs = [
        ...(references.jobs || []),
        ...(references.admissions || []),
        ...(references.notices || [])
      ];
      return allRefs;
    }

    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/${userRole}/answers`)}
              className="p-2 rounded-lg hover:bg-white/60 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Answer' : 'Create New Answer'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode ? 'Update answer key details' : 'Add a new answer key to the system'}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Type Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeSelect}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.type ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.type}
              </p>
            )}
          </div>

          {/* Reference Selection (if not Other) */}
          {formData.type && formData.type !== 'Other' && (
            <div className="space-y-4 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Link to {formData.type}
                </label>
                <button
                  type="button"
                  onClick={() => setShowAlsoShowLink(!showAlsoShowLink)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAlsoShowLink ? 'Hide' : 'Select from existing'}
                </button>
              </div>

              {showAlsoShowLink && (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={referenceSearch}
                      onChange={(e) => setReferenceSearch(e.target.value)}
                      onFocus={() => setShowReferenceDropdown(true)}
                      placeholder={`Search ${formData.type}...`}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Reference Dropdown */}
                  {showReferenceDropdown && getFilteredReferences().length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-100 max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                      ) : (
                        getFilteredReferences().map((ref) => (
                          <button
                            key={ref._id}
                            type="button"
                            onClick={() => handleReferenceSelect(ref)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {ref.postName || ref.departmentName || ref.title || ref.name}
                            </div>
                            {ref.publishDate && (
                              <div className="text-sm text-gray-500">
                                {new Date(ref.publishDate).toLocaleDateString()}
                              </div>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Selected Reference Display */}
              {selectedReference && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900">Selected {formData.type}</span>
                      </div>
                      <p className="text-gray-700">
                        {selectedReference.postName || selectedReference.departmentName || selectedReference.title || selectedReference.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReference(null);
                        setFormData(prev => ({
                          ...prev,
                          referenceId: '',
                          referenceModel: ''
                        }));
                      }}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Link Menu Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Link Menu Field <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="linkMenuField"
              value={formData.linkMenuField}
              onChange={handleInputChange}
              placeholder="e.g., SSC CGL Answer Key 2024"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.linkMenuField ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.linkMenuField && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.linkMenuField}
              </p>
            )}
          </div>

          {/* Post Type Details */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Post Type Details
            </label>
            <input
              type="text"
              name="postTypeDetails"
              value={formData.postTypeDetails}
              onChange={handleInputChange}
              placeholder="e.g., Combined Graduate Level Examination"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Exam Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleInputChange}
              placeholder="e.g., SSC CGL Tier 1 2024"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.examName ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.examName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.examName}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter answer key details..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Publish Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Last Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              File Uploads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(fileTypeLabels).map((fieldName) => (
                <div key={fieldName} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {fileTypeLabels[fieldName]}
                  </label>

                  {files[fieldName] ? (
                    <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <File className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {files[fieldName].name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(fieldName)}
                          className="ml-2 p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      {/* Custom name input for otherFile */}
                      {fieldName === 'otherFile' && showOtherFileName && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={fileNames.otherFile}
                            onChange={(e) => handleFileNameChange(e, 'otherFile')}
                            placeholder="Enter custom file name"
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        id={`file-${fieldName}`}
                        onChange={(e) => handleFileChange(e, fieldName)}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-${fieldName}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">Choose file</span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag and press Enter"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Government Exam"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Direct Web URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Direct Web URL (Optional)
            </label>
            <input
              type="url"
              name="directWebURL"
              value={formData.directWebURL}
              onChange={handleInputChange}
              placeholder="https://example.com/answer-key"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(`/${userRole}/answers`)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditMode ? 'Update Answer' : 'Create Answer'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerForm;
