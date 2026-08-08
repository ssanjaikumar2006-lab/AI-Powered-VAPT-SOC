import api from "./api";

export const vaptService = {
  startScan: (payload) => api.post("/vapt/scans", payload),
  pauseScan: (id) => api.post(`/vapt/scans/${id}/pause`),
  resumeScan: (id) => api.post(`/vapt/scans/${id}/resume`),
  cancelScan: (id) => api.post(`/vapt/scans/${id}/cancel`),
  getVulnerabilities: (params) => api.get("/vapt/vulnerabilities", { params }),
  getEngines: () => api.get("/vapt/engines"),
};
