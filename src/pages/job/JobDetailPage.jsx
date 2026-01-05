// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchJobById } from '../../slice/jobSlice';
// import {
//   ArrowLeft,
//   Loader2,
//   AlertCircle
// } from 'lucide-react';

// const JobDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentJob, loading, error } = useSelector(state => state.jobs);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchJobById(id));
//     }
//   }, [dispatch, id]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}-${month}-${year}`;
//     } catch (error) {
//       return dateString;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center   gap-4 min-h-screen bg-gradient-to-br from-white to-blue-100">
//         <Loader2 className="w-12 h-12 lg:w-10 lg:h-10 sm:w-8 sm:h-8 animate-spin text-blue-600" />
//         <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Job Details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
//         <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
//         <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
//         <button
//           onClick={() => navigate('/job-alerts')}
//           className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
//         >
//           <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
//           Back to Jobs
//         </button>
//       </div>
//     );
//   }

//   if (!currentJob) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
//         <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Job not found</p>
//         <button
//           onClick={() => navigate('/job-alerts')}
//           className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
//         >
//           <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
//           Back to Jobs
//         </button>
//       </div>
//     );
//   }

//   const job = currentJob;

//   return (
//    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
//       {/* Main Content Container */}
//       <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">
        
//         {/* Page Title */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
//             {job.departmentName || 'Maharashtra Public Service Commission Recruitment 2017'}
//           </h1>
//           <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
//             {job.postName || 'Maharashtra Psc Clerk-typist (marathi-english), Group-c Preliminary Examination-2017'}
//           </h2>
//         </div>

//         {/* Description Section */}
//         {job.description && (
//           <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
//             <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-2 text-black">Description:</h3>
//             <p className="text-gray-700 whitespace-pre-line text-base lg:text-sm sm:text-xs">{job.description}</p>
//           </div>
//         )}

//         {/* Advertisement Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm lg:text-xs sm:text-[11px]">
//           <div>
//             <span className="font-semibold text-black">Advertise No:</span>
//             <span className="ml-2 text-imp">{job.advertiseNo || '05/2017'}</span>
//           </div>
//           <div className="md:text-right">
//             <span className="font-semibold text-black">Advertise Date:</span>
//             <span className="ml-2 text-primary">{formatDate(job.advertisementDate) || '06-04-2017'}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-black">Help Contact No:</span>
//             <span className="ml-2 text-imp">{job.helpCareNo || '022-61316402'}</span>
//           </div>
//           <div className="md:text-right">
//             <span className="font-semibold text-black">E-mail ID:</span>
//             <span className="ml-2 text-primary">{job.helpEmailId || 'mpsc.support@mahaonline.gov.in'}</span>
//           </div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-400">
          
//           {/* Left Column - Important Dates */}
//           <div className="md:border-r border-gray-400">
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Important Dates
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Application Start Date:</span>
//                     <span className="ml-2 text-imp">
//                       {formatDate(job.importantDates?.startDate) || '06-04-2017'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Registration Last Date:</span>
//                     <span className="ml-2 text-imp">
//                       {formatDate(job.importantDates?.registrationLastDate) || '26-04-2017'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Fee Pay Last Date:</span>
//                     <span className="ml-2 text-imp">
//                       {formatDate(job.importantDates?.feeLastDate) || '26-04-2017'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Final Submit Last Date:</span>
//                     <span className="ml-2 text-imp">
//                       {formatDate(job.importantDates?.finalLastDate) || '26-04-2017'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Exam Date:</span>
//                     <span className="ml-2 text-imp">
//                       {formatDate(job.importantDates?.examDate) || '11-06-2017'}
//                     </span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Column - Application Fee Details */}
//           <div>
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Application Fee Details
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">General/OBC Application Fee:</span>
//                     <span className="ml-2 text-imp">
//                       ₹{job.categoryFees?.general || job.categoryFees?.obc || '373'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">SC/ST Application Fee:</span>
//                     <span className="ml-2 text-imp">
//                       ₹{job.categoryFees?.sc || job.categoryFees?.st || '273'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">PH Application Fee:</span>
//                     <span className="ml-2 text-imp">
//                       ₹{job.categoryFees?.ph || '273'} & For EX-Service 23
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Payment Mode:</span>
//                     <span className="ml-2 text-imp">
//                       {job.paymentMode || 'Online Only'}
//                     </span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Educational Qualification Section */}
//         {(job.eligibilityEducational1 || job.eligibilityEducational2) && (
//           <div className="mt-4 border border-gray-400">
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Educational Qualification
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               {job.eligibilityEducational1 && (
//                 <div className="mb-3 text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
//                   <p>{job.eligibilityEducational1}</p>
//                 </div>
//               )}
//               {job.eligibilityEducational2 && (
//                 <div className="text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
//                   <p>{job.eligibilityEducational2}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Two Column Layout - Eligibility and Age Limit */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-t-0 border-gray-400">
          
//           {/* Left Column - Eligibility */}
//           <div className="md:border-r border-gray-400">
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Eligibility
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">
//                       {job.educationQualification || 'Min 10/12th Passed.'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Please see Post wise Qualification</span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Column - Age Limit */}
//           <div>
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Age Limit as on <span className="text-imp">{formatDate(job.importantDates?.ageOnDate) || '01-07-2017'}</span>
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Minimum Age:</span>
//                     <span className="ml-2 text-imp">
//                       {job.importantDates?.minimumAge || '18'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Maximum Age:</span>
//                     <span className="ml-2 text-imp">
//                       {job.importantDates?.maximumAge || '38'}
//                     </span>
//                   </div>
//                 </li>
//                 <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                   <span className="text-black mr-1">▪</span>
//                   <div>
//                     <span className="font-semibold text-black">Age Relaxation:</span>
//                     <span className="ml-2 text-imp">
//                       {job.importantDates?.ageRelaxation || 'As per Advertisement Rule'}
//                     </span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Total Post Section */}
//         <div className="text-center py-4 border border-t-0 border-gray-400">
//           <h2 className="text-2xl lg:text-xl sm:text-lg font-bold">
//             <span className="text-imp">Total Post: {job.totalPost || '408'}</span>
//             {job.categoryPosts?.ph && (
//               <span className="text-black">, PH: {job.categoryPosts.ph}</span>
//             )}
//           </h2>
//         </div>

//         {/* Important Website Details */}
//         <div className="border border-t-0 border-gray-400">
//           <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//             Important Website Details
//           </div>
//           <div className="p-0">
//             <table className="w-full">
//               <tbody>
//                 <tr className="border-b border-gray-400">
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
//                     Official Website :
//                   </td>
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
//                     <a
//                       href={job.officialWebsite || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
//                     >
//                       Click Here
//                     </a>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-gray-400">
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
//                     Advertisement :
//                   </td>
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
//                     <a
//                       href={job.notificationLink || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
//                     >
//                       Click Here
//                     </a>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-gray-400">
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
//                     Registration :
//                   </td>
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
//                     <a
//                       href={job.applicationLink || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
//                     >
//                       Click Here
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
//                     HOW TO APPLY :
//                   </td>
//                   <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
//                     <a
//                       href={job.officialWebsite || job.notificationLink || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs"
//                     >
//                       Click Here
//                     </a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Selection Process */}
//         {job.selectionProcess && job.selectionProcess.length > 0 && (
//           <div className="mt-4 border border-gray-400">
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Selection Process
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 {job.selectionProcess.map((process, index) => (
//                   <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                     <span className="text-black mr-1">▪</span>
//                     <span className="font-semibold text-black">{process}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Documents Required */}
//         {job.documentsRequired && job.documentsRequired.length > 0 && (
//           <div className="mt-4 border border-gray-400">
//             <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
//               Documents Required
//             </div>
//             <div className="p-4 lg:p-3 sm:p-2">
//               <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
//                 {job.documentsRequired.map((doc, index) => (
//                   <li key={index} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
//                     <span className="text-black mr-1">▪</span>
//                     <span className="font-semibold text-black">{doc}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Footer Note */}
//         <div className="text-center mt-6 text-sm lg:text-xs sm:text-[11px] font-semibold text-black">
//           Interested Applicant Can Read every Information at Official Website before Apply Online
//         </div>

//         {/* Back Button */}
//         <div className="text-center mt-6">
//           <button
//             onClick={() => navigate('/')}
//             className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
//           >
//             <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
//             Back to Jobs List
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetailPage;




import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../slice/jobSlice';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  User,
  FileText,
  BookOpen,
  ClipboardList,
  Award,
  ExternalLink
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

  // Helper function to render category-wise posts
  const renderCategoryPosts = () => {
    if (!job.categoryPosts) return null;
    
    const categories = [
      { key: 'general', label: 'General' },
      { key: 'obc', label: 'OBC' },
      { key: 'sc', label: 'SC' },
      { key: 'st', label: 'ST' },
      { key: 'ews', label: 'EWS' },
      { key: 'ph', label: 'PH' }
    ];

    return categories.map(category => (
      job.categoryPosts[category.key] && (
        <div key={category.key} className="inline-block mr-4 mb-2">
          <span className="font-semibold text-black">{category.label}:</span>
          <span className="ml-1 text-imp">{job.categoryPosts[category.key]}</span>
        </div>
      )
    ));
  };

  // Helper function to render category-wise fees
  const renderCategoryFees = () => {
    if (!job.categoryFees) return null;
    
    const categories = [
      { key: 'general', label: 'General' },
      { key: 'obc', label: 'OBC' },
      { key: 'sc', label: 'SC' },
      { key: 'st', label: 'ST' },
      { key: 'ews', label: 'EWS' },
      { key: 'ph', label: 'PH' }
    ];

    return categories.map(category => (
      job.categoryFees[category.key] && (
        <li key={category.key} className="flex items-start text-sm lg:text-xs sm:text-[11px]">
          <span className="text-black mr-1">▪</span>
          <div>
            <span className="font-semibold text-black">{category.label}:</span>
            <span className="ml-2 text-imp">₹{job.categoryFees[category.key]}</span>
          </div>
        </li>
      )
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gradient-to-br from-white to-blue-100">
        <Loader2 className="w-12 h-12 lg:w-10 lg:h-10 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Loading Job Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <AlertCircle className="w-16 h-16 lg:w-12 lg:h-12 sm:w-10 sm:h-10 text-red-600" />
        <p className="text-red-600 text-lg lg:text-base sm:text-sm font-medium text-center">{error}</p>
        <button
          onClick={() => navigate('/job-alerts')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Jobs
        </button>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50">
        <p className="text-gray-600 text-lg lg:text-base sm:text-sm">Job not found</p>
        <button
          onClick={() => navigate('/job-alerts')}
          className="px-6 py-3 lg:px-5 lg:py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
        >
          <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
          Back to Jobs
        </button>
      </div>
    );
  }

  const job = currentJob;

  // Check if registration is open
  const isRegistrationOpen = job.isRegistrationOpen !== undefined 
    ? job.isRegistrationOpen 
    : (() => {
        const now = new Date();
        const endDate = job.importantDates?.finalLastDate ? new Date(job.importantDates.finalLastDate) : null;
        return endDate ? now <= endDate : false;
      })();

  // Calculate remaining days
  const remainingDays = job.remainingDays !== undefined 
    ? job.remainingDays 
    : (() => {
        if (!job.importantDates?.finalLastDate) return null;
        const endDate = new Date(job.importantDates.finalLastDate);
        const now = new Date();
        const diffTime = endDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
      })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">
        
        {/* Page Title with Registration Status */}
        <div className="text-center mb-6 relative">
          <div className="absolute top-0 right-0">
            <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${isRegistrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
              {remainingDays !== null && remainingDays > 0 && (
                <span className="ml-2">({remainingDays} days left)</span>
              )}
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-imp">
            {job.departmentName || 'UPPSC Recruitment'}
          </h1>
          <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-black">
            {job.postName || 'LEKHPAL'}
          </h2>
        </div>

        {/* Job Status Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Award className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Status</p>
              <p className="text-lg font-bold text-imp">{job.status || 'Verified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <FileText className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Form Mode</p>
              <p className="text-lg font-bold text-imp capitalize">{job.modeOfForm || 'Online'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Posted On</p>
              <p className="text-lg font-bold text-imp">{formatDate(job.createdAt) || 'N/A'}</p>
            </div>
          </div>
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
            <span className="font-semibold text-black">Help Contact No:</span>
            <span className="ml-2 text-imp">{job.helpCareNo || '+9199925140'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">E-mail ID:</span>
            <span className="ml-2 text-primary">{job.helpEmailId || 'abcd@gmail.com'}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Form Type:</span>
            <span className="ml-2 text-imp capitalize">{job.typeOfForm || 'Government'}</span>
          </div>
          <div className="md:text-right">
            <span className="font-semibold text-black">Portal Visibility:</span>
            <span className="ml-2 text-primary">
              {job.showInPortal ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>

        {/* Two Column Layout - Important Dates */}
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
                      {formatDate(job.importantDates?.startDate) || '08-01-2026'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Registration Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(job.importantDates?.registrationLastDate) || '31-01-2026'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Fee Pay Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(job.importantDates?.feeLastDate) || '31-01-2026'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Final Submit Last Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(job.importantDates?.finalLastDate) || '31-01-2026'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Correction Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(job.importantDates?.correctionDate) || '31-01-2026'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Formulation Date:</span>
                    <span className="ml-2 text-imp">
                      {formatDate(job.importantDates?.formulationDate) || '06-11-2024'}
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
                {job.categoryFees ? renderCategoryFees() : (
                  <>
                    <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                      <span className="text-black mr-1">▪</span>
                      <div>
                        <span className="font-semibold text-black">General/OBC Application Fee:</span>
                        <span className="ml-2 text-imp">₹{job.categoryFees?.general || job.categoryFees?.obc || '350'}</span>
                      </div>
                    </li>
                    <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                      <span className="text-black mr-1">▪</span>
                      <div>
                        <span className="font-semibold text-black">SC/ST Application Fee:</span>
                        <span className="ml-2 text-imp">₹{job.categoryFees?.sc || job.categoryFees?.st || '25'}</span>
                      </div>
                    </li>
                    <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                      <span className="text-black mr-1">▪</span>
                      <div>
                        <span className="font-semibold text-black">PH Application Fee:</span>
                        <span className="ml-2 text-imp">₹{job.categoryFees?.ph || '50'}</span>
                      </div>
                    </li>
                  </>
                )}
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Payment Mode:</span>
                    <span className="ml-2 text-imp">
                      {job.paymentMode === 'paid' ? 'Paid' : job.paymentMode || 'Online Only'}
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
                  <p><span className="font-semibold text-black">Primary Qualification:</span> {job.eligibilityEducational1}</p>
                </div>
              )}
              {job.eligibilityEducational2 && (
                <div className="text-gray-800 whitespace-pre-line text-base lg:text-sm sm:text-xs">
                  <p><span className="font-semibold text-black">Additional Qualification:</span> {job.eligibilityEducational2}</p>
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
                      {job.eligibilityEducational1 || '10+2'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">{job.eligibilityEducational2 || 'CCC'}</span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Please see Official Notification for complete details</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Age Limit */}
          <div>
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Age Limit as on <span className="text-imp">{formatDate(job.importantDates?.ageOnDate) || '01-12-2025'}</span>
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Minimum Age:</span>
                    <span className="ml-2 text-imp">
                      {job.importantDates?.minimumAge || '18'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Maximum Age:</span>
                    <span className="ml-2 text-imp">
                      {job.importantDates?.maximumAge || '35'}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-sm lg:text-xs sm:text-[11px]">
                  <span className="text-black mr-1">▪</span>
                  <div>
                    <span className="font-semibold text-black">Age Relaxation:</span>
                    <span className="ml-2 text-imp">
                      {job.importantDates?.ageRelaxation || 'As per Advertisement Rule'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category-wise Posts Section */}
        {job.categoryPosts && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Category-wise Vacancy Details
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <div className="flex flex-wrap gap-4 lg:gap-3 sm:gap-2">
                {renderCategoryPosts()}
              </div>
            </div>
          </div>
        )}

        {/* Total Post Section */}
        <div className="text-center py-4 border border-t-0 border-gray-400">
          <h2 className="text-2xl lg:text-xl sm:text-lg font-bold">
            <span className="text-imp">Total Post: {job.totalPost || '7251'}</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            (Category-wise distribution shown above)
          </p>
        </div>

        {/* Status and Admin Info */}
        <div className="mt-4 border border-gray-400">
          <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
            Job Status Information
          </div>
          <div className="p-4 lg:p-3 sm:p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-black mb-2 text-base lg:text-sm sm:text-xs">Current Status:</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${job.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="font-bold text-imp capitalize">{job.status || 'Verified'}</span>
                  {job.statusRemark && (
                    <span className="text-sm text-gray-600 ml-2">({job.statusRemark})</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Status last updated: {formatDate(job.statusChangedAt)}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-black mb-2 text-base lg:text-sm sm:text-xs">Job Posted By:</h4>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-black">
                    {job.createdBy?.firstName} {job.createdBy?.lastName}
                  </span>
                  <span className="text-sm text-gray-600">({job.createdBy?.role})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{job.createdBy?.email}</p>
              </div>
            </div>
          </div>
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
                    Official Website :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <a
                      href={job.officialWebsite || 'https://www.upsssc.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline text-primary text-base lg:text-sm sm:text-xs flex items-center justify-center gap-1"
                    >
                      Click Here <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Apply Online :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <button
                      onClick={() => {
                        if (isRegistrationOpen) {
                          // Handle apply online logic
                          window.open(job.officialWebsite || '#', '_blank');
                        } else {
                          alert('Registration is closed for this job.');
                        }
                      }}
                      className={`font-semibold text-base lg:text-sm sm:text-xs px-4 py-1 rounded ${
                        isRegistrationOpen 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                      disabled={!isRegistrationOpen}
                    >
                      {isRegistrationOpen ? 'Apply Now' : 'Registration Closed'}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 font-semibold text-center text-imp text-base lg:text-sm sm:text-xs">
                    Latest Job Status :
                  </td>
                  <td className="py-3 px-4 lg:py-2 lg:px-3 sm:py-1.5 sm:px-2 text-center">
                    <span className={`font-semibold ${job.isLatestJob ? 'text-green-600' : 'text-gray-600'}`}>
                      {job.isLatestJob ? 'Latest Job ✓' : 'Not Latest'}
                    </span>
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

        {/* Important Instructions */}
        {job.importantInstructions && job.importantInstructions.length > 0 && (
          <div className="mt-4 border border-gray-400">
            <div className="bg-primary text-white text-center py-3 px-4 lg:py-2 lg:px-3 sm:py-2 sm:px-2 font-bold text-lg lg:text-base sm:text-sm">
              Important Instructions
            </div>
            <div className="p-4 lg:p-3 sm:p-2">
              <ul className="space-y-2 lg:space-y-1.5 sm:space-y-1">
                {job.importantInstructions.map((instruction, index) => (
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
          Interested Applicant Can Read every Information at Official Website before Apply Online
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/job-alerts')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Jobs List
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;