import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import admitCardService from '../../services/admitCardService';

const AdmitCard = () => {
  const navigate = useNavigate();
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdmitCards();
  }, []);

  const fetchAdmitCards = async () => {
    try {
      setLoading(true);
      // Using the service method
      const response = await admitCardService.getPublicAdmitCards({
        page: 1,
        limit: 10,
        sortBy: 'publishDate',
        sortOrder: 'desc'
      });
      
      if (response.success) {
        setAdmitCards(response.data);
      } else {
        setError('Failed to load admit cards');
      }
    } catch (err) {
      console.error('Error fetching admit cards:', err);
      setError(err.response?.data?.message || 'Failed to load admit cards');
    } finally {
      setLoading(false);
    }
  };

  const isNew = (publishDate) => {
    if (!publishDate) return false;
    const cardDate = new Date(publishDate);
    const now = new Date();
    const diffDays = Math.floor((now - cardDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Show "NEW" badge for cards published in last 7 days
  };

  const handleCardClick = (id) => {
    navigate(`/admit-card-details/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Admit Card</h2>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-gray-600 text-sm">Loading admit cards...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <AlertCircle className="w-10 h-10 text-red-600" />
            <p className="text-red-600 text-sm text-center">{error}</p>
            <button
              onClick={fetchAdmitCards}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : admitCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <FileText className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600 text-sm">No admit cards available</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {admitCards.map((card) => (
              <li key={card._id} className="border-b border-dashed border-gray-300 pb-3 last:border-0">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">■</span>
                  <h3
                    onClick={() => handleCardClick(card._id)}
                    className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer flex items-center gap-2 flex-1"
                  >
                    {card?.postTypeDetails || card?.title || 'Admit Card'}
                    {isNew(card.publishDate) && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                    )}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!loading && !error && admitCards.length > 0 && (
        <div className="border-t border-gray-200 p-3 text-center">
          <button
            onClick={() => navigate('/admit-cards')}
            className="text-blue-700 font-semibold hover:text-blue-900 transition-colors text-sm"
          >
            View All Admit Cards →
          </button>
        </div>
      )}
    </div>
  );
};

export default AdmitCard