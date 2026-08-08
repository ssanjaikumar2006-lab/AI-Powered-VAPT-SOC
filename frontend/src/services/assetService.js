import api from "./api";

export const assetService = {
  getAssets: (params) => api.get("/assets", { params }),
  getAsset: (id) => api.get(`/assets/${id}`),
};
