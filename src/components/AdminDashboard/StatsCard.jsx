// components/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, trend, description }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend > 0 
            ? 'text-green-600 bg-green-50' 
            : 'text-red-600 bg-red-50'
        }`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
    {description && (
      <p className="text-xs text-gray-500">{description}</p>
    )}
  </div>
);

export default StatsCard;