

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/auth";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState("admin");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // OTP state
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpData, setOtpData] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is already logged in
  useEffect(() => {
    const { valid } = isTokenValid();
    if (valid) {
      navigate("/");
    }
  }, [navigate]);

  const roles = [
    { id: "admin", name: "Admin", color: "bg-red-500", hoverColor: "hover:bg-red-600", icon: "👑" },
    { id: "assistant", name: "Assistant", color: "bg-blue-500", hoverColor: "hover:bg-blue-600", icon: "👥" },
    { id: "publisher", name: "Publisher", color: "bg-green-500", hoverColor: "hover:bg-green-600", icon: "📝" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (data.success) {
        // Store OTP data in state and localStorage
        const otpInfo = {
          userId: data.data.userId,
          hashedOTP: data.data.hashedOTP,
          otpExpiry: data.data.otpExpiry,
          maskedPhone: data.data.maskedPhone
        };

        setOtpData(otpInfo);
        localStorage.setItem("otpData", JSON.stringify(otpInfo));

        // Show OTP screen
        setShowOTPScreen(true);
        setError("");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate OTP
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: otpData.userId,
          otp: otp,
          hashedOTP: otpData.hashedOTP,
          otpExpiry: otpData.otpExpiry
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (data.success) {
        // Clear OTP data from localStorage
        localStorage.removeItem("otpData");

        // Store token in localStorage
        localStorage.setItem("token", data.token);

        // Dispatch user to Redux store
        dispatch(addUser(data.data.user));

        console.log("Login successful. User role:", data.data.user.role);

        // Redirect based on role
        switch (data.data.user.role) {
          case 'admin':
            navigate("/admin");
            break;
          case 'assistant':
            navigate("/assistant");
            break;
          case 'publisher':
            navigate("/publisher");
            break;
          default:
            navigate("/");
        }
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: otpData.userId
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (data.success) {
        // Update OTP data with new hashed OTP
        const updatedOtpInfo = {
          ...otpData,
          hashedOTP: data.data.hashedOTP,
          otpExpiry: data.data.otpExpiry
        };

        setOtpData(updatedOtpInfo);
        localStorage.setItem("otpData", JSON.stringify(updatedOtpInfo));

        setError("");
        alert("OTP resent successfully!");
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Resend OTP error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowOTPScreen(false);
    setOtp("");
    setOtpData(null);
    setError("");
    localStorage.removeItem("otpData");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Conditional Rendering: Login Form or OTP Form */}
        {!showOTPScreen ? (
          <>
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

        {/* Role Selection - Visual Only (Backend determines actual role) */}
        <div className="bg-gray-100 rounded-lg p-1">
          <p className="text-sm text-gray-600 text-center mb-3">
            Select your role for UI reference:
          </p>
          <div className="flex space-x-1">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role.id)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeRole === role.id
                    ? `${role.color} text-white shadow-md`
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                <span>{role.icon}</span>
                <span>{role.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in to your account"
            )}
          </button>

          {/* Demo Credentials Info */}
          <div className="text-center text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium mb-1">Demo Credentials</p>
            <p>Email: admin@example.com</p>
            <p>Password: Password123</p>
            <p className="text-xs mt-2 text-gray-500">
              * Backend will determine your actual role based on credentials
            </p>
          </div>
        </form>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              <p>Your actual role is determined by your account credentials</p>
            </div>
          </>
        ) : (
          <>
            {/* OTP Verification Screen */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Enter OTP
              </h2>
              <p className="text-gray-600">
                We've sent a 6-digit OTP to
              </p>
              <p className="text-indigo-600 font-semibold mt-1">
                {otpData?.maskedPhone}
              </p>
            </div>

            {/* OTP Form */}
            <form className="mt-8 space-y-6" onSubmit={handleOTPSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  One-Time Password
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  required
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setOtp(value);
                    setError("");
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit code sent to your phone
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                  loading || otp.length !== 6
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="text-indigo-600 hover:text-indigo-800 font-medium text-sm disabled:text-gray-400"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                >
                  ← Back to Login
                </button>
              </div>
            </form>

            {/* Info */}
            <div className="text-center text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p>OTP is valid for 10 minutes</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Import isTokenValid for the component
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false, user: null };

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp > currentTime) {
      return { valid: true, user: decoded };
    } else {
      localStorage.removeItem("token");
      return { valid: false, user: null };
    }
  } catch (err) {
    localStorage.removeItem("token");
    return { valid: false, user: null };
  }
};

export default LoginPage;