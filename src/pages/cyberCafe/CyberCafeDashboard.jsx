import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Monitor,
  Image,
  FileText,
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  Settings,
  Home,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7777";

const CyberCafeDashboard = () => {
  const navigate = useNavigate();
  const [cafeData, setCafeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchProfile();
  }, []);

  const checkAuthAndFetchProfile = async () => {
    const token = localStorage.getItem("cyberCafeToken");
    const cachedUser = localStorage.getItem("cyberCafeUser");

    // No token - redirect to login
    if (!token) {
      navigate("/cyber-cafe/login");
      return;
    }

    // Check if token is expired (JWT decode)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("cyberCafeToken");
        localStorage.removeItem("cyberCafeUser");
        navigate("/cyber-cafe/login");
        return;
      }
    } catch (e) {
      // Invalid token format
      localStorage.removeItem("cyberCafeToken");
      localStorage.removeItem("cyberCafeUser");
      navigate("/cyber-cafe/login");
      return;
    }

    // Use cached user data first for immediate display
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setCafeData(parsedUser);
        setIsLoading(false);
      } catch (e) {
        // Invalid cached data, will fetch from API
      }
    }

    // Fetch fresh data from API
    try {
      const response = await fetch(`${API_URL}/api/cyber-cafe/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setCafeData(data.data.cafe);
        // Update cached data
        localStorage.setItem("cyberCafeUser", JSON.stringify(data.data.cafe));
      } else {
        // API returned error but we have cached data, keep showing it
        if (!cachedUser) {
          toast.error("Session expired. Please login again.");
          handleLogout();
        }
      }
    } catch (error) {
      // Network error - if we have cached data, continue showing it
      if (!cachedUser) {
        toast.error("Failed to fetch profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("cyberCafeToken");

    try {
      await fetch(`${API_URL}/api/cyber-cafe/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    } catch (error) {
      // Ignore logout errors
    }

    localStorage.removeItem("cyberCafeToken");
    localStorage.removeItem("cyberCafeUser");
    toast.success("Logged out successfully");
    navigate("/cyber-cafe/login");
  };

  const tools = [
    {
      name: "Image Compressor",
      description: "Compress images to specific sizes (10KB, 20KB, etc.) for government forms",
      icon: Image,
      path: "/image-tool",
      color: "bg-orange-500",
    },
    {
      name: "PDF Tools",
      description: "Merge, split, and compress PDF documents",
      icon: FileText,
      path: "#",
      color: "bg-blue-500",
      comingSoon: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">{cafeData?.cafeName}</h1>
                <p className="text-sm text-purple-200">Cyber Cafe Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{cafeData?.ownerName}</h2>
                <p className="text-gray-500">{cafeData?.cafeName}</p>
                {cafeData?.isVerified ? (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    Verified
                  </span>
                ) : (
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                    Pending Verification
                  </span>
                )}
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{cafeData?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{cafeData?.phone}</span>
                </div>
                {cafeData?.address && (
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-sm">
                      {[
                        cafeData.address.street,
                        cafeData.address.city,
                        cafeData.address.state,
                        cafeData.address.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <Link
                  key={index}
                  to={tool.comingSoon ? "#" : tool.path}
                  className={`block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${
                    tool.comingSoon ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => tool.comingSoon && e.preventDefault()}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 ${tool.color} rounded-lg`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                        {tool.comingSoon && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Tips */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">1.</span>
                  Use the Image Tool to compress photos for government form uploads (passport photos, signatures)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">2.</span>
                  Most government forms require images between 10KB-200KB
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">3.</span>
                  Standard passport photo size is 3.5cm x 4.5cm (413 x 531 pixels)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">4.</span>
                  Always check the specific requirements on the form before uploading
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberCafeDashboard;
