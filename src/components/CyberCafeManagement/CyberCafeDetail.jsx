import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Monitor,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  ShieldOff,
  Trash2,
  ArrowLeft,
  RefreshCw,
  Lock,
  Unlock,
  Activity,
  Building,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7777";

const CyberCafeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCafeDetails();
  }, [id]);

  const fetchCafeDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCafe(data.data);
      } else {
        toast.error(data.message);
        navigate("/admin/cyber-cafes/all");
      }
    } catch (err) {
      toast.error("Failed to fetch cafe details");
      navigate("/admin/cyber-cafes/all");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}/verify`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Cyber cafe verified successfully");
        setCafe(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to verify cyber cafe");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnverify = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}/unverify`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Cyber cafe unverified");
        setCafe(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to unverify cyber cafe");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}/toggle-active`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setCafe((prev) => ({ ...prev, isActive: data.data.isActive }));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to toggle status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnlock = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}/unlock`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Account unlocked successfully");
        setCafe(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to unlock account");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this cyber cafe? This action cannot be undone.")) {
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Cyber cafe deleted successfully");
        navigate("/admin/cyber-cafes/all");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete cyber cafe");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className="p-6 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Cyber cafe not found</p>
        <Link
          to="/admin/cyber-cafes/all"
          className="mt-4 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to list
        </Link>
      </div>
    );
  }

  const isLocked = cafe.lockUntil && new Date(cafe.lockUntil) > new Date();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/cyber-cafes/all"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{cafe.cafeName}</h1>
            <p className="text-gray-600">{cafe.ownerName}</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2">
          {cafe.isVerified ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full">
              <CheckCircle className="w-4 h-4" /> Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 font-medium rounded-full">
              <Clock className="w-4 h-4" /> Pending Verification
            </span>
          )}
          {cafe.isActive ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full">
              <Activity className="w-4 h-4" /> Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 font-medium rounded-full">
              <XCircle className="w-4 h-4" /> Inactive
            </span>
          )}
          {isLocked && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 font-medium rounded-full">
              <Lock className="w-4 h-4" /> Account Locked
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cafe Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-600" />
              Cafe Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Cafe Name</label>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  {cafe.cafeName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Owner Name</label>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {cafe.ownerName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${cafe.email}`} className="text-purple-600 hover:underline">
                    {cafe.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${cafe.phone}`} className="text-purple-600 hover:underline">
                    {cafe.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cafe.address?.street && (
                <div>
                  <label className="text-sm text-gray-500">Street Address</label>
                  <p className="font-medium text-gray-800">{cafe.address.street}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500">City</label>
                <p className="font-medium text-gray-800">{cafe.address?.city || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">State</label>
                <p className="font-medium text-gray-800">{cafe.address?.state || "-"}</p>
              </div>
              {cafe.address?.pincode && (
                <div>
                  <label className="text-sm text-gray-500">Pincode</label>
                  <p className="font-medium text-gray-800">{cafe.address.pincode}</p>
                </div>
              )}
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Registered On</label>
                <p className="font-medium text-gray-800">
                  {new Date(cafe.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Updated</label>
                <p className="font-medium text-gray-800">
                  {new Date(cafe.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              {cafe.lastLogin && (
                <div>
                  <label className="text-sm text-gray-500">Last Login</label>
                  <p className="font-medium text-gray-800">
                    {new Date(cafe.lastLogin).toLocaleString("en-IN")}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500">Login Attempts</label>
                <p className="font-medium text-gray-800">{cafe.loginAttempts || 0}</p>
              </div>
              {isLocked && (
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Locked Until</label>
                  <p className="font-medium text-red-600">
                    {new Date(cafe.lockUntil).toLocaleString("en-IN")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>

            <div className="space-y-3">
              {/* Verify/Unverify */}
              {!cafe.isVerified ? (
                <button
                  onClick={handleVerify}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Shield className="w-5 h-5" />
                  Verify Cafe
                </button>
              ) : (
                <button
                  onClick={handleUnverify}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  <ShieldOff className="w-5 h-5" />
                  Unverify Cafe
                </button>
              )}

              {/* Activate/Deactivate */}
              <button
                onClick={handleToggleActive}
                disabled={actionLoading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors disabled:opacity-50 ${
                  cafe.isActive
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {cafe.isActive ? (
                  <>
                    <XCircle className="w-5 h-5" />
                    Deactivate Account
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Activate Account
                  </>
                )}
              </button>

              {/* Unlock Account */}
              {isLocked && (
                <button
                  onClick={handleUnlock}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Unlock className="w-5 h-5" />
                  Unlock Account
                </button>
              )}

              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
                Delete Cafe
              </button>
            </div>
          </div>

          {/* Status Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verification</span>
                {cafe.isVerified ? (
                  <span className="text-green-600 font-medium">Verified</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Status</span>
                {cafe.isActive ? (
                  <span className="text-blue-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-600 font-medium">Inactive</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lock Status</span>
                {isLocked ? (
                  <span className="text-red-600 font-medium">Locked</span>
                ) : (
                  <span className="text-green-600 font-medium">Unlocked</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberCafeDetail;
