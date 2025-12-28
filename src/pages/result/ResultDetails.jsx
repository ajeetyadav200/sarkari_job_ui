import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResultById } from '../../slice/resultSlice';
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
  Globe,
  Award
} from 'lucide-react';

const ResultDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentResult, loading, error } = useSelector(state => state.results);

  useEffect(() => {
    if (id) {
      dispatch(fetchResultById(id));
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
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
        <p className="text-gray-600 text-lg">Loading Result Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <p className="text-red-600 text-lg font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/results')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>
      </div>
    );
  }

  if (!currentResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg">Result not found</p>
        <button
          onClick={() => navigate('/results')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>
      </div>
    );
  }

  const result = currentResult;
  const reference = result.referenceId || {};
  const referenceDates = reference.importantDates || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#d9534f' }}>
            {result.examName || result.postTypeDetails || reference.postName || 'Result'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            {result.linkMenuField || 'Result Details'}
          </h2>
          {result.resultType && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                <Award className="w-5 h-5" />
                {result.resultType}
              </span>
            </div>
          )}
        </div>

        {/* Description Section */}
        {result.description && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Description:
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{result.description}</p>
          </div>
        )}

        {/* Result Information Section */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <span className="font-semibold">Department:</span>
              <span className="ml-2" style={{ color: '#d9534f' }}>
                {reference.departmentName || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Clock className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <span className="font-semibold">Published:</span>
              <span className="ml-2" style={{ color: '#0066cc' }}>
                {formatDate(result.publishDate)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <span className="font-semibold">Help Contact:</span>
              <span className="ml-2" style={{ color: '#d9534f' }}>
                {reference.helpCareNo || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Mail className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <span className="font-semibold">Help Email:</span>
              <span className="ml-2" style={{ color: '#0066cc' }}>
                {reference.helpEmailId || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Important Dates & Category */}
        {(referenceDates.startDate || result.resultDate || result.category) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-400">

            {/* Left Column - Important Dates */}
            <div className="border-r border-gray-400">
              <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6" />
                Important Dates
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {referenceDates.startDate && (
                    <li className="flex items-start">
                      <span className="text-black mr-2">▪</span>
                      <div>
                        <span className="font-semibold">Application Start Date:</span>
                        <span className="ml-2" style={{ color: '#d9534f' }}>
                          {formatDate(referenceDates.startDate)}
                        </span>
                      </div>
                    </li>
                  )}
                  {referenceDates.registrationLastDate && (
                    <li className="flex items-start">
                      <span className="text-black mr-2">▪</span>
                      <div>
                        <span className="font-semibold">Registration Last Date:</span>
                        <span className="ml-2" style={{ color: '#d9534f' }}>
                          {formatDate(referenceDates.registrationLastDate)}
                        </span>
                      </div>
                    </li>
                  )}
                  {result.resultDate && (
                    <li className="flex items-start">
                      <span className="text-black mr-2">▪</span>
                      <div>
                        <span className="font-semibold">Result Date:</span>
                        <span className="ml-2" style={{ color: '#d9534f' }}>
                          {formatDate(result.resultDate)}
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Right Column - Category & Tags */}
            <div>
              <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
                <Info className="w-6 h-6" />
                Additional Information
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {result.category && (
                    <li className="flex items-start">
                      <span className="text-black mr-2">▪</span>
                      <div>
                        <span className="font-semibold">Category:</span>
                        <span className="ml-2" style={{ color: '#d9534f' }}>
                          {result.category}
                        </span>
                      </div>
                    </li>
                  )}
                  {result.tags && result.tags.length > 0 && (
                    <li className="flex items-start">
                      <span className="text-black mr-2">▪</span>
                      <div>
                        <span className="font-semibold">Tags:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Educational Qualification Section */}
        {(reference.eligibilityEducational1 || reference.eligibilityEducational2) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6" />
              Educational Qualification
            </div>
            <div className="p-4">
              {reference.eligibilityEducational1 && (
                <div className="mb-3">
                  <p className="text-gray-800 whitespace-pre-line">{reference.eligibilityEducational1}</p>
                </div>
              )}
              {reference.eligibilityEducational2 && (
                <div>
                  <p className="text-gray-800 whitespace-pre-line">{reference.eligibilityEducational2}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Important Instructions */}
        {result.importantInstructions && result.importantInstructions.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg">
              Important Instructions
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {result.importantInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <span className="font-semibold">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documents Required Section */}
        {result.documentsRequired && result.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg">
              Documents Required
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {result.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <span className="font-semibold">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* RESULT SECTION */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#d9534f' }}>
              Result Information
            </h2>
            <p className="text-gray-600 mt-2">Check your result from the links below</p>
          </div>

          <div className="border border-t-0 border-gray-400">
            <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg">
              Important Website Details
            </div>
            <div className="p-0">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                      Check Result 1
                    </td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={result.directWebURL || '#'}
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
                      Check Result 2:
                    </td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={reference.directWebURL || '#'}
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
                        href={reference.officialWebsite || '#'}
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
                        href={reference.notificationLink || '#'}
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
                        href={reference.applicationLink || '#'}
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
                        href={reference.officialWebsite || reference.notificationLink || '#'}
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

        {/* Result Status & Information */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg">
            Result Status
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-semibold">Result Status:</p>
                  <p className="text-gray-800 capitalize">{result.resultStatus || 'Active'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-semibold">Published On:</p>
                  <p className="text-gray-800">{formatDate(result.publishDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Instructions for Result */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-purple-700 text-white text-center py-3 px-4 font-bold text-lg">
            Important Instructions for Result
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-black mr-2">1.</span>
                <span>Download and save your result/scorecard for future reference.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">2.</span>
                <span>Verify all details carefully (Name, Roll Number, Marks, Grade).</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">3.</span>
                <span>In case of any discrepancy, contact the examination authority immediately.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">4.</span>
                <span>Keep multiple copies of your result for future applications.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">5.</span>
                <span>Check for any re-evaluation or supplementary exam notifications.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 border border-gray-300 rounded-lg bg-purple-50">
          <p className="text-gray-800 font-semibold">
            📌 Important: Download your result immediately and keep multiple copies for future use.
            Verify all details carefully. In case of any error, contact the helpline immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/results')}
            className="px-8 py-3 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: '#0066cc' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results List
          </button>

          {reference.officialWebsite && (
            <a
              href={reference.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2 text-center"
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

export default ResultDetails;
