
// import { Navigate } from "react-router-dom";
// import { isTokenValid } from "../utils/auth";

// const PrivateRoute = ({ children }) => {
//   const valid = isTokenValid();
 

//   if (!valid) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/auth";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole }) => {
  const { valid, user } = isTokenValid();
  const currentUser = useSelector(store => store.user);

  if (!valid) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'assistant':
        return <Navigate to="/assistant" replace />;
      case 'publisher':
        return <Navigate to="/publisher" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default PrivateRoute;