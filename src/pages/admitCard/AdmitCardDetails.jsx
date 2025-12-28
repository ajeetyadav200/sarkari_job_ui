import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmitCardById } from '../../slice/admitCardSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Info,
  Clock,
  User,
  BookOpen,
  CreditCard,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

const AdmitCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAdmitCard, loading, error } = useSelector(state => state.admitCards);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdmitCardById(id));
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-gray-600 text-lg">Loading Admit Card Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <p className="text-red-600 text-lg font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/admit-cards')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Admit Cards
        </button>
      </div>
    );
  }

  if (!currentAdmitCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg">Admit Card not found</p>
        <button
          onClick={() => navigate('/admit-cards')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Admit Cards
        </button>
      </div>
    );
  }

  const card = currentAdmitCard;
  const job = card.referenceId || {};
  const jobDates = job.importantDates || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#d9534f' }}>
            {card.postTypeDetails || job.postName || 'Admit Card'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            {card.linkMenuField ? 'Admit Card Download' : job.departmentName || 'Download Admit Card'}
          </h2>
        </div>

        {/* Job Description Section */}
        {job.description && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Job Description:
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
        )}

        {/* Job Information Section */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <span className="font-semibold">Department:</span>
              <span className="ml-2" style={{ color: '#d9534f' }}>
                {job.departmentName || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Clock className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <span className="font-semibold">Published:</span>
              <span className="ml-2" style={{ color: '#0066cc' }}>
                {formatDate(card.publishDate)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <span className="font-semibold">Help Contact:</span>
              <span className="ml-2" style={{ color: '#d9534f' }}>
                {job.helpCareNo || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Mail className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <span className="font-semibold">Help Email:</span>
              <span className="ml-2" style={{ color: '#0066cc' }}>
                {job.helpEmailId || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-400">
          
          {/* Left Column - Important Dates */}
          <div className="border-r border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6" />
              Important Dates
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Application Start Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(jobDates.startDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Registration Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(jobDates.registrationLastDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Fee Pay Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(jobDates.feeLastDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Final Submit Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(jobDates.finalLastDate)}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Application Fee Details */}
          <div>
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6" />
              Application Fee Details
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">General/OBC Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.general || job.categoryFees?.obc || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">SC/ST Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.sc || job.categoryFees?.st || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">EWS/PH Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.ews || job.categoryFees?.ph || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Payment Mode:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {job.paymentMode || 'Online Only'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Qualification Section */}
        {(job.eligibilityEducational1 || job.eligibilityEducational2) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6" />
              Educational Qualification
            </div>
            <div className="p-4">
              {job.eligibilityEducational1 && (
                <div className="mb-3">
                  <p className="text-gray-800 whitespace-pre-line">{job.eligibilityEducational1}</p>
                </div>
              )}
              {job.eligibilityEducational2 && (
                <div>
                  <p className="text-gray-800 whitespace-pre-line">{job.eligibilityEducational2}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Two Column Layout - Eligibility and Age Limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-t-0 border-gray-400">
          
          {/* Left Column - Eligibility */}
          <div className="border-r border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Eligibility
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">
                      {job.educationQualification || 'Min 10/12th Passed.'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Please see Post wise Qualification</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Age Limit */}
          <div>
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Age Limit as on <span style={{ color: '#d9534f' }}>{formatDate(jobDates.ageOnDate) || 'N/A'}</span>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Minimum Age:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {jobDates.minimumAge || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Maximum Age:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {jobDates.maximumAge || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Age Relaxation:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {jobDates.ageRelaxation || 'As per Advertisement Rule'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Total Post Section */}
        <div className="text-center py-4 border border-t-0 border-gray-400">
          <h2 className="text-2xl font-bold">
            <span style={{ color: '#d9534f' }}>Total Post: {job.totalPost || 'N/A'}</span>
            {job.categoryPosts?.ph > 0 && (
              <span>, PH: {job.categoryPosts.ph}</span>
            )}
          </h2>
        </div>

        {/* Selection Process Section */}
        {job.selectionProcess && job.selectionProcess.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Selection Process
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {job.selectionProcess.map((process, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <span className="font-semibold">{process}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documents Required Section */}
        {job.documentsRequired && job.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Documents Required
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {job.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <span className="font-semibold">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ADMIT CARD SECTION */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#d9534f' }}>
              Admit Card Information
            </h2>
            <p className="text-gray-600 mt-2">Download your admit card from the links below</p>
          </div>

          {/* Admit Card Download Links */}
          {/* <div className="border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Download Admit Card
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Direct Web URL Link */}
                {/* {card.directWebURL && (
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <Download className="w-12 h-12 text-green-600 mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Direct Download Link</h3>
                    </div>
                    <a
                      href={card.directWebURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-6 h-6" />
                      CLICK HERE TO DOWNLOAD ADMIT CARD
                    </a>
                    <p className="text-gray-600 text-sm mt-3 max-w-md">
                      Official admit card download portal. Click the button above to download your hall ticket.
                    </p>
                  </div>
                )} */}

                {/* Link Menu Field (Alternative Link) */}
                {/* {card.linkMenuField && card.linkMenuField.startsWith('http') && (
                  <div className="flex flex-col items-center text-center pt-6 border-t border-gray-300">
                    <div className="mb-4">
                      <ExternalLink className="w-12 h-12 text-green-600 mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Alternative Download Link</h3>
                    </div>
                    <a
                      href={card.linkMenuField}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors text-lg shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-6 h-6" />
                      ALTERNATIVE DOWNLOAD LINK
                    </a>
                    <p className="text-gray-600 text-sm mt-3 max-w-md">
                      If the main link doesn't work, try this alternative link to download your admit card.
                    </p>
                  </div>
                )} */}

                {/* Official Website Link */}
                {/* {job.officialWebsite && (
                  <div className="flex flex-col items-center text-center pt-6 border-t border-gray-300">
                    <div className="mb-4">
                      <Globe className="w-12 h-12 text-blue-600 mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Official Website</h3>
                    </div>
                    <a
                      href={job.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors text-lg shadow-lg hover:shadow-xl"
                    >
                      <Globe className="w-6 h-6" />
                      VISIT OFFICIAL WEBSITE
                    </a>
                    <p className="text-gray-600 text-sm mt-3 max-w-md">
                      Visit the official website for more information and updates.
                    </p>
                  </div>
                )} */}
              {/* </div>
            </div>
          </div> */} 

          <div className="border border-t-0 border-gray-400">
          <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
            Important Website Details
          </div>
          <div className="p-0">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                      Download Admit Card 1
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.directWebURL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                     Download Admit Card 2:
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.linkMenuField || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>

                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                    Official Website :
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.officialWebsite || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                    Advertisement :
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.notificationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                    Registration :
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.applicationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                    HOW TO APPLY :
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={job.officialWebsite || job.notificationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: '#0066cc' }}
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>

        {/* Admit Card Status & Information */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
            Admit Card Status
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Admit Card Status:</p>
                  <p className="text-gray-800 capitalize">{card.admitCardStatus || 'Active'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Published On:</p>
                  <p className="text-gray-800">{formatDate(card.publishDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Instructions for Admit Card */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
            Important Instructions for Admit Card
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-black mr-2">1.</span>
                <span>Download and print 2-3 copies of your admit card.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">2.</span>
                <span>Check all details on admit card carefully (Name, Photo, Date of Birth, Exam Date, Time, Venue).</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">3.</span>
                <span>Carry original photo ID proof along with admit card to exam center.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">4.</span>
                <span>Report to exam center at least 1 hour before the scheduled time.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">5.</span>
                <span>Follow all COVID-19 guidelines if applicable.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 border border-gray-300 rounded-lg bg-blue-50">
          <p className="text-gray-800 font-semibold">
            📌 Important: Download your admit card well before the exam date and keep multiple copies.
            Read all instructions carefully before appearing for the exam.
            In case of any discrepancy, contact the helpline immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/admit-cards')}
            className="px-8 py-3 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: '#0066cc' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Admit Cards List
          </button>
          
          {job.officialWebsite && (
            <a
              href={job.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2 text-center"
            >
              <Globe className="w-5 h-5" />
              Visit Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmitCardDetails;