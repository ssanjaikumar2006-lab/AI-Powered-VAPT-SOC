import api from "./api";

export const reportService = {
  getReports: () => api.get("/reports"),
  generateReport: (payload) => api.post("/reports/generate", payload),
  downloadReport: (id, format) => api.get(`/reports/${id}/download`, { params: { format }, responseType: "blob" }),
};
