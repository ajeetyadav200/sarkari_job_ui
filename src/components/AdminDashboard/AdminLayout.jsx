// // components/layout/AdminLayout.jsx
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import TopNavbar from './TopNavbar';

// const AdminLayout = ({ children, user }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('dashboard');

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar 
//         isOpen={sidebarOpen} 
//         onClose={() => setSidebarOpen(false)}
//         activeMenu={activeMenu}
//         setActiveMenu={setActiveMenu}
//       />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <TopNavbar 
//           user={user} 
//           onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
//         />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


// components/AdminDashboard/AdminLayout.jsx
import React, { useState } from 'react';
import Sidebar from '../AdminDashboard/Sidebar';
import Header from '../AdminDashboard/TopNavbar';

const AdminLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;