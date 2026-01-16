import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Monitor,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Shield,
  ShieldOff,
  Unlock,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7777";

const CyberCafeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cyberCafes, setCyberCafes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCafes, setSelectedCafes] = useState([]);
  const [actionMenuId, setActionMenuId] = useState(null);

  // Search and filter states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [state, setState] = useState(searchParams.get("state") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchCyberCafes = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: debouncedSearch,
        status,
        state,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`${API_URL}/api/admin/cyber-cafes?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCyberCafes(data.data.cyberCafes);
        setPagination(data.data.pagination);
        setStats(data.data.stats);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch cyber cafes");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status, state, sortBy, sortOrder]);

  useEffect(() => {
    fetchCyberCafes();
  }, [fetchCyberCafes]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    if (state) params.set("state", state);
    if (sortBy !== "createdAt") params.set("sortBy", sortBy);
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder);
    if (page > 1) params.set("page", page.toString());
    setSearchParams(params);
  }, [search, status, state, sortBy, sortOrder, page, setSearchParams]);

  const handleVerify = async (id) => {
    try {
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
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to verify cyber cafe");
    }
    setActionMenuId(null);
  };

  const handleUnverify = async (id) => {
    try {
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
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to unverify cyber cafe");
    }
    setActionMenuId(null);
  };

  const handleToggleActive = async (id) => {
    try {
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
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to toggle status");
    }
    setActionMenuId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cyber cafe?")) return;

    try {
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
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete cyber cafe");
    }
    setActionMenuId(null);
  };

  const handleUnlock = async (id) => {
    try {
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
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to unlock account");
    }
    setActionMenuId(null);
  };

  const handleBulkVerify = async () => {
    if (selectedCafes.length === 0) {
      toast.warning("Please select cafes to verify");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/cyber-cafes/bulk-verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedCafes }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setSelectedCafes([]);
        fetchCyberCafes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to bulk verify");
    }
  };

  const handleSelectAll = () => {
    if (selectedCafes.length === cyberCafes.length) {
      setSelectedCafes([]);
    } else {
      setSelectedCafes(cyberCafes.map((cafe) => cafe._id));
    }
  };

  const handleSelectCafe = (id) => {
    setSelectedCafes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setState("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const statusTabs = [
    { value: "all", label: "All", count: stats.total },
    { value: "verified", label: "Verified", count: stats.verified },
    { value: "unverified", label: "Unverified", count: stats.unverified },
    { value: "active", label: "Active", count: stats.active },
    { value: "inactive", label: "Inactive", count: stats.inactive },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Monitor className="w-8 h-8 text-purple-600" />
            All Cyber Cafes
          </h1>
          <p className="text-gray-600 mt-1">
            {pagination.totalItems || 0} total cafes
          </p>
        </div>
        <Link
          to="/admin/cyber-cafes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2 flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatus(tab.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              status === tab.value
                ? "bg-purple-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by cafe name, owner, email, phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="w-full md:w-48">
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Filter by state"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="createdAt">Date</option>
              <option value="cafeName">Name</option>
              <option value="address.state">State</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>

          {/* Clear Filters */}
          {(search || status !== "all" || state) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedCafes.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
            <span className="text-purple-700 font-medium">
              {selectedCafes.length} selected
            </span>
            <button
              onClick={handleBulkVerify}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Verify All
            </button>
            <button
              onClick={() => setSelectedCafes([])}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : cyberCafes.length === 0 ? (
          <div className="text-center py-12">
            <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No cyber cafes found</p>
            {search && (
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCafes.length === cyberCafes.length}
                      onChange={handleSelectAll}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Cafe Details
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Registered
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cyberCafes.map((cafe) => (
                  <tr key={cafe._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCafes.includes(cafe._id)}
                        onChange={() => handleSelectCafe(cafe._id)}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Monitor className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{cafe.cafeName}</p>
                          <p className="text-sm text-gray-500">{cafe.ownerName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {cafe.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {cafe.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {cafe.address?.city}, {cafe.address?.state}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {cafe.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full w-fit">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full w-fit">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                        {!cafe.isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full w-fit">
                            <XCircle className="w-3 h-3" /> Inactive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">
                        {new Date(cafe.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex justify-center">
                        <button
                          onClick={() =>
                            setActionMenuId(actionMenuId === cafe._id ? null : cafe._id)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {actionMenuId === cafe._id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border z-10">
                            <Link
                              to={`/admin/cyber-cafes/${cafe._id}`}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                              <Eye className="w-4 h-4" /> View Details
                            </Link>
                            {!cafe.isVerified ? (
                              <button
                                onClick={() => handleVerify(cafe._id)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-green-600"
                              >
                                <Shield className="w-4 h-4" /> Verify
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnverify(cafe._id)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-yellow-600"
                              >
                                <ShieldOff className="w-4 h-4" /> Unverify
                              </button>
                            )}
                            <button
                              onClick={() => handleToggleActive(cafe._id)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left"
                            >
                              {cafe.isActive ? (
                                <>
                                  <XCircle className="w-4 h-4 text-red-500" /> Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-500" /> Activate
                                </>
                              )}
                            </button>
                            {cafe.lockUntil && new Date(cafe.lockUntil) > new Date() && (
                              <button
                                onClick={() => handleUnlock(cafe._id)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-blue-600"
                              >
                                <Unlock className="w-4 h-4" /> Unlock Account
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(cafe._id)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-red-600"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      page === pageNum
                        ? "bg-purple-600 text-white border-purple-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close action menu */}
      {actionMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActionMenuId(null)}
        />
      )}
    </div>
  );
};

export default CyberCafeList;
