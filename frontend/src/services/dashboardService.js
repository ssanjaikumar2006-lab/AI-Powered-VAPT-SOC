import api from "./api";

export const dashboardService = {
  getKpis: () => api.get("/dashboard/kpis"),
  getSummary: () => api.get("/dashboard/summary"),
};
