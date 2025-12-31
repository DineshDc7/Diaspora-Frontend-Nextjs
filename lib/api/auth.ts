import apiClient from "@/lib/apiClient";

export type UserRole = "ADMIN" | "INVESTOR" | "BUSINESS_OWNER";

export const authApi = {
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    mobile?: string | null;
  }) => apiClient.post("/api/auth/register", payload),

  login: (payload: { email: string; password: string }) =>
    apiClient.post("/api/auth/login", payload),

  me: () => apiClient.get("/api/auth/me"),

  logout: () => apiClient.post("/api/auth/logout"),
};