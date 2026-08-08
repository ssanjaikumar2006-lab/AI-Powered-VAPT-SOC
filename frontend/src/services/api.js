import axios from "axios";

// Base Axios instance. Point VITE_API_BASE_URL at your backend when ready.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sentinel_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Centralized error normalization
    const message = err?.response?.data?.message || err.message || "Unexpected error";
    return Promise.reject({ ...err, message });
  }
);

export default api;
