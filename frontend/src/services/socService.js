import api from "./api";

export const socService = {
  getEvents: (params) => api.get("/soc/events", { params }),
  getAlerts: (params) => api.get("/soc/alerts", { params }),
  getTimeline: () => api.get("/soc/timeline"),
};
