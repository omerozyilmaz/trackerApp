import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  createProfile,
  updateProfile as updateProfileService,
  updateProfilePicture as updateProfilePictureService,
  updateEducation as updateEducationService,
  updateExperience as updateExperienceService,
  addEducation as addEducationService,
  addExperience as addExperienceService,
} from "../services/profileService";
import {
  setProfile,
  updateProfileData,
  setProfileError,
} from "../store/slices/profileSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Profil bilgilerini yükle
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      dispatch(setProfile(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to fetch profile";
      setError(errorMessage);
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Yeni profil oluştur
  const createNewProfile = async (initialData = {}) => {
    try {
      setIsLoading(true);
      const response = await createProfile(initialData);
      dispatch(setProfile(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to create profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Profil bilgilerini güncelle
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);

      // Sadece değişen alanları güncelle
      const response = await updateProfileService(profileData);

      // Redux store'u güncelle
      dispatch(updateProfileData(response.data));

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Profil resmini güncelle
  const updateProfilePicture = async (imageFile) => {
    try {
      setIsLoading(true);
      const response = await updateProfilePictureService(imageFile);
      dispatch(
        updateProfileData({ profilePicture: response.data.profilePicture })
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update profile picture";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Eğitim bilgisi ekle
  const addEducation = async (educationData) => {
    try {
      setIsLoading(true);
      const response = await addEducationService(educationData);
      dispatch(updateProfileData({ education: response.data.education }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to add education";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Eğitim bilgilerini güncelle
  const updateEducation = async (educationData) => {
    try {
      setIsLoading(true);
      const response = await updateEducationService(educationData);
      dispatch(updateProfileData({ education: response.data.education }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update education";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deneyim bilgisi ekle
  const addExperience = async (experienceData) => {
    try {
      setIsLoading(true);
      const response = await addExperienceService(experienceData);
      dispatch(updateProfileData({ experience: response.data.experience }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to add experience";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deneyim bilgilerini güncelle
  const updateExperience = async (experienceData) => {
    try {
      setIsLoading(true);
      const response = await updateExperienceService(experienceData);
      dispatch(updateProfileData({ experience: response.data.experience }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update experience";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Düzenleme modunu aç/kapat
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return {
    profile,
    isLoading,
    error,
    isEditing,
    createNewProfile,
    updateProfile,
    updateProfilePicture,
    addEducation,
    updateEducation,
    addExperience,
    updateExperience,
    toggleEditMode,
  };
};

export default useProfile;
