import axios from "axios";
import API_URL from "../config/api.js";

// Axios instance oluşturma
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// LinkedIn OAuth yapılandırması
const LINKEDIN_CONFIG = {
  clientId: "7709zu6glkb0t0",
  redirectUri:
    "https://trackerappbackend-production.up.railway.app/api/linkedin/callback",
  scope: "r_liteprofile r_emailaddress",
  state: Math.random().toString(36).substring(7),
};

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
  const params = new URLSearchParams({
    response_type: "code",
    client_id: LINKEDIN_CONFIG.clientId,
    redirect_uri: LINKEDIN_CONFIG.redirectUri,
    state: LINKEDIN_CONFIG.state,
    scope: LINKEDIN_CONFIG.scope,
  });

  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  console.log("LinkedIn Auth URL:", linkedInAuthUrl);

  // State'i sakla
  localStorage.setItem("linkedin_oauth_state", LINKEDIN_CONFIG.state);

  window.location.href = linkedInAuthUrl;
};

// LinkedIn callback işlemi
const handleLinkedInCallback = async (code, state) => {
  try {
    // State kontrolü
    const savedState = localStorage.getItem("linkedin_oauth_state");
    if (state !== savedState) {
      throw new Error("Invalid state parameter");
    }

    console.log("Sending LinkedIn callback request with code:", code);
    const response = await authAxios.post("/linkedin/callback", { code });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    // State'i temizle
    localStorage.removeItem("linkedin_oauth_state");

    return response;
  } catch (error) {
    console.error("LinkedIn callback error:", error);
    throw error;
  }
};

// Çıkış işlemi
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("linkedin_oauth_state");
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
