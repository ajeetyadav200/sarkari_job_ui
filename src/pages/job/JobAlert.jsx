import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllJobs } from "../../slice/jobSlice";
import { Loader2, AlertCircle, FileText, Circle } from 'lucide-react';

const JobAlert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(
      fetchAllJobs({
        page: 1,
        limit: 20,
        sortBy: "createdAt",
        order: "desc",
      })
    );
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[rgb(0,142,228)] text-white p-4">
        <h2 className="text-2xl lg:text-2xl md:text-xl sm:text-base font-bold text-center">Job Alert</h2>
      </div>

      {/* Body */}
      <div className="max-h-96 overflow-y-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-8 h-8 lg:w-8 lg:h-8 sm:w-6 sm:h-6 animate-spin text-[#1447e6]" />
            <p className="text-gray-600 text-base lg:text-base sm:text-xs">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <FileText className="w-10 h-10 lg:w-10 lg:h-10 sm:w-7 sm:h-7 text-gray-400" />
            <p className="text-gray-600 text-sm lg:text-base sm:text-xs">No jobs available</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {jobs.slice(0, 10).map((job) => (
              <li 
                key={job._id} 
                onClick={() => navigate(`/job-details/${job._id}`)}
                className="border-b border-dashed border-gray-300 pb-3 last:border-0 cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  {/* Black circle */}
                  <Circle className="w-2.5 h-2.5 mt-2 bg-black rounded-full text-black" />
                  
                  {/* Title */}
                  <h3 className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-2 flex-1 text-base lg:text-base sm:text-xs">
                    {job.departmentName}
                    {job.postName && ` - ${job.postName}`}
                  </h3>
                </div>
                
                {/* Meta Information */}
                <div className="ml-4 mt-1 flex flex-wrap gap-4 text-sm lg:text-xs sm:text-[11px]">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-black">Date:</span>
                    <span className="text-[#1447e6] font-semibold">
                      {formatDate(job.importantDates?.startDate)}
                    </span>
                    <span className="text-red-600 mx-1">⇔</span>
                    <span className="text-red-600 font-semibold">
                      {formatDate(job.importantDates?.registrationLastDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-black">Post:</span>
                    <span className="text-[#1447e6] font-bold">
                      {job.totalPost || 0}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* View All Jobs Button */}
      {jobs.length > 0 && (
        <div className="border-t border-gray-200 p-3 text-center">
          <button
            onClick={() => navigate("/jobs")}
            className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline transition-colors text-sm lg:text-base sm:text-xs"
          >
            View All Jobs →
          </button>
        </div>
      )}
    </div>
  );
};

export default JobAlert;