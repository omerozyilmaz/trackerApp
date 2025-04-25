import { useEffect } from "react";
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
  setProfileLoading,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/slices/profileSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  // Profil bilgilerini yükle
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      dispatch(setProfileLoading());
      const response = await getProfile();
      dispatch(setProfile(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to fetch profile";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Yeni profil oluştur
  const createNewProfile = async (initialData = {}) => {
    try {
      dispatch(setProfileLoading());
      const response = await createProfile(initialData);
      dispatch(setProfile(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to create profile";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Profil bilgilerini güncelle
  const updateProfile = async (profileData) => {
    try {
      dispatch(setProfileLoading());
      const response = await updateProfileService(profileData);
      dispatch(updateProfileData(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update profile";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Profil resmini güncelle
  const updateProfilePicture = async (imageFile) => {
    try {
      dispatch(setProfileLoading());
      const response = await updateProfilePictureService(imageFile);
      dispatch(
        updateProfileData({ profilePicture: response.data.profilePicture })
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update profile picture";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Eğitim bilgisi ekle
  const addEducation = async (educationData) => {
    try {
      dispatch(setProfileLoading());
      const response = await addEducationService(educationData);
      dispatch(updateProfileData({ education: response.data.education }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to add education";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Eğitim bilgilerini güncelle
  const updateEducation = async (educationData) => {
    try {
      dispatch(setProfileLoading());
      const response = await updateEducationService(educationData);
      dispatch(updateProfileData({ education: response.data.education }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update education";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Deneyim bilgisi ekle
  const addExperience = async (experienceData) => {
    try {
      dispatch(setProfileLoading());
      const response = await addExperienceService(experienceData);
      dispatch(updateProfileData({ experience: response.data.experience }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to add experience";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Deneyim bilgilerini güncelle
  const updateExperience = async (experienceData) => {
    try {
      dispatch(setProfileLoading());
      const response = await updateExperienceService(experienceData);
      dispatch(updateProfileData({ experience: response.data.experience }));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.error || "Failed to update experience";
      dispatch(setProfileError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  return {
    profile,
    isLoading,
    error,
    createNewProfile,
    updateProfile,
    updateProfilePicture,
    addEducation,
    updateEducation,
    addExperience,
    updateExperience,
  };
};

export default useProfile;
