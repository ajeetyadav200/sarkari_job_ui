



// import { Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { addUser, clearUser } from "./utils/userSlice";
// import { isTokenValid } from "./utils/auth";

// import PrivateRoute from "./components/private/PrivateRoute";
// import LoginPage from "./authPage/LoginPage";

// import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
// // import AssistantDashboard from "./components/AdminDashboard/assistants/";
// import PublisherDashboard from "./components/PublisherDashboard/PublisherDashboard";

// // Publisher Pages
// import AddPublisher from "./components/AdminDashboard/publishers/AddPublisher";
// import AllPublishers from "./components/AdminDashboard/publishers/AllPublishers";
// import UpdatePublisher from "./components/AdminDashboard/publishers/UpdatePublisher";
// import RemovePublisher from "./components/AdminDashboard/publishers/RemovePublisher";

// import AddAssistance from "./components/AdminDashboard/assistants/AddAssistance";
// import AllAssistances from "./components/AdminDashboard/assistants/AllAssistances";
// import UpdateAssistance from "./components/AdminDashboard/assistants/UpdateAssistance";
// import RemoveAssistance from "./components/AdminDashboard/assistants/RemoveAssistance";

// import HandlePage from "./data/HandlePage";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const { valid, user } = isTokenValid();

//     if (valid && user) {
//       dispatch(addUser(user));
//     } else {
//       dispatch(clearUser());
//       localStorage.removeItem("token");
//     }
//   }, [dispatch]);

//   return (
//     <Routes>
//       {/* 🌟 MAIN HOME PAGE */}
//       <Route path="/" element={<HandlePage />} />

//       {/* 🌟 LOGIN PAGE */}
//       <Route path="/login" element={<LoginPage />} />

//       {/* PROTECTED ROUTES */}
//       <Route
//         path="/admin/*"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AdminDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* Publisher Management Routes */}
//       <Route
//         path="/admin/publishers/add"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AddPublisher />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/publishers/all"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AllPublishers />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/publishers/update/:id"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <UpdatePublisher />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/publishers/remove"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <RemovePublisher />
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/admin/assistances/add"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AddAssistance />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/assistances/all"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AllAssistances />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/assistances/update/:id"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <UpdateAssistance />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/admin/assistances/remove"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <RemoveAssistance />
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/publisher/*"
//         element={
//           <PrivateRoute requiredRole="publisher">
//             <PublisherDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* 🌟 DEFAULT ROLE REDIRECT */}
//       <Route path="*" element={<NavigateToRole />} />
//     </Routes>
//   );
// }

// /* 🌟 Auto redirect users by role */
// const NavigateToRole = () => {
//   const { valid, user } = isTokenValid();

//   if (!valid) return <Navigate to="/login" replace />;

//   switch (user?.role) {
//     case "admin":
//       return <Navigate to="/admin" replace />;
//     case "assistant":
//       return <Navigate to="/assistant" replace />;
//     case "publisher":
//       return <Navigate to="/publisher" replace />;
//     default:
//       return <Navigate to="/login" replace />;
//   }
// };

// export default App;




import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, clearUser } from "./utils/userSlice";
import { isTokenValid } from "./utils/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./components/private/PrivateRoute";
import LoginPage from "./authPage/LoginPage";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import JobDashboard from "./components/JobManagement/JobDashboard";
import JobDetail from "./components/JobManagement/JobDetail";
import JobForm from "./components/JobManagement/JobForm";

// Publisher Pages
import PublisherDashboard from "./components/PublisherDashboard/PublisherDashboard";
import AddPublisher from "./components/AdminDashboard/publishers/AddPublisher";
import AllPublishers from "./components/AdminDashboard/publishers/AllPublishers";
import UpdatePublisher from "./components/AdminDashboard/publishers/UpdatePublisher";
import RemovePublisher from "./components/AdminDashboard/publishers/RemovePublisher";

// Assistant Pages
import AddAssistance from "./components/AdminDashboard/assistants/AddAssistance";
import AllAssistances from "./components/AdminDashboard/assistants/AllAssistances";
import UpdateAssistance from "./components/AdminDashboard/assistants/UpdateAssistance";
import RemoveAssistance from "./components/AdminDashboard/assistants/RemoveAssistance";

// Assistant Dashboard
import AssistantDashboard from "./components/AssistantDashboard/AssistantDashboard";

import HandlePage from "./data/HandlePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { valid, user } = isTokenValid();

    if (valid && user) {
      dispatch(addUser(user));
    } else {
      dispatch(clearUser());
      localStorage.removeItem("token");
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Routes>
      {/* 🌟 MAIN HOME PAGE */}
      <Route path="/" element={<HandlePage />} />

      {/* 🌟 LOGIN PAGE */}
      <Route path="/login" element={<LoginPage />} />

      {/* PROTECTED ROUTES */}
      
      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Admin Job Routes */}
      <Route
        path="/admin/jobs"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDashboard mode="all" showStats={true} userRole="admin" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/pending"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDashboard mode="pending" userRole="admin" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/verified"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDashboard mode="verified" userRole="admin" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/rejected"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDashboard mode="rejected" userRole="admin" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/on-hold"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDashboard mode="onHold" userRole="admin" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <JobDetail />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/jobs/create"
        element={
          <PrivateRoute requiredRole="admin">
            <JobForm />
          </PrivateRoute>
        }
      />

      {/* Publisher Management Routes */}
      <Route
        path="/admin/publishers/add"
        element={
          <PrivateRoute requiredRole="admin">
            <AddPublisher />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/publishers/all"
        element={
          <PrivateRoute requiredRole="admin">
            <AllPublishers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/publishers/update/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <UpdatePublisher />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/publishers/remove"
        element={
          <PrivateRoute requiredRole="admin">
            <RemovePublisher />
          </PrivateRoute>
        }
      />

      {/* Assistant Management Routes */}
      <Route
        path="/admin/assistances/add"
        element={
          <PrivateRoute requiredRole="admin">
            <AddAssistance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/assistances/all"
        element={
          <PrivateRoute requiredRole="admin">
            <AllAssistances />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/assistances/update/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <UpdateAssistance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/assistances/remove"
        element={
          <PrivateRoute requiredRole="admin">
            <RemoveAssistance />
          </PrivateRoute>
        }
      />

      {/* Publisher Routes */}
      <Route
        path="/publisher/*"
        element={
          <PrivateRoute requiredRole="publisher">
            <PublisherDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/publisher/jobs"
        element={
          <PrivateRoute requiredRole="publisher">
            <JobDashboard mode="my" userRole="publisher" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/publisher/jobs/create"
        element={
          <PrivateRoute requiredRole="publisher">
            <JobForm />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/publisher/jobs/:id"
        element={
          <PrivateRoute requiredRole="publisher">
            <JobDetail />
          </PrivateRoute>
        }
      />

      {/* Assistant Routes */}
      <Route
        path="/assistant/*"
        element={
          <PrivateRoute requiredRole="assistant">
            <AssistantDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/assistant/jobs"
        element={
          <PrivateRoute requiredRole="assistant">
            <JobDashboard mode="my" userRole="assistant" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/assistant/jobs/create"
        element={
          <PrivateRoute requiredRole="assistant">
            <JobForm />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/assistant/jobs/:id"
        element={
          <PrivateRoute requiredRole="assistant">
            <JobDetail />
          </PrivateRoute>
        }
      />

      {/* 🌟 DEFAULT ROLE REDIRECT */}
      <Route path="*" element={<NavigateToRole />} />
    </Routes>
    </>
  );
}

/* 🌟 Auto redirect users by role */
const NavigateToRole = () => {
  const { valid, user } = isTokenValid();

  if (!valid) return <Navigate to="/login" replace />;

  switch (user?.role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "assistant":
      return <Navigate to="/assistant/jobs" replace />;
    case "publisher":
      return <Navigate to="/publisher/jobs" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default App;