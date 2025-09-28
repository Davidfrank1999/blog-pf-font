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


// --- Track refreshing state to avoid duplicate requests ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// --- Handle expired tokens globally ---
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue failed requests until refresh finishes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Call refresh endpoint
        const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });

        const newAccessToken = res.data.accessToken;

        // Store new token
        localStorage.setItem("accessToken", newAccessToken);

        // Update default headers
        api.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);

        // Retry failed request
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
