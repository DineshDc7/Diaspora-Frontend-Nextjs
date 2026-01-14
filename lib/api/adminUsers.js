import apiClient from "../apiClient";

export const adminUsersApi = {
  overview: (params = {}) =>
    apiClient.get("/api/admin/users/overview", { params }),
};