// components/GovernmentServiceManagement/GovernmentServiceForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createGovernmentService,
  updateGovernmentService,
  fetchServiceById,
  fetchServiceTypes
} from '../../slice/governmentServiceSlice';
import uploadService from '../../services/uploadService';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
  Upload,
  File,
  Plus,
  Loader2,
  Check,
  Globe,
  Building2,
  MapPin,
  Users,
  IndianRupee,
  FileText,
  Link as LinkIcon,
  Phone,
  Mail,
  HelpCircle,
  Tag,
  Trash2
} from 'lucide-react';

const GovernmentServiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  // Extract user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[1];

  const { currentService, loading, serviceTypes } = useSelector(state => state?.governmentServices || {});
  const user = useSelector(store => store?.user);

  // Service Types & Categories
  const serviceTypeOptions = [
    { value: '', label: 'Select Service Type', disabled: true },
    { value: 'scholarship', label: 'Scholarship', icon: '🎓' },
    { value: 'certificate', label: 'Certificate', icon: '📜' },
    { value: 'registration', label: 'Registration', icon: '📝' },
    { value: 'verification', label: 'Verification', icon: '✅' },
    { value: 'governmentScheme', label: 'Government Scheme', icon: '🏛️' },
    { value: 'documentService', label: 'Document Service', icon: '📄' },
    { value: 'welfareScheme', label: 'Welfare Scheme', icon: '🤝' },
    { value: 'financialService', label: 'Financial Service', icon: '💰' },
    { value: 'other', label: 'Other', icon: '📋' }
  ];

  const serviceCategoryOptions = {
    scholarship: [
      { value: 'preMatric', label: 'Pre-Matric (Class 9-10)' },
      { value: 'postMatric', label: 'Post-Matric (Class 11-12)' },
      { value: 'higherEducation', label: 'Higher Education' },
      { value: 'professional', label: 'Professional' },
      { value: 'minority', label: 'Minority' },
      { value: 'meritBased', label: 'Merit Based' },
      { value: 'needBased', label: 'Need Based' }
    ],
    certificate: [
      { value: 'incomeCertificate', label: 'Income Certificate' },
      { value: 'casteCertificate', label: 'Caste Certificate' },
      { value: 'domicileCertificate', label: 'Domicile Certificate' },
      { value: 'birthCertificate', label: 'Birth Certificate' },
      { value: 'deathCertificate', label: 'Death Certificate' },
      { value: 'marriageCertificate', label: 'Marriage Certificate' },
      { value: 'characterCertificate', label: 'Character Certificate' }
    ],
    registration: [
      { value: 'panCard', label: 'PAN Card' },
      { value: 'aadhaar', label: 'Aadhaar' },
      { value: 'voterId', label: 'Voter ID' },
      { value: 'passport', label: 'Passport' },
      { value: 'drivingLicense', label: 'Driving License' },
      { value: 'rationCard', label: 'Ration Card' }
    ],
    verification: [
      { value: 'documentVerification', label: 'Document Verification' },
      { value: 'certificateVerification', label: 'Certificate Verification' },
      { value: 'statusCheck', label: 'Status Check' }
    ],
    governmentScheme: [
      { value: 'pensionScheme', label: 'Pension Scheme' },
      { value: 'healthScheme', label: 'Health Scheme' },
      { value: 'housingScheme', label: 'Housing Scheme' },
      { value: 'employmentScheme', label: 'Employment Scheme' },
      { value: 'agriculturalScheme', label: 'Agricultural Scheme' }
    ],
    welfareScheme: [
      { value: 'pensionScheme', label: 'Pension Scheme' },
      { value: 'healthScheme', label: 'Health Scheme' },
      { value: 'housingScheme', label: 'Housing Scheme' }
    ],
    other: [
      { value: 'other', label: 'Other' }
    ]
  };

  const stateOptions = [
    { value: 'allIndia', label: 'All India' },
    { value: 'uttarPradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'westBengal', label: 'West Bengal' },
    { value: 'madhyaPradesh', label: 'Madhya Pradesh' },
    { value: 'tamilNadu', label: 'Tamil Nadu' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'andhraPradesh', label: 'Andhra Pradesh' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'assam', label: 'Assam' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'jammuKashmir', label: 'Jammu & Kashmir' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'himachalPradesh', label: 'Himachal Pradesh' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'goa', label: 'Goa' },
    { value: 'arunachalPradesh', label: 'Arunachal Pradesh' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'puducherry', label: 'Puducherry' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'other', label: 'Other' }
  ];

  const applicableForOptions = [
    { value: 'all', label: 'All' },
    { value: 'indianCitizen', label: 'Indian Citizen' },
    { value: 'foreignCitizen', label: 'Foreign Citizen' },
    { value: 'nri', label: 'NRI' },
    { value: 'student', label: 'Student' },
    { value: 'seniorCitizen', label: 'Senior Citizen' },
    { value: 'women', label: 'Women' },
    { value: 'farmer', label: 'Farmer' },
    { value: 'bpl', label: 'BPL' },
    { value: 'minority', label: 'Minority' },
    { value: 'differentlyAbled', label: 'Differently Abled' }
  ];

  const [formData, setFormData] = useState({
    // Basic Info
    serviceName: '',
    serviceNameHindi: '',
    shortTitle: '',
    serviceType: '',
    serviceCategory: 'other',
    organizationName: '',
    departmentName: '',
    state: 'allIndia',

    // Description
    shortDescription: '',
    fullDescription: '',
    aboutService: '',
    howToApply: '',

    // Eligibility
    applicableFor: [],
    eligibilityCriteria: '',
    eligibilityPoints: [],

    // Dates
    postDate: new Date().toISOString().split('T')[0],
    importantDates: {
      applicationStartDate: '',
      applicationLastDate: '',
      lastDateForFreshApply: '',
      lastDateForRenewal: '',
      feePaymentLastDate: '',
      correctionStartDate: '',
      correctionLastDate: '',
      hardCopySubmissionLastDate: ''
    },

    // Fees
    applicationFee: '',
    isFreeService: false,
    feePaymentModes: [],
    categoryFees: {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      ews: 0,
      ph: 0,
      female: 0,
      indianCitizen: 0,
      foreignCitizen: 0,
      nri: 0
    },

    // Documents
    documentsRequired: [],

    // Links
    importantLinks: [],
    officialWebsite: '',
    applyOnlineLink: '',
    loginLink: '',
    statusCheckLink: '',

    // Instructions
    importantInstructions: [],
    howToSteps: [],

    // Scholarship Specific
    scholarshipDetails: {
      scholarshipName: '',
      organizationName: '',
      scholarshipAmount: '',
      scholarshipType: 'other',
      renewalAvailable: false,
      renewalCriteria: '',
      academicYear: '',
      classesEligible: [],
      incomeLimit: '',
      percentageRequired: ''
    },

    // Certificate Specific
    certificateDetails: {
      certificateType: '',
      issuingAuthority: '',
      validityPeriod: '',
      deliveryMode: 'online',
      processingTime: '',
      verificationRequired: false,
      trackingAvailable: true,
      printingAvailable: true,
      correctionAvailable: true
    },

    // Contact
    helplineNumber: '',
    helpEmail: '',
    helpAddress: '',

    // SEO
    tags: [],
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    showInPortal: true,
    isFeatured: false,
    priority: 0,

    // Status
    status: user?.role === 'admin' ? 'pending' : 'pending',
    activeStatus: 'active'
  });

  // File state
  const [files, setFiles] = useState({
    officialNotification: null,
    applicationForm: null,
    instructionSheet: null,
    guidelinesFile: null,
    sampleForm: null,
    otherFile1: null,
    otherFile2: null
  });

  const [uploadedFileData, setUploadedFileData] = useState({
    officialNotification: null,
    applicationForm: null,
    instructionSheet: null,
    guidelinesFile: null,
    sampleForm: null,
    otherFile1: null,
    otherFile2: null
  });

  const [fileNames, setFileNames] = useState({
    officialNotification: '',
    applicationForm: '',
    instructionSheet: '',
    guidelinesFile: '',
    sampleForm: '',
    otherFile1: '',
    otherFile2: ''
  });

  const [uploadingFiles, setUploadingFiles] = useState({
    officialNotification: false,
    applicationForm: false,
    instructionSheet: false,
    guidelinesFile: false,
    sampleForm: false,
    otherFile1: false,
    otherFile2: false
  });

  const fileTypeLabels = {
    officialNotification: 'Official Notification',
    applicationForm: 'Application Form',
    instructionSheet: 'Instruction Sheet',
    guidelinesFile: 'Guidelines File',
    sampleForm: 'Sample Form',
    otherFile1: 'Other File 1',
    otherFile2: 'Other File 2'
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentDocument, setCurrentDocument] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [currentEligibilityPoint, setCurrentEligibilityPoint] = useState('');
  const [activeSection, setActiveSection] = useState('basic');

  // New Important Link state
  const [newLink, setNewLink] = useState({
    linkTitle: '',
    linkUrl: '',
    linkCategory: 'other',
    isForIndianCitizen: true,
    isForForeignCitizen: false,
    description: ''
  });

  useEffect(() => {
    dispatch(fetchServiceTypes());

    if (isEditMode) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentService && isEditMode) {
      const formattedData = {
        ...formData,
        serviceName: currentService.serviceName || '',
        serviceNameHindi: currentService.serviceNameHindi || '',
        shortTitle: currentService.shortTitle || '',
        serviceType: currentService.serviceType || '',
        serviceCategory: currentService.serviceCategory || 'other',
        organizationName: currentService.organizationName || '',
        departmentName: currentService.departmentName || '',
        state: currentService.state || 'allIndia',
        shortDescription: currentService.shortDescription || '',
        fullDescription: currentService.fullDescription || '',
        aboutService: currentService.aboutService || '',
        howToApply: currentService.howToApply || '',
        applicableFor: currentService.applicableFor || [],
        eligibilityCriteria: currentService.eligibilityCriteria || '',
        eligibilityPoints: currentService.eligibilityPoints || [],
        postDate: currentService.postDate ? new Date(currentService.postDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        importantDates: {
          applicationStartDate: currentService.importantDates?.applicationStartDate ? new Date(currentService.importantDates.applicationStartDate).toISOString().split('T')[0] : '',
          applicationLastDate: currentService.importantDates?.applicationLastDate ? new Date(currentService.importantDates.applicationLastDate).toISOString().split('T')[0] : '',
          lastDateForFreshApply: currentService.importantDates?.lastDateForFreshApply ? new Date(currentService.importantDates.lastDateForFreshApply).toISOString().split('T')[0] : '',
          lastDateForRenewal: currentService.importantDates?.lastDateForRenewal ? new Date(currentService.importantDates.lastDateForRenewal).toISOString().split('T')[0] : '',
          feePaymentLastDate: currentService.importantDates?.feePaymentLastDate ? new Date(currentService.importantDates.feePaymentLastDate).toISOString().split('T')[0] : '',
          correctionStartDate: currentService.importantDates?.correctionStartDate ? new Date(currentService.importantDates.correctionStartDate).toISOString().split('T')[0] : '',
          correctionLastDate: currentService.importantDates?.correctionLastDate ? new Date(currentService.importantDates.correctionLastDate).toISOString().split('T')[0] : '',
          hardCopySubmissionLastDate: currentService.importantDates?.hardCopySubmissionLastDate ? new Date(currentService.importantDates.hardCopySubmissionLastDate).toISOString().split('T')[0] : ''
        },
        applicationFee: currentService.applicationFee || '',
        isFreeService: currentService.isFreeService || false,
        feePaymentModes: currentService.feePaymentModes || [],
        categoryFees: currentService.categoryFees || formData.categoryFees,
        documentsRequired: currentService.documentsRequired || [],
        importantLinks: currentService.importantLinks || [],
        officialWebsite: currentService.officialWebsite || '',
        applyOnlineLink: currentService.applyOnlineLink || '',
        loginLink: currentService.loginLink || '',
        statusCheckLink: currentService.statusCheckLink || '',
        importantInstructions: currentService.importantInstructions || [],
        howToSteps: currentService.howToSteps || [],
        scholarshipDetails: currentService.scholarshipDetails || formData.scholarshipDetails,
        certificateDetails: currentService.certificateDetails || formData.certificateDetails,
        helplineNumber: currentService.helplineNumber || '',
        helpEmail: currentService.helpEmail || '',
        helpAddress: currentService.helpAddress || '',
        tags: currentService.tags || [],
        metaTitle: currentService.metaTitle || '',
        metaDescription: currentService.metaDescription || '',
        keywords: currentService.keywords || [],
        showInPortal: currentService.showInPortal !== false,
        isFeatured: currentService.isFeatured || false,
        priority: currentService.priority || 0,
        status: currentService.status || 'pending',
        activeStatus: currentService.activeStatus || 'active'
      };

      setFormData(formattedData);

      // Set existing file data
      const existingFileData = {};
      const existingFileNamesData = {};
      Object.keys(fileTypeLabels).forEach(key => {
        if (currentService[key] && currentService[key].fileUrl) {
          existingFileData[key] = currentService[key];
          existingFileNamesData[key] = currentService[key].fileName || '';
        }
      });
      setUploadedFileData(prev => ({ ...prev, ...existingFileData }));
      setFileNames(prev => ({ ...prev, ...existingFileNamesData }));
    }
  }, [currentService, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceName || !formData.serviceName.trim()) {
      newErrors.serviceName = 'Service name is required';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFileImmediately = async (fieldName, file) => {
    if (!file) return null;

    try {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));
      const customName = fileNames[fieldName] || file.name;
      const result = await uploadService.uploadSingleFile(file, fieldName, customName);

      if (result.success && result.data) {
        const uploadedFileInfo = {
          fileUrl: result.data.fileUrl,
          fileName: result.data.fileName || customName,
          cloudinaryId: result.data.cloudinaryId,
          fileType: result.data.fileType || result.data.format,
          uploadedAt: new Date().toISOString()
        };

        setUploadedFileData(prev => ({
          ...prev,
          [fieldName]: uploadedFileInfo
        }));

        toast.success(`${fileTypeLabels[fieldName]} uploaded successfully!`);
        return uploadedFileInfo;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      toast.error(`Failed to upload ${fileTypeLabels[fieldName]}: ${error.message}`);
      return null;
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags,
        documentsRequired: formData.documentsRequired,
        importantInstructions: formData.importantInstructions,
        eligibilityPoints: formData.eligibilityPoints,
        importantLinks: formData.importantLinks,
        howToSteps: formData.howToSteps
      };

      // Add uploaded file URLs
      Object.keys(uploadedFileData).forEach(fieldName => {
        if (uploadedFileData[fieldName]) {
          submitData[fieldName] = uploadedFileData[fieldName];
        }
      });

      if (isEditMode) {
        await dispatch(updateGovernmentService({ id, formData: submitData })).unwrap();
        toast.success('Government service updated successfully!');
      } else {
        await dispatch(createGovernmentService(submitData)).unwrap();
        toast.success('Government service created successfully!');
      }

      navigate(`/${userRole}/government-services`);
    } catch (error) {
      toast.error(error?.message || 'Failed to submit service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setFiles(prev => ({ ...prev, [fieldName]: file }));

    if (!fileNames[fieldName]) {
      setFileNames(prev => ({ ...prev, [fieldName]: file.name }));
    }

    await uploadFileImmediately(fieldName, file);
  };

  const removeFile = (fieldName) => {
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    setUploadedFileData(prev => ({ ...prev, [fieldName]: null }));
    setFileNames(prev => ({ ...prev, [fieldName]: '' }));
    toast.info(`${fileTypeLabels[fieldName]} removed`);
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

  const addDocument = () => {
    if (currentDocument.trim() && !formData.documentsRequired.includes(currentDocument.trim())) {
      setFormData(prev => ({
        ...prev,
        documentsRequired: [...prev.documentsRequired, currentDocument.trim()]
      }));
      setCurrentDocument('');
    }
  };

  const removeDocument = (docToRemove) => {
    setFormData(prev => ({
      ...prev,
      documentsRequired: prev.documentsRequired.filter(doc => doc !== docToRemove)
    }));
  };

  const addInstruction = () => {
    if (currentInstruction.trim() && !formData.importantInstructions.includes(currentInstruction.trim())) {
      setFormData(prev => ({
        ...prev,
        importantInstructions: [...prev.importantInstructions, currentInstruction.trim()]
      }));
      setCurrentInstruction('');
    }
  };

  const removeInstruction = (instrToRemove) => {
    setFormData(prev => ({
      ...prev,
      importantInstructions: prev.importantInstructions.filter(instr => instr !== instrToRemove)
    }));
  };

  const addEligibilityPoint = () => {
    if (currentEligibilityPoint.trim() && !formData.eligibilityPoints.includes(currentEligibilityPoint.trim())) {
      setFormData(prev => ({
        ...prev,
        eligibilityPoints: [...prev.eligibilityPoints, currentEligibilityPoint.trim()]
      }));
      setCurrentEligibilityPoint('');
    }
  };

  const removeEligibilityPoint = (pointToRemove) => {
    setFormData(prev => ({
      ...prev,
      eligibilityPoints: prev.eligibilityPoints.filter(point => point !== pointToRemove)
    }));
  };

  const addImportantLink = () => {
    if (newLink.linkTitle.trim() && newLink.linkUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        importantLinks: [...prev.importantLinks, { ...newLink, order: prev.importantLinks.length }]
      }));
      setNewLink({
        linkTitle: '',
        linkUrl: '',
        linkCategory: 'other',
        isForIndianCitizen: true,
        isForForeignCitizen: false,
        description: ''
      });
    }
  };

  const removeImportantLink = (index) => {
    setFormData(prev => ({
      ...prev,
      importantLinks: prev.importantLinks.filter((_, i) => i !== index)
    }));
  };

  const handleApplicableForChange = (value) => {
    setFormData(prev => {
      const currentValues = prev.applicableFor || [];
      if (currentValues.includes(value)) {
        return { ...prev, applicableFor: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, applicableFor: [...currentValues, value] };
      }
    });
  };

  const hasFile = (fieldName) => {
    return uploadedFileData[fieldName] !== null || files[fieldName] !== null;
  };

  const isFileUploading = (fieldName) => {
    return uploadingFiles[fieldName];
  };

  const getDisplayFileName = (fieldName) => {
    if (uploadedFileData[fieldName]) {
      return uploadedFileData[fieldName].fileName || 'Uploaded file';
    }
    if (files[fieldName]) {
      return files[fieldName].name;
    }
    return '';
  };

  const getFileStatus = (fieldName) => {
    if (isFileUploading(fieldName)) return 'uploading';
    if (uploadedFileData[fieldName]) return 'uploaded';
    if (files[fieldName]) return 'selected';
    return 'none';
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'dates', label: 'Dates', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: IndianRupee },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'links', label: 'Links', icon: LinkIcon },
    { id: 'files', label: 'Files', icon: Upload },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'seo', label: 'SEO', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/${userRole}/government-services`)}
              className="p-2 rounded-lg hover:bg-white/60 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Government Service' : 'Create New Government Service'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode ? 'Update service details' : 'Add a new government service (Scholarship, Certificate, Registration, etc.)'}
              </p>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Basic Info Section */}
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h3>

              {/* Service Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.serviceType ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    {serviceTypeOptions.map(option => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Service Category</label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="other">Select Category</option>
                    {(serviceCategoryOptions[formData.serviceType] || serviceCategoryOptions.other).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  placeholder="e.g., UP Scholarship 2025-26, PAN Card Registration"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.serviceName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.serviceName && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.serviceName}
                  </p>
                )}
              </div>

              {/* Service Name Hindi */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Service Name (Hindi)</label>
                <input
                  type="text"
                  name="serviceNameHindi"
                  value={formData.serviceNameHindi}
                  onChange={handleInputChange}
                  placeholder="e.g., यूपी छात्रवृत्ति 2025-26"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Short Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Short Title</label>
                <input
                  type="text"
                  name="shortTitle"
                  value={formData.shortTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., UP Scholarship, PAN Card"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Organization & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="e.g., Social Welfare Department"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Department Name</label>
                  <input
                    type="text"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleInputChange}
                    placeholder="e.g., Ministry of Finance, NSDL"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {stateOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Brief description of the service..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Detailed description of the service..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">About Service (What is this?)</label>
                <textarea
                  name="aboutService"
                  value={formData.aboutService}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Explain what this service is about..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">How to Apply</label>
                <textarea
                  name="howToApply"
                  value={formData.howToApply}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Step by step guide on how to apply..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          {/* Dates Section */}
          {activeSection === 'dates' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Important Dates</h3>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Post Date</label>
                <input
                  type="date"
                  name="postDate"
                  value={formData.postDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Application Start Date</label>
                  <input
                    type="date"
                    name="importantDates.applicationStartDate"
                    value={formData.importantDates.applicationStartDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Application Last Date</label>
                  <input
                    type="date"
                    name="importantDates.applicationLastDate"
                    value={formData.importantDates.applicationLastDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Last Date for Fresh Apply</label>
                  <input
                    type="date"
                    name="importantDates.lastDateForFreshApply"
                    value={formData.importantDates.lastDateForFreshApply}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Last Date for Renewal</label>
                  <input
                    type="date"
                    name="importantDates.lastDateForRenewal"
                    value={formData.importantDates.lastDateForRenewal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Fee Payment Last Date</label>
                  <input
                    type="date"
                    name="importantDates.feePaymentLastDate"
                    value={formData.importantDates.feePaymentLastDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Hard Copy Submission Last Date</label>
                  <input
                    type="date"
                    name="importantDates.hardCopySubmissionLastDate"
                    value={formData.importantDates.hardCopySubmissionLastDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Correction Start Date</label>
                  <input
                    type="date"
                    name="importantDates.correctionStartDate"
                    value={formData.importantDates.correctionStartDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Correction Last Date</label>
                  <input
                    type="date"
                    name="importantDates.correctionLastDate"
                    value={formData.importantDates.correctionLastDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fees Section */}
          {activeSection === 'fees' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Application Fee</h3>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="isFreeService"
                  name="isFreeService"
                  checked={formData.isFreeService}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                />
                <label htmlFor="isFreeService" className="text-sm font-medium text-gray-700">
                  This is a Free Service (No Application Fee)
                </label>
              </div>

              {!formData.isFreeService && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Application Fee Description</label>
                    <input
                      type="text"
                      name="applicationFee"
                      value={formData.applicationFee}
                      onChange={handleInputChange}
                      placeholder="e.g., Rs. 107/- for Indian Citizen"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Category-wise Fees (in Rs.)</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.keys(formData.categoryFees).map(category => (
                        <div key={category} className="space-y-1">
                          <label className="block text-xs text-gray-600 capitalize">{category}</label>
                          <input
                            type="number"
                            name={`categoryFees.${category}`}
                            value={formData.categoryFees[category]}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Payment Modes</label>
                    <div className="flex flex-wrap gap-3">
                      {['debitCard', 'creditCard', 'netBanking', 'upi', 'challan', 'demandDraft', 'cash'].map(mode => (
                        <label key={mode} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.feePaymentModes.includes(mode)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  feePaymentModes: [...prev.feePaymentModes, mode]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  feePaymentModes: prev.feePaymentModes.filter(m => m !== mode)
                                }));
                              }
                            }}
                            className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">{mode.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Eligibility Section */}
          {activeSection === 'eligibility' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Eligibility</h3>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Applicable For</label>
                <div className="flex flex-wrap gap-3">
                  {applicableForOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.applicableFor.includes(option.value)}
                        onChange={() => handleApplicableForChange(option.value)}
                        className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Eligibility Criteria</label>
                <textarea
                  name="eligibilityCriteria"
                  value={formData.eligibilityCriteria}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe the eligibility criteria..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Eligibility Points</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentEligibilityPoint}
                    onChange={(e) => setCurrentEligibilityPoint(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEligibilityPoint())}
                    placeholder="Add eligibility point and press Enter"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addEligibilityPoint}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.eligibilityPoints.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {formData.eligibilityPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 flex-1">{point}</span>
                        <button
                          type="button"
                          onClick={() => removeEligibilityPoint(point)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Documents Section */}
          {activeSection === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Documents Required</h3>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentDocument}
                    onChange={(e) => setCurrentDocument(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
                    placeholder="Add document and press Enter (e.g., Aadhar Card)"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addDocument}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.documentsRequired.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {formData.documentsRequired.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 flex-1">{doc}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Important Instructions</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentInstruction}
                    onChange={(e) => setCurrentInstruction(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstruction())}
                    placeholder="Add instruction and press Enter"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.importantInstructions.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {formData.importantInstructions.map((instr, index) => (
                      <li key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700 flex-1">{instr}</span>
                        <button
                          type="button"
                          onClick={() => removeInstruction(instr)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Links Section */}
          {activeSection === 'links' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Important Links</h3>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Official Website</label>
                  <input
                    type="url"
                    name="officialWebsite"
                    value={formData.officialWebsite}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Apply Online Link</label>
                  <input
                    type="url"
                    name="applyOnlineLink"
                    value={formData.applyOnlineLink}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Login Link</label>
                  <input
                    type="url"
                    name="loginLink"
                    value={formData.loginLink}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Status Check Link</label>
                  <input
                    type="url"
                    name="statusCheckLink"
                    value={formData.statusCheckLink}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Custom Links */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-700">Add Custom Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newLink.linkTitle}
                    onChange={(e) => setNewLink(prev => ({ ...prev, linkTitle: e.target.value }))}
                    placeholder="Link Title (e.g., Download Form)"
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="url"
                    value={newLink.linkUrl}
                    onChange={(e) => setNewLink(prev => ({ ...prev, linkUrl: e.target.value }))}
                    placeholder="Link URL"
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={newLink.linkCategory}
                    onChange={(e) => setNewLink(prev => ({ ...prev, linkCategory: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="apply">Apply</option>
                    <option value="login">Login</option>
                    <option value="status">Status</option>
                    <option value="download">Download</option>
                    <option value="notification">Notification</option>
                    <option value="correction">Correction</option>
                    <option value="payment">Payment</option>
                    <option value="verification">Verification</option>
                    <option value="official">Official</option>
                    <option value="helpdesk">Helpdesk</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newLink.isForIndianCitizen}
                        onChange={(e) => setNewLink(prev => ({ ...prev, isForIndianCitizen: e.target.checked }))}
                        className="w-4 h-4 rounded text-green-600"
                      />
                      <span className="text-sm">For Indian</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newLink.isForForeignCitizen}
                        onChange={(e) => setNewLink(prev => ({ ...prev, isForForeignCitizen: e.target.checked }))}
                        className="w-4 h-4 rounded text-green-600"
                      />
                      <span className="text-sm">For Foreign</span>
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addImportantLink}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>

              {/* Added Links */}
              {formData.importantLinks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Added Links</h4>
                  <div className="space-y-2">
                    {formData.importantLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <LinkIcon className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">{link.linkTitle}</span>
                          <span className="text-sm text-gray-500 ml-2">({link.linkCategory})</span>
                          <p className="text-sm text-blue-600 truncate">{link.linkUrl}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImportantLink(index)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Files Section */}
          {activeSection === 'files' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">File Uploads</h3>
              <p className="text-sm text-gray-500">Files upload immediately when selected</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(fileTypeLabels).map((fieldName) => {
                  const fileStatus = getFileStatus(fieldName);
                  const isUploading = isFileUploading(fieldName);
                  const isUploaded = fileStatus === 'uploaded';

                  return (
                    <div key={fieldName} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {fileTypeLabels[fieldName]}
                        {isUploading && (
                          <span className="ml-2 text-xs text-blue-600">
                            <Loader2 className="inline w-3 h-3 animate-spin mr-1" />
                            Uploading...
                          </span>
                        )}
                        {isUploaded && <Check className="inline w-4 h-4 text-green-500 ml-1" />}
                      </label>

                      {hasFile(fieldName) ? (
                        <div className={`p-4 rounded-lg border-2 ${
                          isUploading ? 'border-blue-300 bg-blue-50' : isUploaded ? 'border-green-200 bg-white' : 'border-yellow-200 bg-yellow-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <File className={`w-5 h-5 flex-shrink-0 ${isUploading ? 'text-blue-500' : isUploaded ? 'text-green-500' : 'text-yellow-500'}`} />
                              <span className="text-sm text-gray-700 truncate">{getDisplayFileName(fieldName)}</span>
                              {isUploaded && (
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">Uploaded</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(fieldName)}
                              disabled={isUploading}
                              className="ml-2 p-1 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                          {isUploaded && uploadedFileData[fieldName]?.fileUrl && (
                            <a
                              href={uploadedFileData[fieldName].fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 text-xs text-blue-600 hover:underline block"
                            >
                              View uploaded file
                            </a>
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
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50"
                          >
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">Choose file</span>
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Contact & Help</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Helpline Number</label>
                  <input
                    type="text"
                    name="helplineNumber"
                    value={formData.helplineNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 1800-XXX-XXXX"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Help Email</label>
                  <input
                    type="email"
                    name="helpEmail"
                    value={formData.helpEmail}
                    onChange={handleInputChange}
                    placeholder="e.g., help@example.gov.in"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Help Address</label>
                <textarea
                  name="helpAddress"
                  value={formData.helpAddress}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Office address for help..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          {/* SEO Section */}
          {activeSection === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">SEO & Display Settings</h3>

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
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-green-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="SEO title (max 70 characters)"
                  maxLength={70}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="SEO description (max 160 characters)"
                  maxLength={160}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showInPortal"
                    name="showInPortal"
                    checked={formData.showInPortal}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="showInPortal" className="text-sm font-medium text-gray-700">
                    Show in Portal
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                    Featured Service
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Priority (0-100)</label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(`/${userRole}/government-services`)}
              disabled={isSubmitting || Object.values(uploadingFiles).some(v => v)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isSubmitting || Object.values(uploadingFiles).some(v => v)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditMode ? 'Update Service' : 'Create Service'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GovernmentServiceForm;
