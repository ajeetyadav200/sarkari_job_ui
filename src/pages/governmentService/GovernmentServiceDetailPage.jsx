import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceById } from '../../slice/governmentServiceSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  FileText,
  ExternalLink,
  Download,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

const GovernmentServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentService, loading, error } = useSelector(state => state.governmentServices);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Get service type label
  const getServiceTypeLabel = (type) => {
    const types = {
      scholarship: 'Scholarship',
      certificate: 'Certificate',
      registration: 'Registration',
      verification: 'Verification',
      governmentScheme: 'Government Scheme',
      documentService: 'Document Service',
      welfareScheme: 'Welfare Scheme',
      financialService: 'Financial Service',
      other: 'Other'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gradient-to-br from-white to-blue-100">
        <Loader2 className="w-12 h-12 lg:w-10 lg:h-10 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Service Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
        <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/government-services')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Services
        </button>
      </div>
    );
  }

  if (!currentService) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Service not found</p>
        <button
          onClick={() => navigate('/government-services')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Services
        </button>
      </div>
    );
  }

  const service = currentService;
  const dates = service.importantDates || {};

  // Check if application is open
  const isApplicationOpen = (() => {
    if (!dates.lastDate) return false;
    const now = new Date();
    const lastDate = new Date(dates.lastDate);
    return now <= lastDate;
  })();

  // Calculate remaining days
  const remainingDays = (() => {
    if (!dates.lastDate) return null;
    const endDate = new Date(dates.lastDate);
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">

        {/* Page Title with Application Status */}
        <div className="text-center mb-6 relative">
          <div className="absolute top-0 right-0">
            <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${isApplicationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isApplicationOpen ? 'Application Open' : 'Application Closed'}
              {remainingDays !== null && remainingDays > 0 && (
                <span className="ml-2">({remainingDays} days left)</span>
              )}
            </div>
          </div>

          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
            {service.serviceName || 'Government Service'}
          </h1>
          <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
            {service.departmentName || getServiceTypeLabel(service.serviceType)}
          </h2>
        </div>

        {/* Service Status Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Service Type</p>
              <p className="text-lg font-bold text-imp">{getServiceTypeLabel(service.serviceType)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <MapPin className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">State</p>
              <p className="text-lg font-bold text-imp">{service.state || 'All India'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Posted On</p>
              <p className="text-lg font-bold text-imp">{formatDate(service.createdAt) || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Short Description Section */}
        {service.shortDescription && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{service.shortDescription}</p>
          </div>
        )}

        {/* Advertisement Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
          <div>
            <span className="font-semibold text-black">Service Category:</span>
            <span className="ml-2 text-imp">{service.serviceCategory || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">Application Mode:</span>
            <span className="ml-2 text-primary">{service.applicationMode || 'Online'}</span>
          </div>
          {service.helplineNumber && (
            <div>
              <span className="font-semibold text-black">Help Contact No:</span>
              <span className="ml-2 text-imp">{service.helplineNumber}</span>
            </div>
          )}
          {service.email && (
            <div className="md:text-right">
              <span className="font-semibold text-black">E-mail ID:</span>
              <span className="ml-2 text-primary">{service.email}</span>
            </div>
          )}
        </div>

        {/* Two Column Layout - Important Dates and Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-400">

          {/* Left Column - Important Dates */}
          <div className="md:border-r border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Dates
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Application Start Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(dates.startDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Application Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(dates.lastDate)}
                    </span>
                  </div>
                </li>
                {dates.feePaymentLastDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Fee Payment Last Date:</span>
                      <span className="ml-2 text-imp">
                        {formatDate(dates.feePaymentLastDate)}
                      </span>
                    </div>
                  </li>
                )}
                {dates.correctionStartDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Correction Start Date:</span>
                      <span className="ml-2 text-imp">
                        {formatDate(dates.correctionStartDate)}
                      </span>
                    </div>
                  </li>
                )}
                {dates.correctionEndDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Correction End Date:</span>
                      <span className="ml-2 text-imp">
                        {formatDate(dates.correctionEndDate)}
                      </span>
                    </div>
                  </li>
                )}
                {dates.resultDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Result Date:</span>
                      <span className="ml-2 text-imp">
                        {formatDate(dates.resultDate)}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column - Application Fee Details */}
          <div>
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Application Fee Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              {service.isFree ? (
                <div className="text-center py-4">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold">
                    FREE SERVICE - No Fee Required
                  </span>
                </div>
              ) : (
                <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                  {service.categoryFees?.map((fee, index) => (
                    <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                      <span className="text-black mr-1">▪</span>
                      <div>
                        <span className="font-semibold text-black">{fee.category} Fee:</span>
                        <span className="ml-2 text-imp">
                          ₹{fee.amount}
                        </span>
                      </div>
                    </li>
                  ))}
                  {(!service.categoryFees || service.categoryFees.length === 0) && (
                    <li className="text-gray-500 text-sm">Fee details not available</li>
                  )}
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Payment Mode:</span>
                      <span className="ml-2 text-imp">
                        {service.paymentMode || 'Online'}
                      </span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Eligibility Section */}
        {service.eligibilityPoints && service.eligibilityPoints.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Eligibility Criteria
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {service.eligibilityPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Applicable For Section */}
        {service.applicableFor && service.applicableFor.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Applicable For
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="flex flex-wrap gap-2">
                {service.applicableFor.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents Required */}
        {service.documentsRequired && service.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Documents Required
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {service.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Scholarship Details */}
        {service.serviceType === 'scholarship' && service.scholarshipDetails && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Scholarship Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.scholarshipDetails.scholarshipAmount && (
                  <div>
                    <span className="font-semibold text-black">Scholarship Amount:</span>
                    <span className="ml-2 text-imp">₹{service.scholarshipDetails.scholarshipAmount}</span>
                  </div>
                )}
                {service.scholarshipDetails.renewalPolicy && (
                  <div>
                    <span className="font-semibold text-black">Renewal Policy:</span>
                    <span className="ml-2 text-imp">{service.scholarshipDetails.renewalPolicy}</span>
                  </div>
                )}
                {service.scholarshipDetails.incomeLimit && (
                  <div>
                    <span className="font-semibold text-black">Income Limit:</span>
                    <span className="ml-2 text-imp">₹{service.scholarshipDetails.incomeLimit}</span>
                  </div>
                )}
                {service.scholarshipDetails.academicYear && (
                  <div>
                    <span className="font-semibold text-black">Academic Year:</span>
                    <span className="ml-2 text-imp">{service.scholarshipDetails.academicYear}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Certificate Details */}
        {service.serviceType === 'certificate' && service.certificateDetails && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Certificate Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.certificateDetails.certificateType && (
                  <div>
                    <span className="font-semibold text-black">Certificate Type:</span>
                    <span className="ml-2 text-imp">{service.certificateDetails.certificateType}</span>
                  </div>
                )}
                {service.certificateDetails.validityPeriod && (
                  <div>
                    <span className="font-semibold text-black">Validity Period:</span>
                    <span className="ml-2 text-imp">{service.certificateDetails.validityPeriod}</span>
                  </div>
                )}
                {service.certificateDetails.processingTime && (
                  <div>
                    <span className="font-semibold text-black">Processing Time:</span>
                    <span className="ml-2 text-imp">{service.certificateDetails.processingTime}</span>
                  </div>
                )}
                {service.certificateDetails.issuingAuthority && (
                  <div>
                    <span className="font-semibold text-black">Issuing Authority:</span>
                    <span className="ml-2 text-imp">{service.certificateDetails.issuingAuthority}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Important Instructions */}
        {service.instructions && service.instructions.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Instructions
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {service.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Important Website Details */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
            Important Links
          </div>
          <div className="p-0">
            <table className="w-full">
              <tbody>
                {service.importantLinks?.map((link, index) => (
                  <tr key={index} className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      {link.label || link.category} :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs flex items-center justify-center gap-1"
                      >
                        Click Here <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
                {service.officialWebsite && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Official Website :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={service.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs flex items-center justify-center gap-1"
                      >
                        Click Here <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                )}
                {service.applyLink && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Apply Online :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={service.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs flex items-center justify-center gap-1"
                      >
                        Click Here <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Uploaded Files/Downloads */}
        {service.uploadedFiles && service.uploadedFiles.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Download Documents
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.uploadedFiles.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-gray-800">{file.name || `Document ${index + 1}`}</p>
                      <p className="text-xs text-gray-500">{file.type || 'PDF'}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(service.helplineNumber || service.email || service.address) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Contact Information
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.helplineNumber && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Helpline Number</p>
                      <p className="font-semibold text-gray-800">{service.helplineNumber}</p>
                    </div>
                  </div>
                )}
                {service.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">{service.email}</p>
                    </div>
                  </div>
                )}
                {service.officialWebsite && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Website</p>
                      <a href={service.officialWebsite} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {service.address && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-semibold text-gray-800">{service.address}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Description */}
        {service.fullDescription && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Complete Information
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="prose max-w-none text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm lg:text-xs sm:text-[11px] font-semibold text-black">
          Interested Applicants Should Read All Information at Official Website Before Applying
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/government-services')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Services List
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernmentServiceDetailPage;
