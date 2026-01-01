

import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false, user: null };

  try {
    const decoded = jwtDecode(token);
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

export const BASE_URL = import.meta.env.PROD 
  ? "https://cornflowerblue-barracuda-442102.hostingersite.com" 
  : "http://localhost:7777";

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};