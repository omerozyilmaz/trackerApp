import axios from "axios";
import API_URL from "../config/api.js";

// Axios instance oluşturma
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - token ekleme
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Normal kayıt işlemi
const register = async (userData) => {
  console.log("Register service called with:", userData);
  try {
    const response = await authAxios.post("/register", userData);
    console.log("Register service response:", response);
    return response;
  } catch (error) {
    console.error("Register service error:", error);
    throw error;
  }
};

// Normal giriş işlemi
const login = async (credentials) => {
  console.log("Login service called with:", credentials);
  try {
    const response = await authAxios.post("/login", credentials);
    console.log("Login service response:", response);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

// LinkedIn ile giriş başlatma
const initiateLinkedInLogin = () => {
  window.location.href = `${API_URL}/linkedin/auth`;
};

// LinkedIn callback işlemi
const handleLinkedInCallback = async (code) => {
  try {
    const response = await authAxios.get(`/linkedin/callback?code=${code}`);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response;
  } catch (error) {
    console.error("LinkedIn callback error:", error);
    throw error;
  }
};

// Çıkış işlemi
const logout = () => {
  localStorage.removeItem("token");
  delete authAxios.defaults.headers.common["Authorization"];
};

// Token kontrolü
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export {
  register,
  login,
  logout,
  isAuthenticated,
  initiateLinkedInLogin,
  handleLinkedInCallback,
  authAxios,
};
