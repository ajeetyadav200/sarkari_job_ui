import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Save, Calendar } from 'lucide-react';
import { createJob, updateJob } from '../../slice/jobSlice';

const JobForm = ({ onClose, onSuccess, editData, user }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.jobs);
  
  const [formData, setFormData] = useState({
    // Job Department Details
    departmentName: editData?.departmentName || '',
    postName: editData?.postName || '',
    modeOfForm: editData?.modeOfForm || 'online',
    showInPortal: editData?.showInPortal !== false,
    helpEmailId: editData?.helpEmailId || '',
    typeOfForm: editData?.typeOfForm || 'government',
    helpCareNo: editData?.helpCareNo || '',
    paymentMode: editData?.paymentMode || 'paid',
    officialWebsite: editData?.officialWebsite || '',
    totalPost: editData?.totalPost || 1,
    
    // Category Posts
    categoryPosts: editData?.categoryPosts || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },
    
    // Category Fees
    categoryFees: editData?.categoryFees || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },
    
    // Eligibility
    eligibilityEducational1: editData?.eligibilityEducational1 || '',
    eligibilityEducational2: editData?.eligibilityEducational2 || '',
    
    // Important Dates
    importantDates: editData?.importantDates || {
      startDate: '',
      registrationLastDate: '',
      feeLastDate: '',
      challanFeeLastDate: '',
      finalLastDate: '',
      correctionDate: '',
      admitCardDate: '',
      examDate: '',
      answerKeyDate: '',
      resultDate: '',
      formulationDate: '',
      ageOnDate: '',
      minimumAge: '',
      maximumAge: '',
      ageRelaxation: '',
      pageName: '',
      selectAdvertiseDate: ''
    },
    
    // Other Details
    otherDetails: editData?.otherDetails || {
      bisixf1: '',
      format: '',
      captchaCode: '',
      digitCode: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  const sections = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'posts', label: 'Posts & Fees' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'other', label: 'Other Details' }
  ];

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error for this field
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
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCategoryPostChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      categoryPosts: {
        ...prev.categoryPosts,
        [category]: numValue
      }
    }));
  };

  const handleCategoryFeeChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      categoryFees: {
        ...prev.categoryFees,
        [category]: numValue
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
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
    if (!formData.totalPost || formData.totalPost < 1) {
      newErrors.totalPost = 'Total posts must be at least 1';
    }
    if (!formData.eligibilityEducational1.trim()) {
      newErrors.eligibilityEducational1 = 'Primary eligibility is required';
    }

    // Date validation
    if (formData.importantDates.startDate && formData.importantDates.registrationLastDate) {
      const startDate = new Date(formData.importantDates.startDate);
      const lastDate = new Date(formData.importantDates.registrationLastDate);
      if (startDate > lastDate) {
        newErrors['importantDates.registrationLastDate'] = 'Last date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editData) {
        await dispatch(updateJob({ 
          id: editData._id, 
          data: formData 
        })).unwrap();
        onSuccess('Job updated successfully');
      } else {
        await dispatch(createJob(formData)).unwrap();
        onSuccess('Job created successfully');
      }
    } catch (error) {
      // Error is handled by Redux slice
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'basic':
        return (
          <div className="space-y-6">
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
                {errors.departmentName && (
                  <p className="mt-1 text-sm text-red-600">{errors.departmentName}</p>
                )}
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
                {errors.postName && (
                  <p className="mt-1 text-sm text-red-600">{errors.postName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode of Form *
                </label>
                <select
                  value={formData.modeOfForm}
                  onChange={(e) => handleDirectChange('modeOfForm', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Form *
                </label>
                <select
                  value={formData.typeOfForm}
                  onChange={(e) => handleDirectChange('typeOfForm', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="semi-government">Semi-Government</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Help Email ID *
                </label>
                <input
                  type="email"
                  value={formData.helpEmailId}
                  onChange={(e) => handleDirectChange('helpEmailId', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.helpEmailId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="help@example.com"
                />
                {errors.helpEmailId && (
                  <p className="mt-1 text-sm text-red-600">{errors.helpEmailId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Help Care Number *
                </label>
                <input
                  type="tel"
                  value={formData.helpCareNo}
                  onChange={(e) => handleDirectChange('helpCareNo', e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.helpCareNo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="+91 9876543210"
                />
                {errors.helpCareNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.helpCareNo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Mode *
                </label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => handleDirectChange('paymentMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="conditional">Conditional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Posts *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalPost}
                  onChange={(e) => handleDirectChange('totalPost', parseInt(e.target.value) || 1)}
                  className={`w-full px-3 py-2 border ${errors.totalPost ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.totalPost && (
                  <p className="mt-1 text-sm text-red-600">{errors.totalPost}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Official Website *
              </label>
              <input
                type="url"
                value={formData.officialWebsite}
                onChange={(e) => handleDirectChange('officialWebsite', e.target.value)}
                className={`w-full px-3 py-2 border ${errors.officialWebsite ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://example.com"
              />
              {errors.officialWebsite && (
                <p className="mt-1 text-sm text-red-600">{errors.officialWebsite}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showInPortal"
                checked={formData.showInPortal}
                onChange={(e) => handleDirectChange('showInPortal', e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="showInPortal" className="ml-2 text-sm text-gray-700">
                Show this job in public portal
              </label>
            </div>
          </div>
        );

      case 'posts':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Category-wise Posts Distribution</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['general', 'obc', 'sc', 'st', 'ews', 'ph'].map((category) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {category.toUpperCase()} Posts
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.categoryPosts[category] || 0}
                      onChange={(e) => handleCategoryPostChange(category, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Total Posts: <span className="font-bold">{Object.values(formData.categoryPosts).reduce((a, b) => a + b, 0)}</span> / {formData.totalPost}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Category-wise Fees (₹)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['general', 'obc', 'sc', 'st', 'ews', 'ph'].map((category) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {category.toUpperCase()} Fee
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.categoryFees[category] || 0}
                      onChange={(e) => handleCategoryFeeChange(category, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Educational Qualification *
              </label>
              <textarea
                value={formData.eligibilityEducational1}
                onChange={(e) => handleDirectChange('eligibilityEducational1', e.target.value)}
                rows="3"
                className={`w-full px-3 py-2 border ${errors.eligibilityEducational1 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Bachelor's degree in relevant field with minimum 60% marks"
              />
              {errors.eligibilityEducational1 && (
                <p className="mt-1 text-sm text-red-600">{errors.eligibilityEducational1}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Qualification (Optional)
              </label>
              <textarea
                value={formData.eligibilityEducational2}
                onChange={(e) => handleDirectChange('eligibilityEducational2', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Master's degree preferred, Computer literacy certificate"
              />
            </div>
          </div>
        );

      case 'dates':
        const dateFields = [
          { id: 'startDate', label: 'Start Date' },
          { id: 'registrationLastDate', label: 'Registration Last Date' },
          { id: 'feeLastDate', label: 'Fee Last Date' },
          { id: 'challanFeeLastDate', label: 'Challan Fee Last Date' },
          { id: 'finalLastDate', label: 'Final Last Date' },
          { id: 'correctionDate', label: 'Correction Date' },
          { id: 'admitCardDate', label: 'Admit Card Date' },
          { id: 'examDate', label: 'Exam Date' },
          { id: 'answerKeyDate', label: 'Answer Key Date' },
          { id: 'resultDate', label: 'Result Date' },
          { id: 'formulationDate', label: 'Formulation Date' },
          { id: 'ageOnDate', label: 'Age On Date' },
          { id: 'selectAdvertiseDate', label: 'Select Advertise Date' }
        ];

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dateFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.importantDates[field.id] ? new Date(formData.importantDates[field.id]).toISOString().slice(0, 16) : ''}
                    onChange={(e) => handleChange('importantDates', field.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.importantDates.minimumAge || ''}
                  onChange={(e) => handleChange('importantDates', 'minimumAge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.importantDates.maximumAge || ''}
                  onChange={(e) => handleChange('importantDates', 'maximumAge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Relaxation
                </label>
                <input
                  type="text"
                  value={formData.importantDates.ageRelaxation || ''}
                  onChange={(e) => handleChange('importantDates', 'ageRelaxation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5 years for SC/ST"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Name
              </label>
              <input
                type="text"
                value={formData.importantDates.pageName || ''}
                onChange={(e) => handleChange('importantDates', 'pageName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Recruitment 2024"
              />
            </div>
          </div>
        );

      case 'other':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  B I S I X F 1
                </label>
                <input
                  type="text"
                  value={formData.otherDetails.bisixf1 || ''}
                  onChange={(e) => handleChange('otherDetails', 'bisixf1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter B I S I X F 1 value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <input
                  type="text"
                  value={formData.otherDetails.format || ''}
                  onChange={(e) => handleChange('otherDetails', 'format', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter format"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Captcha Code
                </label>
                <input
                  type="text"
                  value={formData.otherDetails.captchaCode || ''}
                  onChange={(e) => handleChange('otherDetails', 'captchaCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter captcha code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  6 Digit Code
                </label>
                <input
                  type="text"
                  maxLength="6"
                  value={formData.otherDetails.digitCode || ''}
                  onChange={(e) => handleChange('otherDetails', 'digitCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editData ? 'Edit Job' : 'Create New Job'}
            </h2>
            <p className="text-sm text-gray-600">
              {editData ? 'Update job details' : 'Fill in all required details for the job posting'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
                {index < sections.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <form onSubmit={handleSubmit}>
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
                    Previous
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
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : editData ? 'Update Job' : 'Create Job'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;