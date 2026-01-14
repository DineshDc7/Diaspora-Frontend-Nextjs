import axios from "axios";

const apiClient = axios.create({
  baseURL: "", // same origin -> calls Next BFF routes /api/*
  withCredentials: true, // important: cookies flow
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  console.log("[apiClient] Request:", config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config;

    // retry once after refresh
    if (error?.response?.status === 401 && original && !original._retry) {
      original._retry = true;

      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        return apiClient(original);
      } catch (e) {
        // refresh failed -> allow caller to handle (redirect to /login, etc.)
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;