import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGovernmentServices } from "../../slice/governmentServiceSlice";
import { Loader2, FileText, Circle } from 'lucide-react';

const GovernmentServiceAlert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: services, loading } = useSelector((state) => state.governmentServices);

  useEffect(() => {
    dispatch(
      fetchGovernmentServices({
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

  // Get service type label
  const getServiceTypeLabel = (type) => {
    const types = {
      scholarship: 'Scholarship',
      certificate: 'Certificate',
      registration: 'Registration',
      verification: 'Verification',
      governmentScheme: 'Govt Scheme',
      documentService: 'Document',
      welfareScheme: 'Welfare',
      financialService: 'Financial',
      other: 'Other'
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[rgb(0,142,228)] text-white p-4">
        <h2 className="text-2xl lg:text-2xl md:text-xl sm:text-base font-bold text-center">Government Services</h2>
      </div>

      {/* Body */}
      <div className="max-h-96 overflow-y-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-8 h-8 lg:w-8 lg:h-8 sm:w-6 sm:h-6 animate-spin text-[#1447e6]" />
            <p className="text-gray-600 text-base lg:text-base sm:text-xs">Loading government services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <FileText className="w-10 h-10 lg:w-10 lg:h-10 sm:w-7 sm:h-7 text-gray-400" />
            <p className="text-gray-600 text-sm lg:text-base sm:text-xs">No government services available</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {services.slice(0, 10).map((service) => (
              <li
                key={service._id}
                onClick={() => navigate(`/government-service-details/${service._id}`)}
                className="border-b border-dashed border-gray-300 pb-3 last:border-0 cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  {/* Black circle */}
                  <Circle className="w-2.5 h-2.5 mt-2 bg-black rounded-full text-black" />

                  {/* Title */}
                  <h3 className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-2 flex-1 text-base lg:text-base sm:text-xs">
                    {service.serviceName}
                    {service.departmentName && ` - ${service.departmentName}`}
                  </h3>
                </div>

                {/* Meta Information */}
                <div className="ml-4 mt-1 flex flex-wrap gap-4 text-sm lg:text-xs sm:text-[11px]">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-black">Apply:</span>
                    <span className="text-[#1447e6] font-semibold">
                      {formatDate(service.importantDates?.startDate)}
                    </span>
                    {service.importantDates?.lastDate && (
                      <>
                        <span className="text-red-600 mx-1">⇔</span>
                        <span className="text-red-600 font-semibold">
                          {formatDate(service.importantDates?.lastDate)}
                        </span>
                      </>
                    )}
                  </div>

                  {service.serviceType && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-black">Type:</span>
                      <span className="text-[#1447e6] font-bold">
                        {getServiceTypeLabel(service.serviceType)}
                      </span>
                    </div>
                  )}

                  {service.state && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-black">State:</span>
                      <span className="text-[#1447e6] font-bold">
                        {service.state}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* View All Government Services Button */}
      {services.length > 0 && (
        <div className="border-t border-gray-200 p-3 text-center">
          <button
            onClick={() => navigate("/government-services-all")}
            className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline transition-colors text-sm lg:text-base sm:text-xs"
          >
            View All Government Services →
          </button>
        </div>
      )}
    </div>
  );
};

export default GovernmentServiceAlert;
