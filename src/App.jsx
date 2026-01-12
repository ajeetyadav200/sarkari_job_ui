


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
import JobList from "./pages/job/JobList";


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


//   governement is here 

import GovernmentServiceDashboard from './components/GovernmentServiceManagement/GovernmentServiceDashboard';
import GovernmentServiceDetail from './components/GovernmentServiceManagement/GovernmentServiceDetail';
import GovernmentServiceForm from './components/GovernmentServiceManagement/GovernmentServiceForm';
import GovernmentServiceCard from './components/GovernmentServiceManagement/GovernmentServiceCard'; 


// Admit Card Components
import AdmitCardDashboard from "./components/AdmitCardManagement/AdmitCardDashboard";
import AdmitCardList from "./components/AdmitCardManagement/AdmitCardList";
import AdmitCardDetail from "./components/AdmitCardManagement/AdmitCardDetail";
import AdmitCardForm from "./components/AdmitCardManagement/AdmitCardForm";

// Admission Components
import AdmissionDashboard from "./components/AdmissionManagement/AdmissionDashboard";
import AdmissionDetail from "./components/AdmissionManagement/AdmissionDetail";
import AdmissionForm from "./components/AdmissionManagement/AdmissionForm";

// Answer Components
import AnswerDashboard from "./components/AnswerManagement/AnswerDashboard";
import AnswerDetail from "./components/AnswerManagement/AnswerDetail";
import AnswerForm from "./components/AnswerManagement/AnswerForm";

import HandlePage from "./data/HandlePage";

import JobDetailPage from "./pages/job/JobDetailPage";
import AdmitCardDetails from "./pages/admitCard/AdmitCardDetails";
import ResultDetails from "./pages/result/ResultDetails";
import Layout from "./components/Layout/Layout";



// result is here

import ResultDashboard from './components/resultManagement/ResultDashboard';
import ResultDetail from './components/resultManagement/ResultDetail';
import ResultForm from './components/resultManagement/ResultForm';
import ResultList from './components/resultManagement/ResultList';
import AllAdmitCardList from "./pages/admitCard/AllAdmitCardList";
import AllResultList from "./pages/result/AllResultList";


// admission is here

import AdmissionDetailPage from './pages/admission/AdmissionDetailPage'
import AdmissionList  from './pages/admission/AdmissionList'

// answer key is here

import AnswerKeyDetailPage from './pages/answerkey/AnswerKeyDetailPage'
import AnswerKeyList from './pages/answerkey/AnswerKeyList'

// government page is here

import GovernmentServiceDetailPage from "./pages/governmentService/GovernmentServiceDetailPage";
import GovernmentServiceList from "./pages/governmentService/GovernmentServiceList";
import PolicyRouter from "./router/PolicyRouter";


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
       <Route path="/public/*" element={<PolicyRouter />} />

     

      {/* 🌟 PUBLIC JOB PAGES */}
      <Route path="/jobs" element={<Layout><JobList /></Layout>} />
      <Route path="/job-details/:id" element={<Layout><JobDetailPage /></Layout>} />
      {/* <Route path="/job-details" element={<Layout><JobDetailPage /></Layout>} /> */}

      <Route path="/admit-card-details/:id" element={<Layout><AdmitCardDetails /></Layout>} />
     {/* <Route path="/admit-cards" element={<Layout><AdmitCardDetails /></Layout>} /> */}
     <Route path="/AllAdmitCardList" element={<Layout><AllAdmitCardList /></Layout>} />


     {/* result is here */}

      <Route path="/result-details/:id" element={<Layout><ResultDetails /></Layout>} />
     {/* <Route path="/result-details" element={<Layout><ResultDetail /></Layout>} /> */}
      <Route path="/AllResultList" element={<Layout><AllResultList /></Layout>} />


      {/* admission details is here */}

     <Route path="/admission/:id" element={<Layout><AdmissionDetailPage /></Layout>} />
     <Route path="/allAdmission" element={<Layout><AdmissionList /></Layout>}/>


      {/* answer key details is here */}

     <Route path="/answer-key-details/:id" element={<Layout><AnswerKeyDetailPage /></Layout>} />
     <Route path="/answer-keys" element={<Layout><AnswerKeyList /></Layout>}/>


     {/* government page is here  */}

     <Route path="/government-service-details/:id" element={<Layout><GovernmentServiceDetailPage /></Layout>} />
     <Route path="/government-services-all" element={<Layout><GovernmentServiceList /></Layout>}/>


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

      <Route
        path="/admin/jobs/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <JobForm />
          </PrivateRoute>
        }
      />

      {/* Admin Admission Routes */}
      <Route
        path="/admin/admissions"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="all" showStats={true} userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/pending"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="pending" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/verified"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="verified" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/rejected"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="rejected" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/closed"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="closed" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/archived"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDashboard mode="archived" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/create"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/admissions/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <AdmissionForm />
          </PrivateRoute>
        }
      />

      {/* Admin Answer Routes */}
      <Route
        path="/admin/answers"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDashboard mode="all" showStats={true} userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/pending"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDashboard mode="pending" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/verified"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDashboard mode="verified" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/rejected"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDashboard mode="rejected" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/on-hold"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDashboard mode="onHold" userRole="admin" />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/create"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/answers/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <AnswerForm />
          </PrivateRoute>
        }
      />

           {/* Admin Admit Card Routes */}
        <Route
          path="/admin/admit-cards"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardDashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/all"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/pending"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/verified"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/rejected"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/on-hold"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/create"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardForm />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/:id"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardDetail />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/admit-cards/:id/edit"
          element={
            <PrivateRoute requiredRole="admin">
              <AdmitCardForm />
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

      <Route
  path="/admin/results"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDashboard mode="all" showStats={true} userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/pending"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDashboard mode="pending" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/verified"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDashboard mode="verified" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/rejected"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDashboard mode="rejected" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/on-hold"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDashboard mode="onHold" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/:id"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultDetail />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/create"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultForm />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/results/:id/edit"
  element={
    <PrivateRoute requiredRole="admin">
      <ResultForm />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDashboard mode="all" showStats={true} userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/pending"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDashboard mode="pending" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/verified"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDashboard mode="verified" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/rejected"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDashboard mode="rejected" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/on-hold"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDashboard mode="onHold" userRole="admin" />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/create"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceForm />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/:id"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceDetail />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/government-services/edit/:id"
  element={
    <PrivateRoute requiredRole="admin">
      <GovernmentServiceForm />
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

      {/* Publisher Answer Routes */}
      <Route
        path="/publisher/answers"
        element={
          <PrivateRoute requiredRole="publisher">
            <AnswerDashboard mode="my" userRole="publisher" />
          </PrivateRoute>
        }
      />

      <Route
        path="/publisher/answers/create"
        element={
          <PrivateRoute requiredRole="publisher">
            <AnswerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/publisher/answers/:id"
        element={
          <PrivateRoute requiredRole="publisher">
            <AnswerDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/publisher/answers/edit/:id"
        element={
          <PrivateRoute requiredRole="publisher">
            <AnswerForm />
          </PrivateRoute>
        }
      />

        <Route
          path="/publisher/admit-cards"
          element={
            <PrivateRoute requiredRole="publisher">
              <AdmitCardList userRole="publisher" mode="my" />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/publisher/admit-cards/create"
          element={
            <PrivateRoute requiredRole="publisher">
              <AdmitCardForm />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/publisher/admit-cards/:id"
          element={
            <PrivateRoute requiredRole="publisher">
              <AdmitCardDetail />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/publisher/admit-cards/:id/edit"
          element={
            <PrivateRoute requiredRole="publisher">
              <AdmitCardForm />
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

      {/* Assistant Answer Routes */}
      <Route
        path="/assistant/answers"
        element={
          <PrivateRoute requiredRole="assistant">
            <AnswerDashboard mode="my" userRole="assistant" />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/answers/create"
        element={
          <PrivateRoute requiredRole="assistant">
            <AnswerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/answers/:id"
        element={
          <PrivateRoute requiredRole="assistant">
            <AnswerDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/answers/edit/:id"
        element={
          <PrivateRoute requiredRole="assistant">
            <AnswerForm />
          </PrivateRoute>
        }
      />

        {/* Assistant Admit Card Routes */}
        <Route
          path="/assistant/admit-cards"
          element={
            <PrivateRoute requiredRole="assistant">
              <AdmitCardList userRole="assistant" mode="my" />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/assistant/admit-cards/create"
          element={
            <PrivateRoute requiredRole="assistant">
              <AdmitCardForm />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/assistant/admit-cards/:id"
          element={
            <PrivateRoute requiredRole="assistant">
              <AdmitCardDetail />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/assistant/admit-cards/:id/edit"
          element={
            <PrivateRoute requiredRole="assistant">
              <AdmitCardForm />
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