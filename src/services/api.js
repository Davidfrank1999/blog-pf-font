// src/services/api.js
import axios from "axios";

// ⚡ Use your actual backend port (check your server.js/app.js)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // shorter timeout for faster fail
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("📤 API Request:", config.method?.toUpperCase(), config.url, config.data || "");
  return config;
});

// ✅ Handle errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error(`❌ API Error [${status}]:`, message);

    if (status === 401) {
      alert(`❌ Unauthorized: ${message}`);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;
