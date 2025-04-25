import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api.js";

const useProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`);
        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to fetch profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, updatedData);
      setProfileData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating profile:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      return { success: false, error: errorMessage };
    }
  };

  const updateProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.put(`${API_URL}/profile/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileData((prev) => ({
        ...prev,
        profilePicture: response.data.profilePicture,
      }));

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating profile picture:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update profile picture";
      return { success: false, error: errorMessage };
    }
  };

  return {
    profileData,
    isLoading,
    error,
    updateProfile,
    updateProfilePicture,
  };
};

export default useProfile;
