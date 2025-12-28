import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import resultService from '../../services/resultService';

const Result = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await resultService.getPublicResults({
        page: 1,
        limit: 10,
        sortBy: 'publishDate',
        sortOrder: 'desc'
      });

      if (response.success) {
        setResults(response.data);
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
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Results</h2>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            <p className="text-gray-600 text-sm">Loading results...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <AlertCircle className="w-10 h-10 text-red-600" />
            <p className="text-red-600 text-sm text-center">{error}</p>
            <button
              onClick={fetchResults}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <FileText className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600 text-sm">No results available</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((result) => (
              <li key={result._id} className="border-b border-dashed border-gray-300 pb-3 last:border-0">
                <div className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">■</span>
                  <h3
                    onClick={() => handleResultClick(result._id)}
                    className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer flex items-center gap-2 flex-1"
                  >
                    {result?.postTypeDetails || result?.examName || 'Result'}
                    {isNew(result.publishDate) && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                    )}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!loading && !error && results.length > 0 && (
        <div className="border-t border-gray-200 p-3 text-center">
          <button
            onClick={() => navigate('/results')}
            className="text-blue-700 font-semibold hover:text-blue-900 transition-colors text-sm"
          >
            View All Results →
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
