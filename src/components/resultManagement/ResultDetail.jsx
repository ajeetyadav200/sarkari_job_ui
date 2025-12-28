// components/ResultManagement/ResultDetail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchResultById, deleteResult } from '../../slice/resultSlice';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Award,
  Calendar,
  User,
  Tag,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  List,
  ClipboardCheck,
  Loader2,
  Download,
  Globe,
  Info,
  Clock,
  Phone,
  Mail,
  CreditCard,
  BookOpen
} from 'lucide-react';

const ResultDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { currentResult, loading, error } = useSelector(state => state?.results);
  const user = useSelector(store => store?.user);

  useEffect(() => {
    dispatch(fetchResultById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      await dispatch(deleteResult(id));
      toast.success('Result deleted successfully');
      navigate(-1);
    }
  };

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

  const getResultTypeIcon = (type) => {
    const icons = {
      'Final': Award,
      'Provisional': FileText,
      'MeritList': List,
      'CutOff': ClipboardCheck,
      'AnswerKey': CheckCircle,
      'ScoreCard': FileText,
      'Other': FileText
    };
    return icons[type] || FileText;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>
      </div>
    );
  }

  const result = currentResult;
  const job = result.referenceId || {};
  const jobDates = job.importantDates || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#d9534f' }}>
            {result.postTypeDetails || result.examName || 'Result'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            {result.resultType ? `${result.resultType} Result` : 'Result Details'}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              result.status === 'verified' ? 'bg-green-100 text-green-800' :
              result.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              result.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {result.status.toUpperCase()}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              result.resultStatus === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {result.resultStatus.toUpperCase()}
            </span>
          </div>
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
                {formatDate(result.publishDate)}
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

        {/* Two Column Layout - Important Dates */}
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
                    <span className="font-semibold">Result Published Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(result.publishDate)}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Result Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(result.resultDate)}
                    </span>
                  </div>
                </li>
                {jobDates.examDate && (
                  <li className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <div>
                      <span className="font-semibold">Exam Date:</span>
                      <span className="ml-2" style={{ color: '#d9534f' }}>
                        {formatDate(jobDates.examDate)}
                      </span>
                    </div>
                  </li>
                )}
                {jobDates.answerKeyDate && (
                  <li className="flex items-start">
                    <span className="text-black mr-2">▪</span>
                    <div>
                      <span className="font-semibold">Answer Key Date:</span>
                      <span className="ml-2" style={{ color: '#d9534f' }}>
                        {formatDate(jobDates.answerKeyDate)}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column - Result Details */}
          <div>
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <Award className="w-6 h-6" />
              Result Details
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Result Type:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {result.resultType || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Exam Name:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {result.examName || 'N/A'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Category:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {result.category || 'All Categories'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">▪</span>
                  <div>
                    <span className="font-semibold">Status:</span>
                    <span className="ml-2 capitalize" style={{ color: '#d9534f' }}>
                      {result.resultStatus || 'active'}
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

        {/* Application Fee Details */}
        {job.categoryFees && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6" />
              Application Fee Details
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {job.categoryFees.general > 0 && (
                  <div>
                    <span className="font-semibold">General/OBC:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees.general}
                    </span>
                  </div>
                )}
                {job.categoryFees.obc > 0 && (
                  <div>
                    <span className="font-semibold">OBC:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees.obc}
                    </span>
                  </div>
                )}
                {job.categoryFees.sc > 0 && (
                  <div>
                    <span className="font-semibold">SC:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees.sc}
                    </span>
                  </div>
                )}
                {job.categoryFees.st > 0 && (
                  <div>
                    <span className="font-semibold">ST:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees.st}
                    </span>
                  </div>
                )}
                {job.categoryFees.ews > 0 && (
                  <div>
                    <span className="font-semibold">EWS:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees.ews}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-semibold">Payment Mode:</span>
                  <span className="ml-2" style={{ color: '#d9534f' }}>
                    {job.paymentMode || 'Online Only'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Total Post Section */}
        {job.totalPost && (
          <div className="text-center py-4 border border-t-0 border-gray-400">
            <h2 className="text-2xl font-bold">
              <span style={{ color: '#d9534f' }}>Total Post: {job.totalPost || 'N/A'}</span>
              {job.categoryPosts?.ph > 0 && (
                <span>, PH: {job.categoryPosts.ph}</span>
              )}
            </h2>
          </div>
        )}

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

        {/* RESULT SECTION */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#d9534f' }}>
              Result Information
            </h2>
            <p className="text-gray-600 mt-2">Check your result from the links below</p>
          </div>

          <div className="border border-t-0 border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Important Website Details
            </div>
            <div className="p-0">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-3 px-4 font-semibold text-center" style={{ color: '#d9534f' }}>
                      Direct Result Link 1
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
                      Direct Result Link 2
                    </td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={result.linkMenuField || '#'}
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
                      Official Website
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
                      Advertisement
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
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Result Status & Information */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
            Result Status
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Result Status:</p>
                  <p className="text-gray-800 capitalize">{result.resultStatus || 'Active'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Published On:</p>
                  <p className="text-gray-800">{formatDate(result.publishDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Verification Status:</p>
                  <p className="text-gray-800 capitalize">{result.status || 'verified'}</p>
                </div>
              </div>
              {result.verifiedAt && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold">Verified On:</p>
                    <p className="text-gray-800">{formatDate(result.verifiedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important Instructions for Result */}
        {result.importantInstructions && result.importantInstructions.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Important Instructions for Result
            </div>
            <div className="p-4">
              <ul className="space-y-3 text-gray-700">
                {result.importantInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documents Required */}
        {result.documentsRequired && result.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
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

        {/* Tags Section */}
        {result.tags && result.tags.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Tags
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 border border-gray-300 rounded-lg bg-blue-50">
          <p className="text-gray-800 font-semibold">
            📌 Important: Check your result carefully. In case of any discrepancy or issues with the result, 
            contact the concerned authority immediately through the provided helpline numbers or email.
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
          
          {/* Admin Actions */}
          {(user.role === 'admin' || result.createdBy?._id === user._id) && (
            <div className="flex gap-2">
              <Link
                to={`/results/${id}/edit`}
                className="px-8 py-3 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Result
              </Link>
              <button
                onClick={handleDelete}
                className="px-8 py-3 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Created By Information */}
        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-semibold">Created By:</p>
                <p className="text-gray-800">
                  {result.createdByDetails?.name || result.createdByDetails?.email || 'N/A'}
                </p>
                {result.createdByDetails?.role && (
                  <p className="text-sm text-gray-600">Role: {result.createdByDetails.role}</p>
                )}
              </div>
            </div>
            {result.verifiedByDetails && (
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold">Verified By:</p>
                  <p className="text-gray-800">
                    {result.verifiedByDetails?.name || result.verifiedByDetails?.email || 'N/A'}
                  </p>
                  {result.verifiedByDetails?.role && (
                    <p className="text-sm text-gray-600">Role: {result.verifiedByDetails.role}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;