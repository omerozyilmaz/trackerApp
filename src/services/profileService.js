import axios from "axios";
import API_URL from "../config/api.js";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/profile`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for adding auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getProfile() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await this.api.put("/", profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await this.api.post("/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    console.error("Profile service error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "An unexpected error occurred",
    };
  }
}

export default new ProfileService();
