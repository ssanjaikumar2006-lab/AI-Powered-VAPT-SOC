import api from "./api";

export const aiService = {
  getInsights: () => api.get("/ai/insights"),
  chat: (message, history) => api.post("/ai/chat", { message, history }),
};
