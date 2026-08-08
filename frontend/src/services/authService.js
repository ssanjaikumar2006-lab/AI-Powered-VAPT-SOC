import api from "./api";

// Placeholder endpoints — wire up to your real auth backend.
export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  signup: (payload) => api.post("/auth/signup", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  verifyOtp: (payload) => api.post("/auth/verify-otp", payload),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
  logout: () => api.post("/auth/logout"),
};
