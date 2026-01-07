import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Save, Calendar, Briefcase, User, FileText, DollarSign, Award, List, Plus, Trash2, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAdmission, updateAdmission } from '../../slice/admissionSlice';

const AdmissionForm = ({ onClose, onSuccess, editData, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.admissions);
  
  const [formData, setFormData] = useState({
    // Basic Information
    departmentName: editData?.departmentName || '',
    postName: editData?.postName || '',
    title: editData?.title || '',

    // Category & Type
    category: editData?.category || 'entrance-exam',
    programType: editData?.programType || 'entrance-exam',
    modeOfApplication: editData?.modeOfApplication || 'online',
    showInPortal: editData?.showInPortal !== false,

    // Contact Information
    helpEmailId: editData?.helpEmailId || '',
    helpCareNo: editData?.helpCareNo || '',
    officialWebsite: editData?.officialWebsite || '',

    // Seats/Vacancies
    totalSeats: editData?.totalSeats || null,
    categorySeats: editData?.categorySeats || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },

    // Application Fee
    applicationFee: editData?.applicationFee || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },

    // Eligibility
    eligibilityEducational: editData?.eligibilityEducational || '',

    // Important Dates
    importantDates: editData?.importantDates || {
      applicationStartDate: '',
      applicationEndDate: '',
      lastDateForFeePayment: '',
      correctionStartDate: '',
      correctionEndDate: '',
      admitCardReleaseDate: '',
      examStartDate: '',
      examEndDate: '',
      answerKeyDate: '',
      resultDate: ''
    },

    // Age Limit
    ageLimit: editData?.ageLimit || {
      minimumAge: null,
      maximumAge: null,
      ageCalculationDate: '',
      relaxation: ''
    },

    // Selection Process
    selectionMode: editData?.selectionMode || [],

    // Content
    description: editData?.description || '',
    documentsRequired: editData?.documentsRequired || [],
    importantInstructions: editData?.importantInstructions || [],
    dynamicContent: editData?.dynamicContent || [],

    // SEO & Metadata
    isLatest: editData?.isLatest !== false,
    isFeatured: editData?.isFeatured || false,
    state: editData?.state || 'all-india',
    tags: editData?.tags || [],

    // Other fields (for "other" option)
    categoryOther: editData?.categoryOther || '',
    programTypeOther: editData?.programTypeOther || ''
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for adding new items to arrays
  const [newSelectionMode, setNewSelectionMode] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newInstruction, setNewInstruction] = useState('');

  // Handle cancel/close
  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      if (user?.role === 'admin') {
        navigate('/admin/admissions');
      } else if (user?.role === 'publisher') {
        navigate('/publisher/admissions');
      } else if (user?.role === 'assistant') {
        navigate('/assistant/admissions');
      } else {
        navigate('/admin/admissions');
      }
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const handleDirectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCategorySeatsChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      categorySeats: {
        ...prev.categorySeats,
        [category]: numValue
      }
    }));
  };

  const handleApplicationFeeChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      applicationFee: {
        ...prev.applicationFee,
        [category]: numValue
      }
    }));
  };

  // Handle adding items to arrays
  const handleAddArrayItem = (field, value = '') => {
    if (!value.trim() && field !== 'dynamicContent') return;
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value || '']
    }));
  };

  // Handle removing items from arrays
  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle updating array item
  const handleUpdateArrayItem = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.departmentName.trim()) {
      newErrors.departmentName = 'Department name is required';
    }
    if (!formData.postName.trim()) {
      newErrors.postName = 'Post name is required';
    }
    if (!formData.helpEmailId.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.helpEmailId)) {
      newErrors.helpEmailId = 'Valid email is required';
    }
    if (!formData.helpCareNo.trim() || !/^[+]?[0-9]{10,15}$/.test(formData.helpCareNo.replace(/[\s-]/g, ''))) {
      newErrors.helpCareNo = 'Valid phone number is required';
    }
    if (!formData.officialWebsite.trim() || !/^https?:\/\/.+\..+/.test(formData.officialWebsite)) {
      newErrors.officialWebsite = 'Valid URL is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.eligibilityEducational.trim()) {
      newErrors.eligibilityEducational = 'Educational eligibility is required';
    }

    // Date validation
    if (formData.importantDates.applicationStartDate && formData.importantDates.applicationEndDate) {
      const startDate = new Date(formData.importantDates.applicationStartDate);
      const endDate = new Date(formData.importantDates.applicationEndDate);
      if (startDate > endDate) {
        newErrors['importantDates.applicationEndDate'] = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting.', {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (editData) {
        await dispatch(updateAdmission({ 
          id: editData._id, 
          data: formData 
        })).unwrap();
        
        toast.success('Admission updated successfully!', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          setIsSubmitting(false);
          if (onSuccess) {
            onSuccess('Admission updated successfully');
          } else {
            handleCancel();
          }
        }, 1000);
      } else {
        await dispatch(createAdmission(formData)).unwrap();

        toast.success('Admission created successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
        
        setTimeout(() => {
          setIsSubmitting(false);
          if (onSuccess) {
            onSuccess('Admission created successfully');
          } else {
            handleCancel();
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving admission:', error);
      setIsSubmitting(false);
      toast.error(error.message || 'Failed to save admission. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  // Function to trigger form submission from header button
  const handleHeaderSaveClick = () => {
    // Programmatically submit the form
    const form = document.getElementById('jobForm');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'basic':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Admission Department Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={formData.departmentName}
                  onChange={(e) => handleDirectChange('departmentName', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.departmentName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter department name"
                />
                {errors.departmentName && <p className="mt-1 text-sm text-red-600">{errors.departmentName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Name *
                </label>
                <input
                  type="text"
                  value={formData.postName}
                  onChange={(e) => handleDirectChange('postName', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.postName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter post name"
                />
                {errors.postName && <p className="mt-1 text-sm text-red-600">{errors.postName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleDirectChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter admission title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Help Email ID
                </label>
                <input
                  type="email"
                  value={formData.helpEmailId}
                  onChange={(e) => handleDirectChange('helpEmailId', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.helpEmailId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="help@example.com"
                />
                {errors.helpEmailId && <p className="mt-1 text-sm text-red-600">{errors.helpEmailId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Help Care Number
                </label>
                <input
                  type="tel"
                  value={formData.helpCareNo}
                  onChange={(e) => handleDirectChange('helpCareNo', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.helpCareNo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="+91 9876543210"
                />
                {errors.helpCareNo && <p className="mt-1 text-sm text-red-600">{errors.helpCareNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Official Website
                </label>
                <input
                  type="url"
                  value={formData.officialWebsite}
                  onChange={(e) => handleDirectChange('officialWebsite', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.officialWebsite ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="https://example.com"
                />
                {errors.officialWebsite && <p className="mt-1 text-sm text-red-600">{errors.officialWebsite}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalSeats || ''}
                  onChange={(e) => handleDirectChange('totalSeats', parseInt(e.target.value) || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total seats"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode of Application *
                </label>
                <select
                  value={formData.modeOfApplication}
                  onChange={(e) => handleDirectChange('modeOfApplication', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleDirectChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="university">University</option>
                  <option value="entrance-exam">Entrance Exam</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Degree</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="scholarship">Scholarship</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
                {formData.category === 'other' && (
                  <input
                    type="text"
                    value={formData.categoryOther || ''}
                    onChange={(e) => handleDirectChange('categoryOther', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify category"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program Type *
                </label>
                <select
                  value={formData.programType}
                  onChange={(e) => handleDirectChange('programType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                  <option value="phd">PhD</option>
                  <option value="entrance-exam">Entrance Exam</option>
                  <option value="teacher-training">Teacher Training</option>
                  <option value="vocational">Vocational</option>
                  <option value="other">Other</option>
                </select>
                {formData.programType === 'other' && (
                  <input
                    type="text"
                    value={formData.programTypeOther || ''}
                    onChange={(e) => handleDirectChange('programTypeOther', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify program type"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Region
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleDirectChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bihar, all-india"
                />
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showInPortal"
                    checked={formData.showInPortal}
                    onChange={(e) => handleDirectChange('showInPortal', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showInPortal" className="ml-2 text-sm text-gray-700">
                    Show this admission in public portal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isLatest"
                    checked={formData.isLatest}
                    onChange={(e) => handleDirectChange('isLatest', e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="isLatest" className="ml-2 text-sm text-gray-700">
                    Mark as Latest Admission
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => handleDirectChange('isFeatured', e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                    Mark as Featured
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'posts':
        return (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Category-wise Seats Distribution
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { id: 'general', label: 'General' },
                { id: 'obc', label: 'OBC' },
                { id: 'sc', label: 'SC' },
                { id: 'st', label: 'ST' },
                { id: 'ews', label: 'EWS' },
                { id: 'ph', label: 'PH/PWD' }
              ].map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {category.label} Seats
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.categorySeats[category.id] || 0}
                    onChange={(e) => handleCategorySeatsChange(category.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Total Category Seats: <span className="font-bold text-blue-600">
                  {Object.values(formData.categorySeats).reduce((a, b) => a + b, 0)}
                </span> {formData.totalSeats ? `/ ${formData.totalSeats}` : ''}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 mt-8">
              <DollarSign className="w-5 h-5" />
              Category-wise Application Fees (₹)
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { id: 'general', label: 'General' },
                { id: 'obc', label: 'OBC' },
                { id: 'sc', label: 'SC' },
                { id: 'st', label: 'ST' },
                { id: 'ews', label: 'EWS' },
                { id: 'ph', label: 'PH/PWD' }
              ].map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {category.label} Fee
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.applicationFee[category.id] || 0}
                    onChange={(e) => handleApplicationFeeChange(category.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Eligibility Criteria
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Educational Qualification *
              </label>
              <textarea
                value={formData.eligibilityEducational}
                onChange={(e) => handleDirectChange('eligibilityEducational', e.target.value)}
                rows="6"
                className={`w-full px-3 py-2 border ${errors.eligibilityEducational ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Bachelor's degree in relevant field with minimum 60% marks&#10;Master's degree preferred&#10;Computer literacy certificate required"
              />
              {errors.eligibilityEducational && <p className="mt-1 text-sm text-red-600">{errors.eligibilityEducational}</p>}
              <p className="mt-1 text-xs text-gray-500">Enter all eligibility criteria. Use multiple lines for different requirements.</p>
            </div>
          </div>
        );

      case 'dates':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Important Dates
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'applicationStartDate', label: 'Application Start Date *', required: true },
                { id: 'applicationEndDate', label: 'Application End Date *', required: true },
                { id: 'lastDateForFeePayment', label: 'Last Date for Fee Payment' },
                { id: 'correctionStartDate', label: 'Correction Start Date' },
                { id: 'correctionEndDate', label: 'Correction End Date' },
                { id: 'admitCardReleaseDate', label: 'Admit Card Release Date' },
                { id: 'examStartDate', label: 'Exam Start Date' },
                { id: 'examEndDate', label: 'Exam End Date' },
                { id: 'answerKeyDate', label: 'Answer Key Date' },
                { id: 'resultDate', label: 'Result Date' }
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="date"
                    value={formData.importantDates[field.id] ? formData.importantDates[field.id].split('T')[0] : ''}
                    onChange={(e) => handleChange('importantDates', field.id, e.target.value ? e.target.value + 'T00:00:00.000Z' : '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8 flex items-center gap-2">
              <User className="w-5 h-5" />
              Age Limit
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.ageLimit.minimumAge || ''}
                  onChange={(e) => handleChange('ageLimit', 'minimumAge', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.ageLimit.maximumAge || ''}
                  onChange={(e) => handleChange('ageLimit', 'maximumAge', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="35"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Calculation Date
                </label>
                <input
                  type="date"
                  value={formData.ageLimit.ageCalculationDate ? formData.ageLimit.ageCalculationDate.split('T')[0] : ''}
                  onChange={(e) => handleChange('ageLimit', 'ageCalculationDate', e.target.value ? e.target.value + 'T00:00:00.000Z' : '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Relaxation Details
              </label>
              <textarea
                value={formData.ageLimit.relaxation || ''}
                onChange={(e) => handleChange('ageLimit', 'relaxation', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5 years for SC/ST, 3 years for OBC"
              />
            </div>
          </div>
        );

      case 'additional':
        return (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <List className="w-5 h-5" />
              Additional Details
            </h3>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleDirectChange('description', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admission description or overview..."
              />
            </div>

            {/* Selection Mode */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Selection Mode/Process (e.g., Written Exam, Interview, Merit-based, etc.)
              </label>

              <div className="space-y-2 mb-3">
                {formData.selectionMode.map((mode, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 text-sm">{index + 1}. {mode}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('selectionMode', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSelectionMode}
                  onChange={(e) => setNewSelectionMode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newSelectionMode.trim()) {
                        handleAddArrayItem('selectionMode', newSelectionMode);
                        setNewSelectionMode('');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Written Examination, Interview"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSelectionMode.trim()) {
                      handleAddArrayItem('selectionMode', newSelectionMode);
                      setNewSelectionMode('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Documents Required
              </label>

              <div className="space-y-2 mb-3">
                {formData.documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 text-sm">{doc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('documentsRequired', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newDocument.trim()) {
                        handleAddArrayItem('documentsRequired', newDocument);
                        setNewDocument('');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10th Certificate & Mark Sheet"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newDocument.trim()) {
                      handleAddArrayItem('documentsRequired', newDocument);
                      setNewDocument('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Important Instructions for Candidates
              </label>

              <div className="space-y-2 mb-3">
                {formData.importantInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                    <span className="flex-1 text-sm">{instruction}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('importantInstructions', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newInstruction.trim()) {
                        handleAddArrayItem('importantInstructions', newInstruction);
                        setNewInstruction('');
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Candidates must bring original documents"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newInstruction.trim()) {
                      handleAddArrayItem('importantInstructions', newInstruction);
                      setNewInstruction('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These details will help candidates understand the complete admission requirements and process.
                Selection Process and Documents Required are especially important for transparency.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'posts', label: 'Posts & Fees', icon: User },
    { id: 'eligibility', label: 'Eligibility', icon: Award },
    { id: 'dates', label: 'Important Dates', icon: Calendar },
    { id: 'additional', label: 'Additional Details', icon: List }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {editData ? 'Edit Admission' : 'Create New Admission'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {editData ? 'Update the admission details below' : 'Fill in all required details for the new admission posting'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                
                
                <button
                  type="button"
                  onClick={handleHeaderSaveClick}
                  disabled={loading || isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading || isSubmitting ? 'Saving...' : editData ? 'Update Admission' : 'Create Admission'}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
          
            <form id="jobForm" onSubmit={handleSubmit}>
              {renderSection()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
                <div>
                  {activeSection !== 'basic' && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(sections[currentIndex - 1].id);
                        }
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      ← Previous
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {activeSection !== sections[sections.length - 1].id ? (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        if (currentIndex < sections.length - 1) {
                          setActiveSection(sections[currentIndex + 1].id);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Next →
                    </button>
                  ) : (
                  
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {loading || isSubmitting ? 'Saving...' : editData ? 'Update Admission' : 'Create Admission'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;