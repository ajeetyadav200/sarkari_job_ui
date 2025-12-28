import React from 'react';

const StatusFilter = ({ selectedStatus, onStatusChange }) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'verified', label: 'Verified', color: 'success' },
    { value: 'rejected', label: 'Rejected', color: 'danger' },
    { value: 'onHold', label: 'On Hold', color: 'info' }
  ];

  return (
    <div className="btn-group" role="group">
      {statusOptions.map(status => (
        <button
          key={status.value}
          type="button"
          className={`btn btn-outline-${status.color || 'secondary'} ${selectedStatus === status.value ? 'active' : ''}`}
          onClick={() => onStatusChange(status.value)}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;