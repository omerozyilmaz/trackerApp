import axios from "axios";
import API_URL from "../config/api.js";

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const register = async (userData) => {
  try {
    console.log("Registering user with data:", userData); // Debug log
    console.log("API URL:", `${API_URL}/register`); // Debug log

    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Fonksiyonları dışa aktarıyoruz
export { login, register };
