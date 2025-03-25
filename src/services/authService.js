import axios from "axios";
import API_URL from "../config/api.js";

const login = async (credentials) => {
  console.log("Login service called with:", credentials);
  console.log("API URL:", API_URL);
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log("Login service response:", response);
    return response;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

const register = async (userData) => {
  console.log("Register service called with:", userData);
  console.log("API URL:", API_URL);
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Register service response:", response);
    return response;
  } catch (error) {
    console.error("Register service error:", error);
    throw error;
  }
};

// Fonksiyonları dışa aktarıyoruz
export { login, register };
