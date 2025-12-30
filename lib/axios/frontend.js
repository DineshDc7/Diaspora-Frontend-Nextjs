import axios from "axios";

/**
 * Frontend axios instance:
 * - Calls Next.js API routes (/api/*)
 * - Sends cookies automatically
 * - Tries refresh once on 401, then retries original request
 */
const frontendAxios = axios.create({
  baseURL: "", // same origin
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

frontendAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error?.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        return frontendAxios(original);
      } catch (e) {
        // refresh failed -> let caller handle (redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export default frontendAxios;