import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Calendar, Briefcase, MapPin, Clock } from 'lucide-react';
import { fetchJobsList, resetJobs } from '../../slice/jobSlice';

const JobList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: jobs, loading, pagination } = useSelector((state) => state.jobs);
  const [page, setPage] = useState(1);

  // Search filters
  const [filters, setFilters] = useState({
    keyword: '',
    year: '',
    month: '',
    date: '',
    isLatestJob: false
  });

  const observer = useRef();
  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore]);

  // Fetch jobs on page change
  useEffect(() => {
    const params = {
      page,
      limit: 20,
      append: page > 1,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.year && { year: filters.year }),
      ...(filters.month && { month: filters.month }),
      ...(filters.date && { date: filters.date }),
      ...(filters.isLatestJob && { isLatestJob: 'true' })
    };

    dispatch(fetchJobsList(params));
  }, [page, dispatch]);

  // Handle search
  const handleSearch = () => {
    dispatch(resetJobs());
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
        ...(filters.isLatestJob && { isLatestJob: 'true' })
      };
      dispatch(fetchJobsList(params));
    }, 100);
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      keyword: '',
      year: '',
      month: '',
      date: '',
      isLatestJob: false
    });
    dispatch(resetJobs());
    setPage(1);
    setTimeout(() => {
      dispatch(fetchJobsList({ page: 1, limit: 20, append: false }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">All Jobs</h1>
          <p className="text-blue-100 mt-2">Browse all available job opportunities</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Search & Filter</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Keyword Search */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search by keyword
              </label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                placeholder="Search department, post name, or qualification..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Months</option>
                {monthOptions.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                placeholder="DD"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Latest Jobs Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isLatestJob}
                  onChange={(e) => setFilters({ ...filters, isLatestJob: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm">Latest Jobs Only</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              ref={index === jobs.length - 1 ? lastJobElementRef : null}
              onClick={() => navigate(`/job-details/${job._id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Job Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-gray-800 hover:text-primary">
                      {job.departmentName}
                    </h3>
                    {job.isLatestJob && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        Latest
                      </span>
                    )}
                  </div>

                  {/* Post Name */}
                  {job.postName && (
                    <p className="text-gray-600 font-medium mb-3">
                      Post: {job.postName}
                    </p>
                  )}

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                    {/* Total Posts */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Total Posts:</strong> {job.totalPost || 0}
                      </span>
                    </div>

                    {/* Application Type */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Mode:</strong> {job.modeOfForm}
                      </span>
                    </div>

                    {/* Payment Mode */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        <strong>Payment:</strong> {job.paymentMode}
                      </span>
                    </div>
                  </div>

                  {/* Important Dates */}
                  {job.importantDates && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        <strong>Start Date:</strong>{' '}
                        <span className="text-green-600 font-semibold">
                          {formatDate(job.importantDates.startDate)}
                        </span>
                      </span>
                      <span className="text-red-600 mx-2">⇔</span>
                      <span className="text-gray-600">
                        <strong>Last Date:</strong>{' '}
                        <span className="text-red-600 font-semibold">
                          {formatDate(job.importantDates.registrationLastDate)}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Registration Status */}
                  {job.isRegistrationOpen && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Registration Open
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        )}

        {/* No More Jobs */}
        {!loading && !pagination.hasMore && jobs.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 font-medium">No more jobs to load</p>
          </div>
        )}

        {/* No Jobs Found */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No jobs found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
