import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmitCardById } from '../../slice/admitCardSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle
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
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gradient-to-br from-white to-blue-100">
        <Loader2 className="w-12 h-12 lg:w-10 lg:h-10 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Admit Card Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
        <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/admit-cards')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Admit Cards
        </button>
      </div>
    );
  }

  if (!currentAdmitCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Admit Card not found</p>
        <button
          onClick={() => navigate('/admit-cards')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Admit Cards
        </button>
      </div>
    );
  }

  const card = currentAdmitCard;
  const job = card.referenceId || {};
  const jobDates = job.importantDates || {};

  return (
   <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
            {card.postTypeDetails || job.departmentName || 'Admit Card'}
          </h1>
          <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
            {card.linkMenuField || job.postName || 'Download Admit Card'}
          </h2>
        </div>

        {/* Description Section */}
        {job.description && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{job.description}</p>
          </div>
        )}

        {/* Advertisement Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
          <div>
            <span className="font-semibold text-black">Department:</span>
            <span className="ml-2 text-imp">{job.departmentName || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">Published Date:</span>
            <span className="ml-2 text-primary">{formatDate(card.publishDate)}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Help Contact No:</span>
            <span className="ml-2 text-imp">{job.helpCareNo || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">E-mail ID:</span>
            <span className="ml-2 text-primary">{job.helpEmailId || 'N/A'}</span>
          </div>
        </div>

        {/* Two Column Layout */}
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
                      {formatDate(jobDates?.startDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Registration Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(jobDates?.registrationLastDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Fee Pay Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(jobDates?.feeLastDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Final Submit Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(jobDates?.finalLastDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Exam Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(jobDates?.examDate)}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Application Fee Details */}
          <div>
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Application Fee Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">General/OBC Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{job.categoryFees?.general || job.categoryFees?.obc || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">SC/ST Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{job.categoryFees?.sc || job.categoryFees?.st || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">PH Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{job.categoryFees?.ph || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Payment Mode:</span>
                    <span className="ml-2 text-imp">
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
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Educational Qualification
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              {job.eligibilityEducational1 && (
                <div className="mb-3 text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
                  <p>{job.eligibilityEducational1}</p>
                </div>
              )}
              {job.eligibilityEducational2 && (
                <div className="text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
                  <p>{job.eligibilityEducational2}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Two Column Layout - Eligibility and Age Limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-t-0 border-gray-400">

          {/* Left Column - Eligibility */}
          <div className="md:border-r border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Eligibility
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">
                      {job.educationQualification || 'Min 10/12th Passed.'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Please see Post wise Qualification</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Age Limit */}
          <div>
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Age Limit as on <span className="text-imp">{formatDate(jobDates?.ageOnDate)}</span>
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Minimum Age:</span>
                    <span className="ml-2 text-imp">
                      {jobDates?.minimumAge || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Maximum Age:</span>
                    <span className="ml-2 text-imp">
                      {jobDates?.maximumAge || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Age Relaxation:</span>
                    <span className="ml-2 text-imp">
                      {jobDates?.ageRelaxation || 'As per Advertisement Rule'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Total Post Section */}
        <div className="text-center py-4 border border-t-0 border-gray-400">
          <h2 className="text-2xl lg:text-xl sm:text-lg font-bold">
            <span className="text-imp">Total Post: {job.totalPost || 'N/A'}</span>
            {job.categoryPosts?.ph && (
              <span className="text-black">, PH: {job.categoryPosts.ph}</span>
            )}
          </h2>
        </div>

        {/* Important Website Details */}
        <div className="border border-t-0 border-gray-400">
          <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
            Important Website Details
          </div>
          <div className="p-0">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Download Admit Card 1 :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={card.directWebURL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Download Admit Card 2 :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={card.linkMenuField || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Official Website :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={job.officialWebsite || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Advertisement :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={job.notificationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Registration :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={job.applicationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    HOW TO APPLY :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={job.officialWebsite || job.notificationLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                    >
                      Click Here
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Selection Process */}
        {job.selectionProcess && job.selectionProcess.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Selection Process
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {job.selectionProcess.map((process, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{process}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documents Required */}
        {job.documentsRequired && job.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Documents Required
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {job.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm lg:text-xs sm:text-[11px] font-semibold text-black">
          Interested Applicant Can Read every Information at Official Website before Apply Online
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Admit Cards List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardDetails;
