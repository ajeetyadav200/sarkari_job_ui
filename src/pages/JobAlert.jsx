import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllJobs } from "../slice/jobSlice";

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
    <div className="bg-white border rounded-md shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 text-white text-center py-3 font-bold text-xl">
        Job Alert
      </div>

      {/* Body */}
      <div className="max-h-[420px] overflow-y-auto px-4 py-3">
        {loading && (
          <p className="text-center text-gray-600 py-6">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-600 py-6">No jobs available</p>
        )}

        <ul className="space-y-4">
          {jobs.slice(0, 10).map((job) => (
            <li
              key={job._id}
              onClick={() => navigate(`/job-details/${job._id}`)}
              className="border-b border-dashed border-red-400 pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-2">
                {/* Bullet */}
                <span className="text-green-700 font-bold mt-1">■</span>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-blue-700 font-semibold hover:underline leading-snug">
                    {job.departmentName}
                    {job.postName && ` - ${job.postName}`}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mt-1 text-sm">
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      <span className="text-green-600 font-semibold">
                        {formatDate(job.importantDates?.startDate)}
                      </span>{" "}
                      <span className="text-red-600 mx-1">⇔</span>
                      <span className="text-red-600 font-semibold">
                        {formatDate(
                          job.importantDates?.registrationLastDate
                        )}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold">Post:</span>{" "}
                      <span className="text-blue-700 font-bold">
                        {job.totalPost || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* View All Jobs Button */}
      {jobs.length > 0 && (
        <div className="bg-gray-50 border-t px-4 py-3">
          <button
            onClick={() => navigate("/job-alerts")}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            View All Jobs →
          </button>
        </div>
      )}
    </div>
  );
};

export default JobAlert;
