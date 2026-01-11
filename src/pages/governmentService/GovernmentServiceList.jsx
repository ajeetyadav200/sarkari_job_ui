import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Calendar, FileText, MapPin, ChevronRight, Building2, GraduationCap, CreditCard, Shield, Award } from 'lucide-react';
import { fetchServicesList, resetServices } from '../../slice/governmentServiceSlice';

const GovernmentServiceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: services, loading, pagination } = useSelector((state) => state.governmentServices);
  const [page, setPage] = useState(1);

  // Search filters
  const [filters, setFilters] = useState({
    keyword: '',
    serviceType: '',
    state: '',
    year: '',
    month: ''
  });

  const observer = useRef();
  const lastServiceElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore]);

  // Fetch services on page change
  useEffect(() => {
    const params = {
      page,
      limit: 20,
      append: page > 1,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.serviceType && { serviceType: filters.serviceType }),
      ...(filters.state && { state: filters.state }),
      ...(filters.year && { year: filters.year }),
      ...(filters.month && { month: filters.month })
    };

    dispatch(fetchServicesList(params));
  }, [page, dispatch]);

  // Handle search
  const handleSearch = () => {
    dispatch(resetServices());
    setPage(1);
    setTimeout(() => {
      const params = {
        page: 1,
        limit: 20,
        append: false,
        ...(filters.keyword && { keyword: filters.keyword }),
        ...(filters.serviceType && { serviceType: filters.serviceType }),
        ...(filters.state && { state: filters.state }),
        ...(filters.year && { year: filters.year }),
        ...(filters.month && { month: filters.month })
      };
      dispatch(fetchServicesList(params));
    }, 100);
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      keyword: '',
      serviceType: '',
      state: '',
      year: '',
      month: ''
    });
    dispatch(resetServices());
    setPage(1);
    setTimeout(() => {
      dispatch(fetchServicesList({ page: 1, limit: 20, append: false }));
    }, 100);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  // Get current year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const serviceTypeOptions = [
    { value: 'scholarship', label: 'Scholarship' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'registration', label: 'Registration' },
    { value: 'verification', label: 'Verification' },
    { value: 'governmentScheme', label: 'Government Scheme' },
    { value: 'documentService', label: 'Document Service' },
    { value: 'welfareScheme', label: 'Welfare Scheme' },
    { value: 'financialService', label: 'Financial Service' },
    { value: 'other', label: 'Other' }
  ];

  const stateOptions = [
    'All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  // Get first line of description
  const getFirstLine = (text) => {
    if (!text) return '';
    return text.split('\n')[0].substring(0, 150) + (text.split('\n')[0].length > 150 ? '...' : '');
  };

  // Get service type icon
  const getServiceTypeIcon = (type) => {
    switch (type) {
      case 'scholarship':
        return <GraduationCap className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
      case 'certificate':
        return <Award className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
      case 'registration':
        return <CreditCard className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
      case 'verification':
        return <Shield className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
      case 'governmentScheme':
      case 'welfareScheme':
        return <Building2 className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
      default:
        return <FileText className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />;
    }
  };

  // Get service type label
  const getServiceTypeLabel = (type) => {
    const option = serviceTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  // Check if application is open
  const isApplicationOpen = (service) => {
    if (!service.importantDates?.lastDate) return false;
    const now = new Date();
    const lastDate = new Date(service.importantDates.lastDate);
    return now <= lastDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <div className="text-black py-8 lg:py-6 sm:py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold">Government Services</h1>
          <p className="text-black mt-2 text-base lg:text-sm sm:text-xs">
            Apply for scholarships, certificates, registrations and various government services
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-6 sm:py-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-4 sm:p-3 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 lg:mb-4 sm:mb-3">
            <Filter className="w-6 h-6 lg:w-5 lg:h-5 sm:w-4 sm:h-4 text-primary" />
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800">Search & Filter Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Keyword Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search Keyword
              </label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                placeholder="Service name, department, or keywords..."
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              />
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={filters.serviceType}
                onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              >
                <option value="">All Types</option>
                {serviceTypeOptions.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              >
                <option value="">All States</option>
                {stateOptions.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              >
                <option value="">All Years</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 lg:px-6 lg:py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-base lg:text-sm"
            >
              <Search className="w-5 h-5 lg:w-4 lg:h-4" />
              Search Services
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 lg:px-5 lg:py-2 rounded-lg font-medium transition-colors text-base lg:text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6 lg:space-y-4">
          {services.map((service, index) => (
            <div
              key={service._id}
              ref={index === services.length - 1 ? lastServiceElementRef : null}
              onClick={() => navigate(`/government-service-details/${service._id}`)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary overflow-hidden group"
            >
              <div className="p-6 lg:p-4 sm:p-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Service Header */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        {getServiceTypeIcon(service.serviceType)}
                        <h3 className="text-xl lg:text-lg sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {service.serviceName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isApplicationOpen(service) ? (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Application Open
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Application Closed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Service Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Service Type */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <FileText className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Service Type</p>
                          <p className="text-base lg:text-sm font-bold text-gray-800">
                            {getServiceTypeLabel(service.serviceType)}
                          </p>
                        </div>
                      </div>

                      {/* Application Dates */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <Calendar className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Apply Dates</p>
                          <p className="text-base lg:text-sm font-bold">
                            <span className="text-green-600">{formatDate(service.importantDates?.startDate) || 'N/A'}</span>
                            <span className="mx-2 text-gray-400">-</span>
                            <span className="text-red-600">{formatDate(service.importantDates?.lastDate) || 'N/A'}</span>
                          </p>
                        </div>
                      </div>

                      {/* State */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <MapPin className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">State</p>
                          <p className="text-base lg:text-sm font-bold text-gray-800">
                            {service.state || 'All India'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description Preview */}
                    {service.shortDescription && (
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm lg:text-xs line-clamp-2">
                          {getFirstLine(service.shortDescription)}
                        </p>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-3">
                      {service.serviceCategory && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {service.serviceCategory}
                        </span>
                      )}
                      {service.departmentName && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {service.departmentName}
                        </span>
                      )}
                      {service.isFree && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Free Service
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex md:flex-col items-center justify-between md:justify-center gap-2">
                    <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 lg:px-4 lg:py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 group-hover:scale-105 transform transition-transform text-sm whitespace-nowrap">
                      View Details
                      <ChevronRight className="w-5 h-5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium text-lg">Loading more services...</p>
          </div>
        )}

        {/* No More Services */}
        {!loading && !pagination.hasMore && services.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-xl p-8 inline-block">
              <p className="text-gray-700 font-semibold text-lg">All services loaded</p>
              <p className="text-gray-500 mt-2">You've reached the end of the list</p>
            </div>
          </div>
        )}

        {/* No Services Found */}
        {!loading && services.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-2xl font-bold mb-3">No services found</p>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search filters or check back later for new government services
            </p>
            <button
              onClick={handleReset}
              className="mt-6 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentServiceList;
