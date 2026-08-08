import api from "./api";

export const threatIntelService = {
  getIocs: () => api.get("/threat-intel/iocs"),
  getCveFeed: () => api.get("/threat-intel/cve-feed"),
  getMitreTechniques: () => api.get("/threat-intel/mitre"),
};
