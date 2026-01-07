import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmissionById } from '../../slice/admissionSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';

const AdmissionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAdmission, loading, error } = useSelector(state => state.admissions);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdmissionById(id));
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
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Admission Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
        <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/admissions')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Admissions
        </button>
      </div>
    );
  }

  if (!currentAdmission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Admission not found</p>
        <button
          onClick={() => navigate('/admissions')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Admissions
        </button>
      </div>
    );
  }

  const admission = currentAdmission;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
            {admission.departmentName || 'Admission Notification'}
          </h1>
          <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
            {admission.title || admission.postName || 'Admission Details'}
          </h2>
        </div>

        {/* Description Section */}
        {admission.description && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{admission.description}</p>
          </div>
        )}

        {/* Admission Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
          <div>
            <span className="font-semibold text-black">Application Mode:</span>
            <span className="ml-2 text-imp">{admission.modeOfApplication || 'Online'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">Category:</span>
            <span className="ml-2 text-primary capitalize">{admission.category?.replace(/-/g, ' ') || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Help Contact No:</span>
            <span className="ml-2 text-imp">{admission.helpCareNo || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">E-mail ID:</span>
            <span className="ml-2 text-primary">{admission.helpEmailId || 'N/A'}</span>
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
                      {formatDate(admission.importantDates?.applicationStartDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Application End Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.applicationEndDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Fee Payment Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.lastDateForFeePayment)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Correction Start Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.correctionStartDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Correction End Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.correctionEndDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Admit Card Release:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.admitCardReleaseDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Exam Start Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.examStartDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Result Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(admission.importantDates?.resultDate)}
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
                    <span className="font-semibold text-black">General Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{admission.applicationFee?.general || '0'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">OBC Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{admission.applicationFee?.obc || '0'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">SC/ST Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{admission.applicationFee?.sc || admission.applicationFee?.st || '0'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">EWS Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{admission.applicationFee?.ews || '0'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">PH/PWD Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{admission.applicationFee?.ph || '0'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Qualification Section */}
        {admission.eligibilityEducational && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Educational Qualification
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
                <p>{admission.eligibilityEducational}</p>
              </div>
            </div>
          </div>
        )}

        {/* Age Limit Section */}
        {(admission.ageLimit?.minimumAge || admission.ageLimit?.maximumAge) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Age Limit {admission.ageLimit?.ageCalculationDate && `as on ${formatDate(admission.ageLimit.ageCalculationDate)}`}
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {admission.ageLimit?.minimumAge && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Minimum Age:</span>
                      <span className="ml-2 text-imp">
                        {admission.ageLimit.minimumAge} Years
                      </span>
                    </div>
                  </li>
                )}
                {admission.ageLimit?.maximumAge && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Maximum Age:</span>
                      <span className="ml-2 text-imp">
                        {admission.ageLimit.maximumAge} Years
                      </span>
                    </div>
                  </li>
                )}
                {admission.ageLimit?.relaxation && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Age Relaxation:</span>
                      <span className="ml-2 text-imp">
                        {admission.ageLimit.relaxation}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Total Seats Section with Category Breakdown */}
        {admission.totalSeats && (
          <div className="border border-t-0 border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Total Seats Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="text-center mb-3">
                <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-imp">
                  Total Seats: {admission.totalSeats}
                </h2>
              </div>

              {admission.categorySeats && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.general || '0'}</div>
                    <div className="text-sm font-semibold text-black">General</div>
                  </div>
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.obc || '0'}</div>
                    <div className="text-sm font-semibold text-black">OBC</div>
                  </div>
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.sc || '0'}</div>
                    <div className="text-sm font-semibold text-black">SC</div>
                  </div>
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.st || '0'}</div>
                    <div className="text-sm font-semibold text-black">ST</div>
                  </div>
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.ews || '0'}</div>
                    <div className="text-sm font-semibold text-black">EWS</div>
                  </div>
                  <div className="text-center border border-gray-300 rounded p-2">
                    <div className="font-bold text-imp text-lg">{admission.categorySeats.ph || '0'}</div>
                    <div className="text-sm font-semibold text-black">PH/PWD</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
                    Official Website :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={admission.officialWebsite || '#'}
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
                      href={admission.officialWebsite || '#'}
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
                      href={admission.officialWebsite || '#'}
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
                      href={admission.officialWebsite || '#'}
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

        {/* Selection Mode */}
        {admission.selectionMode && admission.selectionMode.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Selection Mode/Process
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {admission.selectionMode.map((mode, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{mode}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documents Required */}
        {admission.documentsRequired && admission.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Documents Required
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {admission.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Important Instructions */}
        {admission.importantInstructions && admission.importantInstructions.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Instructions
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {admission.importantInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold text-black">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm lg:text-xs sm:text-[11px] font-semibold text-black">
          Interested Applicants Can Read Every Information at Official Website Before Apply Online
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admissions')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Admissions List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetailPage;
