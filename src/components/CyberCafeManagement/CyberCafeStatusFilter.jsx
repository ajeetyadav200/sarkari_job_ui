import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  Clock,
  Power,
  List
} from 'lucide-react';

const CyberCafeStatusFilter = ({ activeStatus, onStatusChange, stats }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const filters = [
    {
      id: '',
      label: 'All Cafes',
      icon: List,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      route: 'cyber-cafes/all'
    },
    {
      id: 'unverified',
      label: 'Pending',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      route: 'cyber-cafes/all?status=unverified'
    },
    {
      id: 'verified',
      label: 'Verified',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      route: 'cyber-cafes/all?status=verified'
    },
    {
      id: 'active',
      label: 'Active',
      icon: Power,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      route: 'cyber-cafes/all?status=active'
    },
    {
      id: 'inactive',
      label: 'Inactive',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      route: 'cyber-cafes/all?status=inactive'
    }
  ];

  const getStatusCount = (status) => {
    if (!stats) return 0;
    switch (status) {
      case '':
        return stats.total || 0;
      case 'verified':
        return stats.verified || 0;
      case 'unverified':
        return stats.unverified || 0;
      case 'active':
        return stats.active || 0;
      case 'inactive':
        return stats.inactive || 0;
      default:
        return 0;
    }
  };

  const handleStatusClick = (filterId, route) => {
    // Determine base path based on current location
    let basePath = '/admin';

    if (location.pathname.includes('/admin/')) {
      basePath = '/admin';
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

export default CyberCafeStatusFilter;
