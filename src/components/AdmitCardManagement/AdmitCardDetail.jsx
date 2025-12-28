import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchAdmitCardById, deleteAdmitCard } from '../../slice/admitCardSlice';
import { toast } from 'react-toastify';

const AdmitCardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { currentAdmitCard, loading } = useSelector(state => state?.admitCards);
   const user = useSelector(store => store?.user);

  useEffect(() => {
    dispatch(fetchAdmitCardById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this admit card?')) {
      await dispatch(deleteAdmitCard(id));
      toast.success('Admit card deleted successfully');
      navigate('/admit-cards');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      verified: 'success',
      rejected: 'danger',
      onHold: 'info'
    };
    return colors[status] || 'secondary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentAdmitCard) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Admit Card Not Found</h4>
          <p>The admit card you're looking for doesn't exist or you don't have permission to view it.</p>
          <hr />
          <Link to="/admit-cards" className="btn btn-primary">
            <i className="fas fa-arrow-left me-2"></i>Back to List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">
                  <i className="fas fa-file-alt me-2"></i>
                  Admit Card Details
                </h4>
                <p className="mb-0 small">ID: {currentAdmitCard._id}</p>
              </div>
              <div>
                <span className={`badge bg-${getStatusColor(currentAdmitCard.status)} me-2`}>
                  {currentAdmitCard.status.toUpperCase()}
                </span>
                <span className={`badge bg-${currentAdmitCard.admitCardStatus === 'active' ? 'success' : 'secondary'}`}>
                  {currentAdmitCard.admitCardStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="card-body">
              {/* Action Buttons */}
              <div className="d-flex justify-content-end mb-4">
                {(user.role === 'admin' || currentAdmitCard.createdBy === user._id) && (
                  <Link 
                    to={`/admit-cards/${id}/edit`}
                    className="btn btn-primary me-2"
                  >
                    <i className="fas fa-edit me-2"></i>Edit
                  </Link>
                )}
                {(user.role === 'admin' || currentAdmitCard.createdBy === user._id) && (
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash me-2"></i>Delete
                  </button>
                )}
              </div>

              {/* Main Information */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Basic Information</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th style={{ width: '40%' }}>Type</th>
                        <td>
                          <span className={`badge bg-${currentAdmitCard.type === 'job' ? 'primary' : 'info'}`}>
                            {currentAdmitCard.type}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Reference</th>
                        <td>
                          {currentAdmitCard.referenceId ? (
                            <div>
                              <strong>{currentAdmitCard.referenceId.title}</strong>
                              <div className="small text-muted">
                                {currentAdmitCard.referenceModel} | 
                                ID: {currentAdmitCard.referenceId._id}
                              </div>
                            </div>
                          ) : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th>Link Menu Field</th>
                        <td>{currentAdmitCard.linkMenuField || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Post Type Details</th>
                        <td>{currentAdmitCard.postTypeDetails || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{currentAdmitCard.category || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <h5>Dates & URLs</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th style={{ width: '40%' }}>Publish Date</th>
                        <td>{formatDate(currentAdmitCard.publishDate)}</td>
                      </tr>
                      <tr>
                        <th>Last Date</th>
                        <td>{currentAdmitCard.lastDate ? formatDate(currentAdmitCard.lastDate) : 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Direct URL</th>
                        <td>
                          {currentAdmitCard.directWebURL ? (
                            <a 
                              href={currentAdmitCard.directWebURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <i className="fas fa-external-link-alt me-2"></i>
                              {currentAdmitCard.directWebURL}
                            </a>
                          ) : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th>Also Show Link</th>
                        <td>
                          <span className={`badge bg-${currentAdmitCard.alsoShowLink ? 'success' : 'secondary'}`}>
                            {currentAdmitCard.alsoShowLink ? 'Yes' : 'No'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Tags</th>
                        <td>
                          {currentAdmitCard.tags && currentAdmitCard.tags.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {currentAdmitCard.tags.map(tag => (
                                <span key={tag} className="badge bg-secondary">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Post Details */}
              <div className="mb-4">
                <h5>Post Details</h5>
                <div className="card">
                  <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: currentAdmitCard.postDetails }} />
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Created By</h5>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                               style={{ width: '50px', height: '50px' }}>
                            <i className="fas fa-user"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">{currentAdmitCard.createdByDetails?.name || 'N/A'}</h6>
                          <p className="mb-1 small text-muted">
                            <i className="fas fa-envelope me-1"></i>
                            {currentAdmitCard.createdByDetails?.email || 'N/A'}
                          </p>
                          <p className="mb-1 small text-muted">
                            <i className="fas fa-user-tag me-1"></i>
                            {currentAdmitCard.createdByDetails?.role || 'N/A'}
                          </p>
                          <p className="mb-0 small text-muted">
                            <i className="fas fa-phone me-1"></i>
                            {currentAdmitCard.createdByDetails?.phone || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified By Section */}
                {currentAdmitCard.verifiedBy && (
                  <div className="col-md-6">
                    <h5>Verified By</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '50px', height: '50px' }}>
                              <i className="fas fa-user-check"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">{currentAdmitCard.verifiedByDetails?.name || 'N/A'}</h6>
                            <p className="mb-1 small text-muted">
                              <i className="fas fa-envelope me-1"></i>
                              {currentAdmitCard.verifiedByDetails?.email || 'N/A'}
                            </p>
                            <p className="mb-1 small text-muted">
                              <i className="fas fa-user-tag me-1"></i>
                              {currentAdmitCard.verifiedByDetails?.role || 'N/A'}
                            </p>
                            <p className="mb-0 small text-muted">
                              <i className="fas fa-calendar-check me-1"></i>
                              Verified at: {formatDate(currentAdmitCard.verifiedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rejection Reason (if rejected) */}
              {currentAdmitCard.status === 'rejected' && currentAdmitCard.rejectionReason && (
                <div className="mb-4">
                  <h5>Rejection Reason</h5>
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {currentAdmitCard.rejectionReason}
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="d-flex justify-content-center">
                <Link to="/admit-cards" className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-2"></i>Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardDetail;