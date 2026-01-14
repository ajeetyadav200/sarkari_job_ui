import { Navigate } from "react-router-dom";

const CyberCafePrivateRoute = ({ children }) => {
  const token = localStorage.getItem("cyberCafeToken");

  if (!token) {
    return <Navigate to="/cyber-cafe/login" replace />;
  }

  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("cyberCafeToken");
      localStorage.removeItem("cyberCafeUser");
      return <Navigate to="/cyber-cafe/login" replace />;
    }
  } catch (e) {
    // Invalid token format
    localStorage.removeItem("cyberCafeToken");
    localStorage.removeItem("cyberCafeUser");
    return <Navigate to="/cyber-cafe/login" replace />;
  }

  return children;
};

export default CyberCafePrivateRoute;
