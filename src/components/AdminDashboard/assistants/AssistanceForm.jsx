



// import React, { useState } from "react";
// import { X, Save, Loader, User, Mail, Lock } from "lucide-react";
// import ApiService from "../../../services/api";

// const AssistanceForm = ({ onClose, onSuccess, editData }) => {
//   const [formData, setFormData] = useState({
//     firstName: editData?.firstName || "",
//     lastName: editData?.lastName || "",
//     email: editData?.email || "",
//     password: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       if (editData) {
//         const updatedPayload = {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email
//         };

//         await ApiService.assistants.update(editData._id, updatedPayload);
//         onSuccess("Assistant updated successfully");
//       } else {
//         await ApiService.assistants.create(formData);
//         onSuccess("Assistant created successfully");
//         navigate(`/admin/assistances/all`);
        
//       }

//       onClose();
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn scale-95">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h3 className="text-xl font-semibold text-gray-800">
//             {editData ? "Edit Assistant" : "Add New Assistant"}
//           </h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Error box */}
//           {error && (
//             <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* First Name */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-sm font-medium text-gray-700">First Name *</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                   placeholder="Enter first name"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-sm font-medium text-gray-700">Last Name *</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                   placeholder="Enter last name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Email */}
//           <div className="flex flex-col space-y-1">
//             <label className="text-sm font-medium text-gray-700">Email *</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="Enter email address"
//               />
//             </div>
//           </div>

//           {/* Password only in CREATE */}
//           {!editData && (
//             <div className="flex flex-col space-y-1">
//               <label className="text-sm font-medium text-gray-700">Password *</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center disabled:opacity-50 transition-colors"
//             >
//               {loading ? (
//                 <Loader className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Save className="w-4 h-4" />
//               )}
//               <span className="ml-2">{editData ? "Update" : "Create"}</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AssistanceForm;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Save, Loader, User, Mail, Lock } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from "../../../services/api";

const AssistanceForm = ({ onClose, onSuccess, editData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: editData?.firstName || "",
    lastName: editData?.lastName || "",
    email: editData?.email || "",
    password: "",
    phone: editData?.phone || "",
    department: editData?.department || "",
    position: editData?.position || "",
    address: editData?.address || ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editData) {
        // Update existing assistant (without password)
        const updatedPayload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          position: formData.position,
          address: formData.address
        };

        const response = await ApiService.assistants.update(editData._id, updatedPayload);
        
        if (response.success) {
          toast.success("Assistant updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          onSuccess("Assistant updated successfully");
          onClose();
        } else {
          throw new Error(response.message || "Failed to update assistant");
        }
      } else {
        // Create new assistant (with password)
        const createPayload = {
          ...formData,
          confirmPassword: formData.password // Add confirm password for validation
        };

        const response = await ApiService.assistants.create(createPayload);
        
        if (response.success) {
          toast.success("Assistant created successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          onSuccess("Assistant created successfully");
          onClose();
          
          // Navigate to all assistants page after a brief delay
          setTimeout(() => {
            navigate('/admin/assistances/all');
          }, 1500);
        } else {
          throw new Error(response.message || "Failed to create assistant");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      
      // Show error toast
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fadeIn scale-95 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b z-10">
            <h3 className="text-xl font-semibold text-gray-800">
              {editData ? "Edit Assistant" : "Add New Assistant"}
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Error box */}
            {error && (
              <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading || editData} // Disable email editing during update
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter email address"
                />
                {editData && (
                  <div className="absolute right-3 top-2.5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Cannot change email</span>
                  </div>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Department & Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Department *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              {/* Position */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Position *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter position"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Password only in CREATE */}
            {!editData && (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    minLength="6"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter password (min. 6 characters)"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    <span>{editData ? "Update Assistant" : "Create Assistant"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssistanceForm;