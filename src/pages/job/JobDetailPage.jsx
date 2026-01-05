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
  ExternalLink,
  FileText,
  Calendar,
  User,
  DollarSign,
  BookOpen,
  Briefcase,
  Mail,
  Phone
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
    if (!dateString) return 'Not Announced';
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

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'Free';
    return `₹${amount}`;
  };

  // Get all important dates
  const getImportantDates = () => {
    if (!currentJob?.importantDates) return [];
    
    const dates = [
      { label: 'Formulation Date', value: currentJob.importantDates.formulationDate },
      { label: 'Application Start Date', value: currentJob.importantDates.startDate },
      { label: 'Registration Last Date', value: currentJob.importantDates.registrationLastDate },
      { label: 'Fee Payment Last Date', value: currentJob.importantDates.feeLastDate },
      { label: 'Final Submit Last Date', value: currentJob.importantDates.finalLastDate },
      { label: 'Correction Date', value: currentJob.importantDates.correctionDate },
      { label: 'Admit Card Date', value: currentJob.importantDates.admitCardDate },
      { label: 'Exam Date', value: currentJob.importantDates.examDate },
      { label: 'Answer Key Date', value: currentJob.importantDates.answerKeyDate },
      { label: 'Result Date', value: currentJob.importantDates.resultDate }
    ];
    
    return dates.filter(date => date.value);
  };

  // Get all category posts
  const getCategoryPosts = () => {
    if (!currentJob?.categoryPosts) return [];
    
    return Object.entries(currentJob.categoryPosts)
      .filter(([_, value]) => value)
      .map(([category, count]) => ({ category, count }));
  };

  // Get all category fees
  const getCategoryFees = () => {
    if (!currentJob?.categoryFees) return [];
    
    return Object.entries(currentJob.categoryFees)
      .filter(([_, value]) => value)
      .map(([category, fee]) => ({ category, fee }));
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
  const importantDates = getImportantDates();
  const categoryPosts = getCategoryPosts();
  const categoryFees = getCategoryFees();
  const isRegistrationOpen = job.isRegistrationOpen || false;
  const remainingDays = job.remainingDays || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-6 lg:py-6 sm:px-4 sm:py-4">
        
        {/* Page Header with Status */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold mb-2 text-gray-800">
                {job.departmentName}
              </h1>
              <h2 className="text-xl lg:text-lg sm:text-base font-semibold text-blue-600">
                {job.postName}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                isRegistrationOpen 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                job.status === 'verified' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
              }`}>
                {job.status || 'Pending'}
              </span>
              {remainingDays > 0 && (
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-300">
                  {remainingDays} days remaining
                </span>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 text-sm lg:text-xs sm:text-[11px]">
            {(job.helpEmailId || job.helpCareNo) && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-700">Help:</span>
                {job.helpEmailId && (
                  <a href={`mailto:${job.helpEmailId}`} className="text-blue-600 hover:underline">
                    {job.helpEmailId}
                  </a>
                )}
                {job.helpEmailId && job.helpCareNo && <span className="mx-1">|</span>}
                {job.helpCareNo && (
                  <a href={`tel:${job.helpCareNo}`} className="text-blue-600 hover:underline">
                    {job.helpCareNo}
                  </a>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Mode:</span>
              <span className="capitalize">{job.modeOfForm}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Payment:</span>
              <span className="capitalize">{job.paymentMode}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {job.description && (
          <div className="mb-6 p-4 lg:p-3 sm:p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg lg:text-base sm:text-sm font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Description
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>
        )}

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Posts */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Total Posts</h3>
            </div>
            <p className="text-2xl font-bold text-blue-700">{job.totalPost || 0}</p>
            {categoryPosts.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                  {categoryPosts.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="capitalize">{item.category}:</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Application Fees */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Application Fees</h3>
            </div>
            {categoryFees.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-2">
                  {categoryFees.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="capitalize">{item.category}:</span>
                      <span className="font-medium">{formatCurrency(item.fee)}</span>
                    </div>
                  ))}
                </div>
                {categoryFees.length > 4 && (
                  <p className="text-xs text-gray-500">+{categoryFees.length - 4} more categories</p>
                )}
              </>
            ) : (
              <p className="text-gray-600 text-sm">Fee details not available</p>
            )}
          </div>

          {/* Age Limit */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Age Limit</h3>
            </div>
            {job.importantDates?.minimumAge || job.importantDates?.maximumAge ? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min:</span>
                  <span className="font-medium">{job.importantDates.minimumAge} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max:</span>
                  <span className="font-medium">{job.importantDates.maximumAge} years</span>
                </div>
                {job.importantDates.ageOnDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    As on: {formatDate(job.importantDates.ageOnDate)}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Not specified</p>
            )}
          </div>

          {/* Important Dates Summary */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-800">Key Dates</h3>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Starts:</span>
                <span className="font-medium">{formatDate(job.importantDates?.startDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ends:</span>
                <span className="font-medium">{formatDate(job.importantDates?.finalLastDate)}</span>
              </div>
              {job.importantDates?.examDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Exam:</span>
                  <span className="font-medium">{formatDate(job.importantDates.examDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Important Dates */}
        {importantDates.length > 0 && (
          <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                All Important Dates
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {importantDates.map((date, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm text-gray-600 font-medium">{date.label}</span>
                    <span className="text-base font-semibold text-gray-800 mt-1">
                      {formatDate(date.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Educational Qualification */}
        {(job.eligibilityEducational1 || job.eligibilityEducational2) && (
          <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Educational Qualification
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {job.eligibilityEducational1 && (
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <p className="text-gray-800">{job.eligibilityEducational1}</p>
                  </div>
                )}
                {job.eligibilityEducational2 && (
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <p className="text-gray-800">{job.eligibilityEducational2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category-wise Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Posts by Category */}
          {categoryPosts.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
              <div className="bg-purple-600 text-white px-4 py-3 rounded-t-lg">
                <h3 className="text-lg font-semibold">Posts by Category</h3>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Category</th>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Posts</th>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categoryPosts.map((item, index) => {
                        const percentage = ((item.count / job.totalPost) * 100).toFixed(1);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-3 text-sm font-medium text-gray-800 capitalize">
                              {item.category}
                            </td>
                            <td className="py-2 px-3 text-sm text-gray-700">{item.count}</td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-600 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600">{percentage}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fees by Category */}
          {categoryFees.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
              <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
                <h3 className="text-lg font-semibold">Fees by Category</h3>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Category</th>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Fee</th>
                        <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categoryFees.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 px-3 text-sm font-medium text-gray-800 capitalize">
                            {item.category}
                          </td>
                          <td className="py-2 px-3 text-sm text-gray-700">
                            {formatCurrency(item.fee)}
                          </td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.fee === 0 
                                ? 'bg-green-100 text-green-800'
                                : item.fee < 100
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {item.fee === 0 ? 'Free' : item.fee < 100 ? 'Low Fee' : 'Regular Fee'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selection Process */}
        {job.selectionProcess && job.selectionProcess.length > 0 && (
          <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="bg-orange-600 text-white px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">Selection Process</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-3">
                {job.selectionProcess.map((process, index) => (
                  <div key={index} className="flex items-start gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{process}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents Required */}
        {job.documentsRequired && job.documentsRequired.length > 0 && (
          <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">Documents Required</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-800">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Important Links */}
        <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="bg-red-600 text-white px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Important Links
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {job.officialWebsite && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Official Website</p>
                      <p className="text-sm text-gray-600 truncate max-w-xs">{job.officialWebsite}</p>
                    </div>
                  </div>
                  <a
                    href={job.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Visit
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Add other links here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.notificationLink && (
                  <a
                    href={job.notificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-800">Official Notification</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </a>
                )}

                {job.applicationLink && (
                  <a
                    href={job.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-800">Apply Online</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Information */}
        <div className="mb-6 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="bg-gray-700 text-white px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold">Admin Information</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Created By</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {job.createdBy?.firstName} {job.createdBy?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{job.createdBy?.email}</p>
                    <p className="text-xs text-gray-500">
                      Created: {formatDate(job.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Approved By</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {job.approvedBy?.firstName} {job.approvedBy?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{job.approvedBy?.email}</p>
                    <p className="text-xs text-gray-500">
                      Verified: {formatDate(job.statusChangedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/job-alerts')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Jobs List
          </button>

          {job.officialWebsite && (
            <a
              href={job.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
            >
              <ExternalLink className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
              Apply on Official Website
            </a>
          )}

          {job.notificationLink && (
            <a
              href={job.notificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2 text-base lg:text-sm sm:text-xs"
            >
              <FileText className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
              View Official Notification
            </a>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            Note: Please verify all information from the official notification before applying. 
            This is for informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;