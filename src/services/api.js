import axios from "axios";

// Mevcut API URL sabitini güncelle
const API_URL = "https://trackerappbackend-production.up.railway.app/api";

// Create axios instance with base configuration
const api = axios.create({
  // In development, this will be proxied through Vite
  // In production, you should set the full URL in VITE_API_URL
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page if needed
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post("/register", userData),
  login: (credentials) => api.post("/login", credentials),
};

// Jobs API endpoints
export const jobsAPI = {
  getJobs: () => api.get("/jobs"),
  createJob: (jobData) => api.post("/jobs", jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  moveJob: (id, column) => api.patch(`/jobs/${id}/move`, { column }),
};

export default api;
