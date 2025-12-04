import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Criar instância do axios com configuração padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Services endpoints
export const servicesAPI = {
  getAll: (companyId) => {
    const params = companyId ? { company: companyId } : {};
    return api.get("/services", { params });
  },
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post("/services", data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  getMyServices: () => api.get("/services/company/my-services"),
};

// Bookings endpoints
export const bookingsAPI = {
  create: (data) => api.post("/bookings", data),
  getAll: () => api.get("/bookings"),
  getById: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id) => api.delete(`/bookings/${id}`),
  getAvailableSlots: (serviceId, companyId, date) => {
    const params = { serviceId, companyId, date };
    return api.get("/bookings/slots", { params });
  },
};

// Health check
export const healthCheck = () => api.get("/health");

export default api;
