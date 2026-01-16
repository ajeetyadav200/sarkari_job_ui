import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const CyberCafePrivateRoute = ({ children }) => {
  const location = useLocation();
  const [authState, setAuthState] = useState("loading"); // "loading" | "authenticated" | "unauthenticated"

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("cyberCafeToken");

      if (!token) {
        setAuthState("unauthenticated");
        return;
      }

      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("cyberCafeToken");
          localStorage.removeItem("cyberCafeUser");
          setAuthState("unauthenticated");
        } else {
          setAuthState("authenticated");
        }
      } catch (e) {
        // Invalid token format
        localStorage.removeItem("cyberCafeToken");
        localStorage.removeItem("cyberCafeUser");
        setAuthState("unauthenticated");
      }
    };

    checkAuth();
  }, [location.pathname]); // Re-check when route changes

  // Show loading spinner while checking auth
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (authState === "unauthenticated") {
    return <Navigate to="/cyber-cafe/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render children
  return children;
};

export default CyberCafePrivateRoute;
