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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">

        {/* Page Title with Status */}
        <div className="text-center mb-6 relative">
          <div className="absolute top-0 right-0">
            <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              answer.status === 'verified' ? 'bg-green-100 text-green-800' :
              answer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {answer.status === 'verified' ? 'Verified' :
               answer.status === 'pending' ? 'Pending' :
               answer.status === 'rejected' ? 'Rejected' : 'On Hold'}
            </div>
          </div>

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
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Award className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Type</p>
              <p className="text-lg font-bold text-imp">{answer.type || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <FileText className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Answer Status</p>
              <p className="text-lg font-bold text-imp capitalize">{answer.answerStatus || 'Active'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Published On</p>
              <p className="text-lg font-bold text-imp">{formatDate(answer.publishDate) || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {answer.description && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{answer.description}</p>
          </div>
        )}

        {/* Link Information */}
        {(answer.linkMenuField || answer.directWebURL) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
            {answer.linkMenuField && (
              <div>
                <span className="font-semibold text-black">Link Menu Field:</span>
                <a
                  href={answer.linkMenuField}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:underline"
                >
                  Click Here
                </a>
              </div>
            )}
            {answer.directWebURL && (
              <div className="md:text-right">
                <span className="font-semibold text-black">Direct Web URL:</span>
                <a
                  href={answer.directWebURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:underline"
                >
                  Click Here
                </a>
              </div>
            )}
          </div>
        )}

        {/* Reference Information from Job/Admission/LatestNotice */}
        {answer.referenceId && (
          <div className="border border-gray-400 mb-4">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              {answer.referenceModel} Reference Information
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {answer.referenceId.departmentName && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Department Name:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.departmentName}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.postName && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Post Name:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.postName}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.title && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Title:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.title}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.totalPost && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Total Post:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.totalPost}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.modeOfForm && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Mode of Form:</span>
                      <span className="ml-2 text-imp capitalize">{answer.referenceId.modeOfForm}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.officialWebsite && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Official Website:</span>
                      <a
                        href={answer.referenceId.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-primary hover:underline"
                      >
                        Click Here
                      </a>
                    </div>
                  </li>
                )}
                {answer.referenceId.helpEmailId && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Help Email:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.helpEmailId}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.helpCareNo && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Help Contact No:</span>
                      <span className="ml-2 text-imp">{answer.referenceId.helpCareNo}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Important Dates from Reference */}
        {answer.referenceId?.importantDates && (
          <div className="border border-gray-400 border-t-0">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Dates
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {answer.referenceId.importantDates.startDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Application Start Date:</span>
                      <span className="ml-2 text-imp">{formatDate(answer.referenceId.importantDates.startDate)}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.importantDates.registrationLastDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Registration Last Date:</span>
                      <span className="ml-2 text-imp">{formatDate(answer.referenceId.importantDates.registrationLastDate)}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.importantDates.examDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Exam Date:</span>
                      <span className="ml-2 text-imp">{formatDate(answer.referenceId.importantDates.examDate)}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.importantDates.answerKeyDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Answer Key Date:</span>
                      <span className="ml-2 text-imp">{formatDate(answer.referenceId.importantDates.answerKeyDate)}</span>
                    </div>
                  </li>
                )}
                {answer.referenceId.importantDates.resultDate && (
                  <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                    <span className="text-black mr-1">▪</span>
                    <div>
                      <span className="font-semibold text-black">Result Date:</span>
                      <span className="ml-2 text-imp">{formatDate(answer.referenceId.importantDates.resultDate)}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Download Files Section */}
        <div className="border border-gray-400 border-t-0">
          <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
            Download Answer Key Files
          </div>
          <div className="p-0">
            <table className="w-full">
              <tbody>
                {answer.officialNotification?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Official Notification :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.officialNotification.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs flex items-center justify-center gap-1"
                      >
                        Download <Download className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                )}
                {answer.examDateNotice?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Exam Date Notice :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.examDateNotice.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
                {answer.syllabusFile?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Syllabus File :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.syllabusFile.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
                {answer.admitCardFile?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Admit Card File :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.admitCardFile.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
                {answer.answerKeyFile?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Answer Key File :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.answerKeyFile.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
                {answer.resultFile?.fileUrl && (
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      Result File :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.resultFile.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
                {answer.otherFile?.fileUrl && (
                  <tr>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                      {answer.otherFile.fileName || 'Other File'} :
                    </td>
                    <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                      <a
                        href={answer.otherFile.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
