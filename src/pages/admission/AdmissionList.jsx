import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Calendar, Briefcase, MapPin, Clock, ChevronRight, Users, IndianRupee } from 'lucide-react';
import { fetchAdmissionsList, resetAdmissions } from '../../slice/admissionSlice';

const AdmissionList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: admissions, loading, pagination } = useSelector((state) => state.admissions);
  const [page, setPage] = useState(1);

  // Search filters
  const [filters, setFilters] = useState({
    keyword: '',
    year: '',
    month: '',
    date: '',
    isLatest: false
  });

  const observer = useRef();
  const lastAdmissionElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore]);

  // Fetch admissions on page change
  useEffect(() => {
    const params = {
      page,
      limit: 20,
      append: page > 1,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.year && { year: filters.year }),
      ...(filters.month && { month: filters.month }),
      ...(filters.date && { date: filters.date }),
      ...(filters.isLatest && { isLatest: 'true' })
    };

    dispatch(fetchAdmissionsList(params));
  }, [page, dispatch]);

  // Handle search
  const handleSearch = () => {
    dispatch(resetAdmissions());
    setPage(1);
    setTimeout(() => {
      const params = {
        page: 1,
        limit: 20,
        append: false,
        ...(filters.keyword && { keyword: filters.keyword }),
        ...(filters.year && { year: filters.year }),
        ...(filters.month && { month: filters.month }),
        ...(filters.date && { date: filters.date }),
        ...(filters.isLatest && { isLatest: 'true' })
      };
      dispatch(fetchAdmissionsList(params));
    }, 100);
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      keyword: '',
      year: '',
      month: '',
      date: '',
      isLatest: false
    });
    dispatch(resetAdmissions());
    setPage(1);
    setTimeout(() => {
      dispatch(fetchAdmissionsList({ page: 1, limit: 20, append: false }));
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

  // Get first line of description
  const getFirstLine = (text) => {
    if (!text) return '';
    return text.split('\n')[0].substring(0, 150) + (text.split('\n')[0].length > 150 ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <div className="bg-primary text-white py-8 lg:py-6 sm:py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold">All Admission Opportunities</h1>
          <p className="text-blue-100 mt-2 text-base lg:text-sm sm:text-xs">
            Find and apply for admission openings across various universities and institutes
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-6 sm:py-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-4 sm:p-3 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 lg:mb-4 sm:mb-3">
            <Filter className="w-6 h-6 lg:w-5 lg:h-5 sm:w-4 sm:h-4 text-primary" />
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800">Search & Filter Admissions</h2>
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
                placeholder="Admission title, institution, or keywords..."
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              />
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

            {/* Month Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                className="w-full px-4 py-3 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base lg:text-sm"
              >
                <option value="">All Months</option>
                {monthOptions.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>

            {/* Latest Admissions Toggle */}
            <div className="flex items-center justify-center">
              <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-3 lg:py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.isLatest}
                  onChange={(e) => setFilters({ ...filters, isLatest: e.target.checked })}
                  className="w-5 h-5 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 font-medium">Latest Admissions Only</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 lg:px-6 lg:py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-base lg:text-sm"
            >
              <Search className="w-5 h-5 lg:w-4 lg:h-4" />
              Search Admissions
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 lg:px-5 lg:py-2 rounded-lg font-medium transition-colors text-base lg:text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Admissions List */}
        <div className="space-y-6 lg:space-y-4">
          {admissions.map((admission, index) => (
            <div
              key={admission._id}
              ref={index === admissions.length - 1 ? lastAdmissionElementRef : null}
              onClick={() => navigate(`/admission-details/${admission._id}`)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary overflow-hidden group"
            >
              <div className="p-6 lg:p-4 sm:p-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Admission Header */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                        <h3 className="text-xl lg:text-lg sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {admission.title || admission.postName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {admission.isLatest && (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Latest Admission
                          </span>
                        )}
                        {admission.isFeatured && (
                          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Admission Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Total Seats */}
                      {admission.totalSeats && (
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                          <Users className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Total Seats</p>
                            <p className="text-lg lg:text-base font-bold text-gray-800">
                              {admission.totalSeats}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Application Dates */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <Calendar className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Application Dates</p>
                          <p className="text-base lg:text-sm font-bold">
                            <span className="text-green-600">{formatDate(admission.importantDates?.applicationStartDate) || 'N/A'}</span>
                            <span className="mx-2 text-gray-400">→</span>
                            <span className="text-red-600">{formatDate(admission.importantDates?.applicationEndDate) || 'N/A'}</span>
                          </p>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <MapPin className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Category</p>
                          <p className="text-base lg:text-sm font-bold text-gray-800 capitalize">
                            {admission.category?.replace(/-/g, ' ') || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description Preview */}
                    {admission.description && (
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm lg:text-xs line-clamp-2">
                          {getFirstLine(admission.description)}
                        </p>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {admission.modeOfApplication || 'Online'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                        {admission.programType?.replace(/-/g, ' ') || 'General'}
                      </span>
                      {admission.state && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {admission.state}
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
            <p className="mt-4 text-gray-600 font-medium text-lg">Loading more admissions...</p>
          </div>
        )}

        {/* No More Admissions */}
        {!loading && !pagination.hasMore && admissions.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-xl p-8 inline-block">
              <p className="text-gray-700 font-semibold text-lg">🎉 All admissions loaded</p>
              <p className="text-gray-500 mt-2">You've reached the end of the list</p>
            </div>
          </div>
        )}

        {/* No Admissions Found */}
        {!loading && admissions.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-2xl font-bold mb-3">No admissions found</p>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search filters or check back later for new opportunities
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

export default AdmissionList;
