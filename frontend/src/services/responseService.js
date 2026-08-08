import api from "./api";

export const responseService = {
  getActions: () => api.get("/response-center/actions"),
  executeAction: (id) => api.post(`/response-center/actions/${id}/execute`),
};
