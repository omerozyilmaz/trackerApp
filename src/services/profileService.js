import axios from "axios";
import API_URL from "../config/api.js";

// Axios instance oluşturma
const api = axios.create({
  baseURL: `${API_URL}/profile`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - token ekleme
api.interceptors.request.use(
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

// Profil bilgilerini getir
const getProfile = async () => {
  try {
    const response = await api.get("/");
    return response;
  } catch (error) {
    if (error.response?.status === 404) {
      // Profil bulunamadıysa yeni profil oluştur
      return createProfile();
    }
    throw handleError(error);
  }
};

// Yeni profil oluştur
const createProfile = async (initialData = {}) => {
  try {
    const defaultProfile = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      currentPosition: "",
      about: "",
      profilePicture: "",
      education: [],
      experience: [],
      ...initialData,
    };

    const response = await api.post("/", defaultProfile);
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Profil bilgilerini güncelle
const updateProfile = async (profileData) => {
  try {
    // Kullanıcı adı, ad ve soyad güncellemesi için özel endpoint
    if (profileData.username || profileData.firstName || profileData.lastName) {
      const response = await api.put("/basic-info", {
        username: profileData.username,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      });
      return response;
    }

    // Diğer profil bilgileri için normal endpoint
    const response = await api.put("/", profileData);
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Profil resmini güncelle
const updateProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await api.put("/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Eğitim bilgilerini güncelle
const updateEducation = async (educationData) => {
  try {
    const response = await api.put("/education", { education: educationData });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Deneyim bilgilerini güncelle
const updateExperience = async (experienceData) => {
  try {
    const response = await api.put("/experience", {
      experience: experienceData,
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Eğitim bilgisi ekle
const addEducation = async (educationData) => {
  try {
    const response = await api.post("/education", { education: educationData });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Deneyim bilgisi ekle
const addExperience = async (experienceData) => {
  try {
    const response = await api.post("/experience", {
      experience: experienceData,
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Hata yönetimi
const handleError = (error) => {
  console.error("Profile service error:", error);
  return {
    success: false,
    error: error.response?.data?.message || "An unexpected error occurred",
  };
};

export {
  getProfile,
  createProfile,
  updateProfile,
  updateProfilePicture,
  updateEducation,
  updateExperience,
  addEducation,
  addExperience,
};
