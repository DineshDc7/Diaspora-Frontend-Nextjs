import apiClient from "@/lib/apiClient";

// Roles (use as constants if you want)
export const USER_ROLES = {
  ADMIN: "ADMIN",
  INVESTOR: "INVESTOR",
  BUSINESS_OWNER: "BUSINESS_OWNER",
};

export const authApi = {
  // payload: { name, email, password, role, mobile? }
  register: (payload) => apiClient.post("/api/auth/register", payload),

  // payload: { email, password }
  login: (payload) => apiClient.post("/api/auth/login", payload),

  me: () => apiClient.get("/api/auth/me"),

  logout: () => apiClient.post("/api/auth/logout"),
};