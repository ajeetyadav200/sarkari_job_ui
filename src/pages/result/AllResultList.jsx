import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Calendar, Briefcase, MapPin, Clock, ChevronRight, Users, IndianRupee } from 'lucide-react';
import { fetchResultsList, resetResults } from '../../slice/resultSlice';

const AllResultList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: results, loading, pagination } = useSelector((state) => state.results);
  const [page, setPage] = useState(1);

  // Search filters
  const [filters, setFilters] = useState({
    keyword: '',
    year: '',
    month: '',
    date: ''
  });

  const observer = useRef();
  const lastResultElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore]);

  // Fetch results on page change
  useEffect(() => {
    const params = {
      page,
      limit: 20,
      append: page > 1,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.year && { year: filters.year }),
      ...(filters.month && { month: filters.month }),
      ...(filters.date && { date: filters.date })
    };

    dispatch(fetchResultsList(params));
  }, [page, dispatch]);

  // Handle search
  const handleSearch = () => {
    dispatch(resetResults());
    setPage(1);
    setTimeout(() => {
      const params = {
        page: 1,
        limit: 20,
        append: false,
        ...(filters.keyword && { keyword: filters.keyword }),
        ...(filters.year && { year: filters.year }),
        ...(filters.month && { month: filters.month }),
        ...(filters.date && { date: filters.date })
      };
      dispatch(fetchResultsList(params));
    }, 100);
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      keyword: '',
      year: '',
      month: '',
      date: ''
    });
    dispatch(resetResults());
    setPage(1);
    setTimeout(() => {
      dispatch(fetchResultsList({ page: 1, limit: 20, append: false }));
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
      <div className=" text-black py-8 lg:py-6 sm:py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold">All Result Opportunities</h1>
          <p className="text-black mt-2 text-base lg:text-sm sm:text-xs">
            Find and check results for various government examinations
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-6 sm:py-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-4 sm:p-3 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 lg:mb-4 sm:mb-3">
            <Filter className="w-6 h-6 lg:w-5 lg:h-5 sm:w-4 sm:h-4 text-primary" />
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800">Search & Filter Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                placeholder="Exam name, department, or keywords..."
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 lg:px-6 lg:py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-base lg:text-sm"
            >
              <Search className="w-5 h-5 lg:w-4 lg:h-4" />
              Search Results
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 lg:px-5 lg:py-2 rounded-lg font-medium transition-colors text-base lg:text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6 lg:space-y-4">
          {results.map((result, index) => (
            <div
              key={result._id}
              ref={index === results.length - 1 ? lastResultElementRef : null}
              onClick={() => navigate(`/result-details/${result._id}`)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary overflow-hidden group"
            >
              <div className="p-6 lg:p-4 sm:p-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Result Header */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                        <h3 className="text-xl lg:text-lg sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {result.postTypeDetails || result.examName || result.linkMenuField || 'Result'}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {result.resultStatus === 'active' && (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Result Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Published Date */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <Calendar className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Published Date</p>
                          <p className="text-lg lg:text-base font-bold text-gray-800">
                            {formatDate(result.publishDate) || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Result Date */}
                      {result.resultDate && (
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                          <Clock className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Result Date</p>
                            <p className="text-base lg:text-sm font-bold text-gray-800">
                              {formatDate(result.resultDate)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description Preview */}
                    {result.description && (
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm lg:text-xs line-clamp-2">
                          {getFirstLine(result.description)}
                        </p>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-3">
                      {result.category && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {result.category}
                        </span>
                      )}
                      {result.resultType && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {result.resultType}
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
            <p className="mt-4 text-gray-600 font-medium text-lg">Loading more results...</p>
          </div>
        )}

        {/* No More Results */}
        {!loading && !pagination.hasMore && results.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-xl p-8 inline-block">
              <p className="text-gray-700 font-semibold text-lg">🎉 All results loaded</p>
              <p className="text-gray-500 mt-2">You've reached the end of the list</p>
            </div>
          </div>
        )}

        {/* No Results Found */}
        {!loading && results.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-2xl font-bold mb-3">No results found</p>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search filters or check back later for new results
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

export default AllResultList;
