import axios from "axios";

/**
 * Frontend axios:
 * - Calls your Next.js BFF endpoints (/api/*)
 * - Sends cookies automatically
 * - On 401, tries refresh once then retries the original request
 */
const frontendAxios = axios.create({
  baseURL: "", // same origin (your Next.js app)
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

frontendAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // If unauthorized and we haven't retried yet, try refreshing once
    if (error?.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        return frontendAxios(original);
      } catch (e) {
        // Refresh failed -> caller should redirect to /login
      }
    }

    return Promise.reject(error);
  }
);

export default frontendAxios;