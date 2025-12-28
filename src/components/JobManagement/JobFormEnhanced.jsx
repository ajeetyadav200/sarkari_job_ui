
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Save, Calendar, Briefcase, User, FileText, DollarSign, Award, FileCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createJob, updateJob } from '../../slice/jobSlice';
import DynamicContentBuilder from '../common/DynamicContentBuilder';

const JobFormEnhanced = ({ onClose, onSuccess, editData, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.jobs);

  const [formData, setFormData] = useState({
    departmentName: editData?.departmentName || '',
    postName: editData?.postName || '',
    helpEmailId: editData?.helpEmailId || '',
    helpCareNo: editData?.helpCareNo || '+91',
    officialWebsite: editData?.officialWebsite || '',
    totalPost: editData?.totalPost || 1,
    modeOfForm: editData?.modeOfForm || 'online',
    showInPortal: editData?.showInPortal !== false,
    typeOfForm: editData?.typeOfForm || 'government',
    paymentMode: editData?.paymentMode || 'paid',
    categoryPosts: editData?.categoryPosts || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },
    categoryFees: editData?.categoryFees || {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0
    },
    eligibilityEducational1: editData?.eligibilityEducational1 || '',
    eligibilityEducational2: editData?.eligibilityEducational2 || '',
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
      ageRelaxation: ''
    },
    // NEW: Dynamic Content Fields
    description: editData?.description || '',
    dynamicContent: editData?.dynamicContent || [],
    contentSections: editData?.contentSections || [],
    selectionProcess: editData?.selectionProcess || [],
    documentsRequired: editData?.documentsRequired || [],
    importantInstructions: editData?.importantInstructions || []
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  // Handle cancel/close
  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      if (user?.role === 'admin') {
        navigate('/admin/jobs');
      } else if (user?.role === 'publisher') {
        navigate('/publisher/jobs');
      } else if (user?.role === 'assistant') {
        navigate('/assistant/jobs');
      } else {
        navigate('/admin/jobs');
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
      toast.error('Please fix the form errors before submitting.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      if (editData) {
        await dispatch(updateJob({
          id: editData._id,
          data: formData
        })).unwrap();

        toast.success('Job updated successfully!', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          if (onSuccess) {
            onSuccess('Job updated successfully');
          } else {
            handleCancel();
          }
        }, 1000);
      } else {
        await dispatch(createJob(formData)).unwrap();

        toast.success('Job created successfully!', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          if (onSuccess) {
            onSuccess('Job created successfully');
          } else {
            handleCancel();
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error(error.message || 'Failed to save job. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'basic':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Job Department Details
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
                  Help Email ID *
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
                  Help Care Number *
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
                  Official Website *
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
                  Total Posts *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalPost}
                  onChange={(e) => handleDirectChange('totalPost', parseInt(e.target.value) || 1)}
                  className={`w-full px-3 py-2 border ${errors.totalPost ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.totalPost && <p className="mt-1 text-sm text-red-600">{errors.totalPost}</p>}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

              <div className="flex items-center mt-6">
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
          </div>
        );

      case 'posts':
        return (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Category-wise Posts Distribution
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { id: 'general', label: 'General' },
                { id: 'obc', label: 'OBC' },
                { id: 'sc', label: 'SC' },
                { id: 'st', label: 'ST' },
                { id: 'ews', label: 'EWS' },
                { id: 'ph', label: 'PH' }
              ].map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {category.label} Posts
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.categoryPosts[category.id] || 0}
                    onChange={(e) => handleCategoryPostChange(category.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Total Posts: <span className="font-bold text-blue-600">
                  {Object.values(formData.categoryPosts).reduce((a, b) => a + b, 0)}
                </span> / {formData.totalPost}
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
                { id: 'ph', label: 'PH' }
              ].map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {category.label} Fee
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.categoryFees[category.id] || 0}
                    onChange={(e) => handleCategoryFeeChange(category.id, e.target.value)}
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
                Primary Educational Qualification *
              </label>
              <textarea
                value={formData.eligibilityEducational1}
                onChange={(e) => handleDirectChange('eligibilityEducational1', e.target.value)}
                rows="4"
                className={`w-full px-3 py-2 border ${errors.eligibilityEducational1 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Bachelor's degree in relevant field with minimum 60% marks"
              />
              {errors.eligibilityEducational1 && <p className="mt-1 text-sm text-red-600">{errors.eligibilityEducational1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Qualification (Optional)
              </label>
              <textarea
                value={formData.eligibilityEducational2}
                onChange={(e) => handleDirectChange('eligibilityEducational2', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Master's degree preferred, Computer literacy certificate"
              />
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
                { id: 'ageOnDate', label: 'Age On Date' }
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="date"
                    value={formData.importantDates[field.id] ? formData.importantDates[field.id].split('T')[0] : ''}
                    onChange={(e) => handleChange('importantDates', field.id, e.target.value + 'T00:00:00')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.importantDates.minimumAge || ''}
                  onChange={(e) => handleChange('importantDates', 'minimumAge', e.target.value)}
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
                  value={formData.importantDates.maximumAge || ''}
                  onChange={(e) => handleChange('importantDates', 'maximumAge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="35"
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
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Additional Content & Instructions
            </h3>

            {/* Simple Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleDirectChange('description', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the job posting..."
              />
            </div>

            {/* Dynamic Content Builder */}
            <DynamicContentBuilder
              value={formData.dynamicContent}
              onChange={(value) => handleDirectChange('dynamicContent', value)}
              label="Advanced Dynamic Content"
              showQuickArrays={true}
              quickArrays={{
                selectionProcess: formData.selectionProcess,
                documentsRequired: formData.documentsRequired,
                importantInstructions: formData.importantInstructions
              }}
              onQuickArraysChange={(arrays) => {
                handleDirectChange('selectionProcess', arrays.selectionProcess);
                handleDirectChange('documentsRequired', arrays.documentsRequired);
                handleDirectChange('importantInstructions', arrays.importantInstructions);
              }}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Content Tips</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Use "Quick Arrays" for simple lists like Selection Process, Documents Required, etc.</li>
                <li>• Use "Advanced Content" for complex data like Physical Standards tables, Pay Scales, etc.</li>
                <li>• Content will be displayed beautifully on the public job listing page</li>
              </ul>
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
    { id: 'content', label: 'Content & Details', icon: FileCode }
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
                  {editData ? 'Edit Job Posting' : 'Create New Job Posting'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {editData ? 'Update the job details below' : 'Fill in all required details for the new job posting'}
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
                  type="submit"
                  form="jobForm"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : editData ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white overflow-x-auto">
            <div className="flex flex-nowrap gap-2 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
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
                      form="jobForm"
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
    </div>
  );
};

export default JobFormEnhanced;
