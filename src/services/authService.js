import axios from "axios";
import API_URL from "../config/api.js";

const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Fonksiyonları dışa aktarıyoruz
export { login, register };
