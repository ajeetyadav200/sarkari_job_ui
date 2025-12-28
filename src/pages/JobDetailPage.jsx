import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../slice/jobSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentJob, loading, error } = useSelector(state => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
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
        <p className="text-gray-600 text-lg">Loading Job Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <p className="text-red-600 text-lg font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/job-alerts')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg">Job not found</p>
        <button
          onClick={() => navigate('/job-alerts')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>
      </div>
    );
  }

  const job = currentJob;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Page Title - Matching Image */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#d9534f' }}>
            {job.departmentName || 'Maharashtra Public Service Commission Recruitment 2017'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            {job.postName || 'Maharashtra Psc Clerk-typist (marathi-english), Group-c Preliminary Examination-2017'}
          </h2>
        </div>

        {/* Description Section - Above all other sections */}
        {job.description && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
        )}

        {/* Advertisement Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="font-semibold">Advertise No:</span>
            <span className="ml-2" style={{ color: '#d9534f' }}>{job.advertiseNo || '05/2017'}</span>
          </div>
          <div className="text-right">
            <span className="font-semibold">Advertise Date:</span>
            <span className="ml-2" style={{ color: '#0066cc' }}>{formatDate(job.advertisementDate) || '06-04-2017'}</span>
          </div>
          <div>
            <span className="font-semibold">Help Contact No:</span>
            <span className="ml-2" style={{ color: '#d9534f' }}>{job.helpCareNo || '022-61316402'}</span>
          </div>
          <div className="text-right">
            <span className="font-semibold">E-mail ID:</span>
            <span className="ml-2" style={{ color: '#0066cc' }}>{job.helpEmailId || 'mpsc.support@mahaonline.gov.in'}</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-0 border border-gray-400">
          
          {/* Left Column - Important Dates */}
          <div className="border-r border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Important Dates
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Application Start Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(job.importantDates?.startDate) || '06-04-2017'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Registration Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(job.importantDates?.registrationLastDate) || '26-04-2017'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Fee Pay Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(job.importantDates?.feeLastDate) || '26-04-2017'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Final Submit Last Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(job.importantDates?.finalLastDate) || '26-04-2017'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Exam Date:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {formatDate(job.importantDates?.examDate) || '11-06-2017'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Application Fee Details */}
          <div>
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Application Fee Details
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">General/OBC Application Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.general || job.categoryFees?.obc || '373'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">SC/ST Application Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.sc || job.categoryFees?.st || '273'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">PH Application Fee:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      ₹{job.categoryFees?.ph || '273'} & For EX-Service 23
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
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

        {/* Educational Qualification Section - In the middle */}
        {(job.eligibilityEducational1 || job.eligibilityEducational2) && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
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
        <div className="grid grid-cols-2 gap-0 border border-t-0 border-gray-400">
          
          {/* Left Column - Eligibility */}
          <div className="border-r border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Eligibility
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">
                      {job.educationQualification || 'Min 10/12th Passed.'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
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
              Age Limit as on <span style={{ color: '#d9534f' }}>{formatDate(job.importantDates?.ageOnDate) || '01-07-2017'}</span>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Minimum Age:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {job.importantDates?.minimumAge || '18'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Maximum Age:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {job.importantDates?.maximumAge || '38'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold">Age Relaxation:</span>
                    <span className="ml-2" style={{ color: '#d9534f' }}>
                      {job.importantDates?.ageRelaxation || 'As per Advertisement Rule'}
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
            <span style={{ color: '#d9534f' }}>Total Post: {job.totalPost || '408'}</span>
            {job.categoryPosts?.ph && (
              <span>, PH: {job.categoryPosts.ph}</span>
            )}
          </h2>
        </div>

        {/* Important Website Details */}
        <div className="border border-t-0 border-gray-400">
          <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
            Important Website Details
          </div>
          <div className="p-0">
            <table className="w-full">
              <tbody>
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

        {/* Additional Data from Response - Selection Process and Documents Required */}
        {job.selectionProcess && job.selectionProcess.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Selection Process
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {job.selectionProcess.map((process, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold">{process}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {job.documentsRequired && job.documentsRequired.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-green-700 text-white text-center py-3 px-4 font-bold text-lg">
              Documents Required
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {job.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-1">▪</span>
                    <span className="font-semibold">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm font-semibold text-gray-800">
          Interested Applicant Can Read every Information at Official Website before Apply Online
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/job-alerts')}
            className="px-8 py-3 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            style={{ backgroundColor: '#0066cc' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs List
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;