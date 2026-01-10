import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnswerById } from '../../slice/answerSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Award,
  User
} from 'lucide-react';

const AnswerKeyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAnswer, loading, error } = useSelector(state => state.answers);

 

  useEffect(() => {
    if (id) {
      dispatch(fetchAnswerById(id));
    }
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Will Be Updated Here Soon';
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
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Answer Key Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
        <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/answer-keys')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Answer Keys
        </button>
      </div>
    );
  }

  if (!currentAnswer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Answer Key not found</p>
        <button
          onClick={() => navigate('/answer-keys')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Answer Keys
        </button>
      </div>
    );
  }

  const answer = currentAnswer;

  console.log(answer)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">

        {/* Page Title with Status */}
        <div className="text-center mb-6 relative">

          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
            {answer.examName || 'Answer Key'}
          </h1>
          {answer.postTypeDetails && (
            <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
              {answer.postTypeDetails}
            </h2>
          )}
        </div>

        {/* Answer Key Status Info */}
      

        {/* Description Section */}
        {answer?.referenceId?.description && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{answer?.referenceId?.description}</p>
          </div>
        )}

       
        {/* Advertisement Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
          <div>
            <span className="font-semibold text-black">Department:</span>
            <span className="ml-2 text-imp">{answer?.referenceId?.departmentName || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">Published Date:</span>
            <span className="ml-2 text-primary">{formatDate(answer?.referenceId?.publishDate)}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Help Contact No:</span>
            <span className="ml-2 text-imp">{answer?.referenceId?.helpCareNo || 'N/A'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">E-mail ID:</span>
            <span className="ml-2 text-primary">{answer?.referenceId?.helpEmailId || 'N/A'}</span>
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
                      {formatDate(answer?.referenceId?.importantDates?.startDate) || "Will Be Updated Here Soon"}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Registration Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(answer?.referenceId?.importantDates?.registrationLastDate)|| "Will Be Updated Here Soon"}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Fee Pay Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(answer?.referenceId?.importantDates?.feeLastDate) || "Will Be Updated Here Soon"}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Final Submit Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(answer?.referenceId?.importantDates?.finalLastDate) || "Will Be Updated Here Soon"}
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
                      ₹{answer?.referenceId?.categoryFees?.general || answer?.referenceId?.categoryFees?.obc || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">SC/ST Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{answer?.referenceId?.categoryFees?.sc || answer?.referenceId?.categoryFees?.st || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">PH Application Fee:</span>
                    <span className="ml-2 text-imp">
                      ₹{answer?.referenceId?.categoryFees?.ph || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Payment Mode:</span>
                    <span className="ml-2 text-imp">
                      {answer?.referenceId?.paymentMode || 'Online Only'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>


        {/* Selection Process from Reference */}
        {answer.referenceId?.selectionProcess && answer.referenceId.selectionProcess.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Selection Process
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {answer.referenceId.selectionProcess.map((process, index) => (
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
        {((answer.documentsRequired && answer.documentsRequired.length > 0) ||
          (answer.referenceId?.documentsRequired && answer.referenceId.documentsRequired.length > 0)) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Documents Required
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {(answer.documentsRequired?.length > 0 ? answer.documentsRequired : answer.referenceId?.documentsRequired || []).map((doc, index) => (
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
        {((answer.importantInstructions && answer.importantInstructions.length > 0) ||
          (answer.referenceId?.importantInstructions && answer.referenceId.importantInstructions.length > 0)) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Instructions
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {(answer.importantInstructions?.length > 0 ? answer.importantInstructions : answer.referenceId?.importantInstructions || []).map((instruction, index) => (
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
          Download the answer key and verify your responses. For official information, visit the official website.
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Answer Keys List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerKeyDetailPage;
