import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  List
} from 'lucide-react';

const StatusFilter = ({ activeStatus, onStatusChange, stats, userRole = 'admin' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const filters = [
    { 
      id: '', 
      label: 'All Jobs', 
      icon: List, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100',
      route: 'admissions' 
    },
    { 
      id: 'pending', 
      label: 'Pending', 
      icon: AlertCircle, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      route: 'admissions/pending' 
    },
    { 
      id: 'verified', 
      label: 'Verified', 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      route: 'admissions/verified' 
    },
    { 
      id: 'rejected', 
      label: 'Rejected', 
      icon: XCircle, 
      color: 'text-red-600', 
      bgColor: 'bg-red-100',
      route: 'admissions/rejected' 
    },
    { 
      id: 'onHold', 
      label: 'On Hold', 
      icon: PauseCircle, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100',
      route: 'admissions/on-hold' 
    }
  ];

  const getStatusCount = (status) => {
    if (!stats?.statusWise) return 0;
    if (status === '') {
      return stats.totalAdmissions || 0;
    }
    const statusData = stats.statusWise.find(s => s._id === status);
    return statusData ? statusData.count : 0;
  };

  const handleStatusClick = (filterId, route) => {
    // Determine base path based on user role and current location
    let basePath = '';
    
    // Check current path to determine base path
    if (location.pathname.includes('/admin/')) {
      basePath = '/admin';
    } else if (location.pathname.includes('/publisher/')) {
      basePath = '/publisher';
    } else if (location.pathname.includes('/assistant/')) {
      basePath = '/assistant';
    } else {
      // Default based on userRole prop
      if (userRole === 'admin') {
        basePath = '/admin';
      } else if (userRole === 'publisher') {
        basePath = '/publisher';
      } else if (userRole === 'assistant') {
        basePath = '/assistant';
      }
    }
    
    // Navigate to the specific route
    navigate(`${basePath}/${route}`);
    
    // Also call the onStatusChange callback if provided
    if (onStatusChange) {
      onStatusChange(filterId);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const count = getStatusCount(filter.id);
        
        return (
          <button
            key={filter.id}
            onClick={() => handleStatusClick(filter.id, filter.route)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeStatus === filter.id 
                ? `${filter.bgColor} ${filter.color} border ${filter.color.replace('text-', 'border-')}`
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{filter.label}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              activeStatus === filter.id 
                ? 'bg-white text-gray-800'
                : `${filter.bgColor} ${filter.color}`
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;