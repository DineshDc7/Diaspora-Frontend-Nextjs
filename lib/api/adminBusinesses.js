import apiClient from "../apiClient";

export const adminBusinessesApi = {
  // GET /api/admin/businesses?search=...&page=...&limit=...
  list: (params = {}) => apiClient.get("/api/admin/businesses", { params }),

  // GET /api/admin/businesses/options
  options: () => apiClient.get("/api/admin/businesses/options"),

  // GET /api/admin/businesses/:id
  getById: (id) => apiClient.get(`/api/admin/businesses/${id}`),

  // POST /api/admin/businesses
  create: (payload) => apiClient.post("/api/admin/businesses", payload),

  // PUT /api/admin/businesses/:id
  update: (id, payload) => apiClient.put(`/api/admin/businesses/${id}`, payload),
};