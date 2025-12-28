import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAdmitCards, 
  deleteAdmitCard, 
  updateAdmitCardStatus,
  setFilters 
} from '../../slice/admitCardSlice'; // ✅ CORRECT IMPORT PATH
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import StatusFilter from './StatusFilter';

const AdmitCardList = ({ userRole = 'admin', mode = 'all' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { list, loading, error, pagination, filters } = useSelector(state => state.admitCards);
  const { user } = useSelector(state => state.auth);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Set initial filters based on mode
    const initialFilters = {};
    
    if (mode === 'my') {
      // Show only user's admit cards for publisher/assistant
      initialFilters.createdBy = user._id;
    } else if (mode === 'pending') {
      initialFilters.status = 'pending';
    } else if (mode === 'verified') {
      initialFilters.status = 'verified';
    } else if (mode === 'rejected') {
      initialFilters.status = 'rejected';
    } else if (mode === 'onHold') {
      initialFilters.status = 'onHold';
    }
    
    dispatch(setFilters(initialFilters));
    loadAdmitCards();
  }, [mode, user._id, dispatch]);

  useEffect(() => {
    loadAdmitCards();
  }, [filters]);

  const loadAdmitCards = () => {
    const queryParams = { 
      ...filters, 
      page: pagination.currentPage,
      limit: 10
    };
    dispatch(fetchAdmitCards(queryParams));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    dispatch(setFilters({ status: status || '' }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admit card?')) {
      await dispatch(deleteAdmitCard(id));
      loadAdmitCards();
    }
  };

  const handleStatusUpdate = async (id, status) => {
    if (status === 'rejected') {
      const reason = prompt('Please enter rejection reason:');
      if (!reason) {
        toast.error('Rejection reason is required');
        return;
      }
      await dispatch(updateAdmitCardStatus({ id, status, rejectionReason: reason }));
    } else {
      await dispatch(updateAdmitCardStatus({ id, status }));
    }
    loadAdmitCards();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'warning',
      verified: 'success',
      rejected: 'danger',
      onHold: 'info'
    };
    return statusMap[status] || 'secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getPageTitle = () => {
    const titles = {
      all: 'All Admit Cards',
      my: 'My Admit Cards',
      pending: 'Pending Admit Cards',
      verified: 'Verified Admit Cards',
      rejected: 'Rejected Admit Cards',
      onHold: 'On Hold Admit Cards'
    };
    return titles[mode] || 'Admit Cards';
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-0">{getPageTitle()}</h2>
          <p className="text-muted">
            {mode === 'my' ? 'Your admit cards' : `Manage all ${mode} admit cards`}
          </p>
        </div>
        <div className="col-md-4 text-end">
          {(userRole === 'admin' || userRole === 'assistant' || userRole === 'publisher') && (
            <Link 
              to={`/${userRole}/admit-cards/create`} 
              className="btn btn-primary"
            >
              <i className="fas fa-plus me-2"></i>Create New Admit Card
            </Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-8">
              <form onSubmit={handleSearch} className="row g-2">
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title, category, or details..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-secondary">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <StatusFilter 
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </form>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end gap-2">
                <select 
                  className="form-select form-select-sm w-auto"
                  value={filters.type}
                  onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
                >
                  <option value="">All Types</option>
                  <option value="job">Job</option>
                  <option value="admission">Admission</option>
                  <option value="latestNotice">Latest Notice</option>
                  <option value="other">Other</option>
                </select>
                <select 
                  className="form-select form-select-sm w-auto"
                  value={filters.admitCardStatus}
                  onChange={(e) => dispatch(setFilters({ admitCardStatus: e.target.value }))}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title/Details</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Publish Date</th>
                  <th>Last Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No admit cards found
                    </td>
                  </tr>
                ) : (
                  list.map((admitCard) => (
                    <tr key={admitCard._id}>
                      <td>
                        <span className={`badge bg-${admitCard.type === 'job' ? 'primary' : 'info'}`}>
                          {admitCard.type}
                        </span>
                      </td>
                      <td>
                        <div>
                          <strong>{admitCard.postTypeDetails || 'No Title'}</strong>
                          <div className="small text-muted">
                            {admitCard.postDetails.substring(0, 100)}...
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(admitCard.status)}`}>
                          {admitCard.status}
                        </span>
                        {admitCard.admitCardStatus === 'inactive' && (
                          <span className="badge bg-secondary ms-1">Inactive</span>
                        )}
                      </td>
                      <td>
                        <div className="small">
                          {admitCard.createdByDetails?.name || 'N/A'}
                          <br />
                          <span className="text-muted">{admitCard.createdByDetails?.role}</span>
                        </div>
                      </td>
                      <td>{formatDate(admitCard.publishDate)}</td>
                      <td>{admitCard.lastDate ? formatDate(admitCard.lastDate) : 'N/A'}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link 
                            to={`/${userRole}/admit-cards/${admitCard._id}`}
                            className="btn btn-outline-info"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          
                          {(userRole === 'admin' || admitCard.createdBy === user._id) && (
                            <Link 
                              to={`/${userRole}/admit-cards/${admitCard._id}/edit`}
                              className="btn btn-outline-primary"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                          )}
                          
                          {userRole === 'admin' && (
                            <>
                              {admitCard.status !== 'verified' && (
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => handleStatusUpdate(admitCard._id, 'verified')}
                                  title="Verify"
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                              )}
                              {admitCard.status !== 'rejected' && (
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleStatusUpdate(admitCard._id, 'rejected')}
                                  title="Reject"
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              )}
                              {admitCard.status !== 'onHold' && (
                                <button
                                  className="btn btn-outline-warning"
                                  onClick={() => handleStatusUpdate(admitCard._id, 'onHold')}
                                  title="Put on Hold"
                                >
                                  <i className="fas fa-pause"></i>
                                </button>
                              )}
                            </>
                          )}
                          
                          {(userRole === 'admin' || admitCard.createdBy === user._id) && (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(admitCard._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => dispatch(setFilters({ page: pagination.currentPage - 1 }))}
                  >
                    Previous
                  </button>
                </li>
                
                {[...Array(pagination.totalPages).keys()].map(pageNum => (
                  <li 
                    key={pageNum + 1}
                    className={`page-item ${pagination.currentPage === pageNum + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => dispatch(setFilters({ page: pageNum + 1 }))}
                    >
                      {pageNum + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => dispatch(setFilters({ page: pagination.currentPage + 1 }))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmitCardList;