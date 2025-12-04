// components/dashboard/RecentActivity.jsx
import React from 'react';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assistance': return '👥';
      case 'publisher': return '📝';
      case 'alert': return '🔔';
      case 'result': return '📊';
      default: return '📄';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assistance': return 'bg-blue-100 text-blue-600';
      case 'publisher': return 'bg-green-100 text-green-600';
      case 'alert': return 'bg-yellow-100 text-yellow-600';
      case 'result': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;