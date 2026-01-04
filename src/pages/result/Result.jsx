import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, FileText, Circle } from 'lucide-react';
import resultService from '../../services/resultService';

const Result = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await resultService.getPublicResults({
        page: pageNum,
        limit: 10,
        sortBy: 'publishDate',
        sortOrder: 'desc'
      });

      if (response.success) {
        if (pageNum === 1) {
          setResults(response.data);
        } else {
          setResults(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === 10);
        setPage(pageNum);
      } else {
        setError('Failed to load results');
      }
    } catch (err) {
      console.error('Error fetching results:', err);
      setError(err.response?.data?.message || 'Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchResults(page + 1);
  };

  const isNew = (publishDate) => {
    if (!publishDate) return false;
    const resultDate = new Date(publishDate);
    const now = new Date();
    const diffDays = Math.floor((now - resultDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const handleResultClick = (id) => {
    navigate(`/result-details/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with primary color */}
      <div className="bg-[rgb(0,142,228)] text-white p-4">
        <h2 className="text-2xl lg:text-2xl md:text-xl sm:text-base font-bold text-center">Results</h2>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {loading && page === 1 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-8 h-8 lg:w-8 lg:h-8 sm:w-6 sm:h-6 animate-spin text-[#1447e6]" />
            <p className="text-gray-600 text-base lg:text-base sm:text-xs">Loading results...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <AlertCircle className="w-10 h-10 lg:w-10 lg:h-10 sm:w-7 sm:h-7 text-red-600" />
            <p className="text-red-600 text-sm lg:text-base sm:text-xs text-center">{error}</p>
            <button
              onClick={() => fetchResults(1)}
              className="px-4 py-2 lg:px-4 lg:py-2 bg-[rgb(0,142,228)] text-white rounded hover:bg-[rgb(0,120,200)] transition-colors text-sm lg:text-base sm:text-xs sm:px-2 sm:py-1"
            >
              Try Again
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <FileText className="w-10 h-10 lg:w-10 lg:h-10 sm:w-7 sm:h-7 text-gray-400" />
            <p className="text-gray-600 text-sm lg:text-base sm:text-xs">No results available</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((result) => (
              <li key={result._id} className="border-b border-dashed border-gray-300 pb-3 last:border-0">
                <div className="flex items-start gap-2">
                  {/* Black circle instead of square */}
                   <Circle className="w-2.5 h-2.5 mt-2 bg-black rounded-full text-black" />
                  <h3
                    onClick={() => handleResultClick(result._id)}
                    className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-2 flex-1 text-base lg:text-base sm:text-xs"
                  >
                    {result?.postTypeDetails || result?.examName || 'Result'}
                    {isNew(result.publishDate) && (
                      <span className="bg-red-500 text-white text-xs lg:text-xs px-2 py-1 lg:px-2 lg:py-1 rounded sm:text-[10px] sm:px-1.5 sm:py-0.5">
                        NEW
                      </span>
                    )}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Load More Button */}
        {!loading && hasMore && results.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="px-4 py-2 lg:px-4 lg:py-2 bg-[rgb(0,142,228)] text-white rounded hover:bg-[rgb(0,120,200)] hover:underline transition-colors text-sm lg:text-base sm:text-xs sm:px-2 sm:py-1"
            >
              Load More
            </button>
          </div>
        )}

        {/* Loading more indicator */}
        {loading && page > 1 && (
          <div className="text-center mt-4">
            <Loader2 className="w-6 h-6 lg:w-6 lg:h-6 animate-spin text-[#1447e6] mx-auto sm:w-4 sm:h-4" />
            <p className="text-gray-600 text-sm lg:text-base mt-2 sm:text-xs">Loading more results...</p>
          </div>
        )}
      </div>

      {!loading && !error && results.length > 0 && (
        <div className="border-t border-gray-200 p-3 text-center">
          <button
            onClick={() => navigate('/results')}
            className="text-[#1447e6] font-semibold hover:text-blue-900 hover:underline transition-colors text-sm lg:text-base sm:text-xs"
          >
            View All Results →
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;