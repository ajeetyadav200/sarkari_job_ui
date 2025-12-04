// // import { useState } from "react";

// // const LoginPage = () => {
// //   const [selectedRole, setSelectedRole] = useState("admin");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const roles = [
// //     { id: "admin", label: "Admin", icon: "👑" },
// //     { id: "assistant", label: "Assistant", icon: "🤝" },
// //     { id: "publisher", label: "Publisher", icon: "📝" }
// //   ];

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       // Replace with your actual BASE_URL
// //       const BASE_URL = "http://localhost:7777";
      
// //       const response = await fetch(`${BASE_URL}/api/auth/login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //           role: selectedRole,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         localStorage.setItem("token", data.token);
// //         // Dispatch to Redux store
// //         // dispatch(addUser(data.user));
// //         // Navigate to home
// //         // navigate("/");
// //         console.log("Login successful", data);
// //       } else {
// //         setError(data.message || "Login failed. Please try again.");
// //       }
// //     } catch (err) {
// //       setError("Network error. Please check your connection.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         {/* Role Selection Buttons */}
// //         <div className="bg-white rounded-t-2xl shadow-2xl p-6">
// //           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// //             Select Your Role
// //           </h2>
// //           <div className="grid grid-cols-3 gap-3">
// //             {roles.map((role) => (
// //               <button
// //                 key={role.id}
// //                 onClick={() => setSelectedRole(role.id)}
// //                 className={`p-4 rounded-xl border-2 transition-all duration-300 ${
// //                   selectedRole === role.id
// //                     ? "border-indigo-600 bg-indigo-50 shadow-lg scale-105"
// //                     : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
// //                 }`}
// //               >
// //                 <div className="text-3xl mb-2">{role.icon}</div>
// //                 <div
// //                   className={`text-sm font-semibold ${
// //                     selectedRole === role.id
// //                       ? "text-indigo-600"
// //                       : "text-gray-600"
// //                   }`}
// //                 >
// //                   {role.label}
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Login Form */}
// //         <div className="bg-white rounded-b-2xl shadow-2xl p-8">
// //           <div className="mb-6">
// //             <h3 className="text-xl font-bold text-gray-800 text-center">
// //               Welcome Back!
// //             </h3>
// //             <p className="text-gray-500 text-center text-sm mt-1">
// //               Login as{" "}
// //               <span className="font-semibold text-indigo-600 capitalize">
// //                 {selectedRole}
// //               </span>
// //             </p>
// //           </div>

// //           {error && (
// //             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
// //               <p className="text-red-600 text-sm text-center">{error}</p>
// //             </div>
// //           )}

// //           <div className="space-y-5">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Email Address
// //               </label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
// //                 placeholder="Enter your email"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
// //                 placeholder="Enter your password"
// //               />
// //             </div>

// //             <div className="flex items-center justify-between text-sm">
// //               <label className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
// //                 />
// //                 <span className="ml-2 text-gray-600">Remember me</span>
// //               </label>
// //               <button
// //                 type="button"
// //                 className="text-indigo-600 hover:text-indigo-800 font-medium"
// //               >
// //                 Forgot password?
// //               </button>
// //             </div>

// //             <button
// //               onClick={handleLogin}
// //               disabled={loading}
// //               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {loading ? (
// //                 <span className="flex items-center justify-center">
// //                   <svg
// //                     className="animate-spin h-5 w-5 mr-2"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <circle
// //                       className="opacity-25"
// //                       cx="12"
// //                       cy="12"
// //                       r="10"
// //                       stroke="currentColor"
// //                       strokeWidth="4"
// //                       fill="none"
// //                     />
// //                     <path
// //                       className="opacity-75"
// //                       fill="currentColor"
// //                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                     />
// //                   </svg>
// //                   Logging in...
// //                 </span>
// //               ) : (
// //                 "Login"
// //               )}
// //             </button>
// //           </div>

// //           <div className="mt-6 text-center">
// //             <p className="text-sm text-gray-600">
// //               Don't have an account?{" "}
// //               <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
// //                 Contact Admin
// //               </button>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { BASE_URL } from "../utils/auth";

// const LoginPage = () => {
//   const [activeRole, setActiveRole] = useState("admin");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Check if user is already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const roles = [
//     { id: "admin", name: "Admin", color: "bg-red-500", hoverColor: "hover:bg-red-600" },
//     { id: "assistant", name: "Assistant", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
//     { id: "publisher", name: "Publisher", color: "bg-green-500", hoverColor: "hover:bg-green-600" }
//   ];

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError(""); // Clear error when user starts typing
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include"
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store token in localStorage
//         localStorage.setItem("token", data.token);
        
//         // Dispatch user to Redux store
//         dispatch(addUser(data.data.user));
        
//         // Redirect based on role
//         switch (data.data.user.role) {
//           case 'admin':
//             navigate("/admin");
//             break;
//           case 'assistant':
//             navigate("/assistant");
//             break;
//           case 'publisher':
//             navigate("/publisher");
//             break;
//           default:
//             navigate("/");
//         }
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         {/* Role Selection Tabs */}
//         <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
//           {roles.map((role) => (
//             <button
//               key={role.id}
//               onClick={() => setActiveRole(role.id)}
//               className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//                 activeRole === role.id
//                   ? `${role.color} text-white shadow-md`
//                   : "text-gray-600 hover:text-gray-900 hover:bg-white"
//               }`}
//             >
//               {role.name}
//             </button>
//           ))}
//         </div>

//         {/* Login Form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : roles.find(r => r.id === activeRole)?.color + " " + 
//                   roles.find(r => r.id === activeRole)?.hoverColor + 
//                   " focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
//             }`}
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
//                 Signing in...
//               </div>
//             ) : (
//               `Sign in as ${roles.find(r => r.id === activeRole)?.name}`
//             )}
//           </button>

//           {/* Demo Credentials Info */}
//           <div className="text-center text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
//             <p className="font-medium mb-1">Demo Credentials</p>
//             <p>Email: admin@example.com</p>
//             <p>Password: Password123</p>
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="text-center text-sm text-gray-500">
//           <p>Select your role and enter your credentials to continue</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



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
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        
        // Dispatch user to Redux store
        dispatch(addUser(data.data.user));
        
        console.log("Login successful. User role:", data.data.user.role);
        
        // Redirect based on ACTUAL role from backend
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
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
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