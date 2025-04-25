import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProfileData,
  setLoading,
  setError,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/slices/profileSlice";
import profileService from "../services/profileService";

const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      dispatch(setLoading(true));
      const data = await profileService.getProfile();
      dispatch(setProfileData(data));
    } catch (err) {
      dispatch(setError(err.error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfile = async (profileData) => {
    try {
      dispatch(setLoading(true));
      const data = await profileService.updateProfile(profileData);
      dispatch(setProfileData(data));
      setIsEditing(false);
      return { success: true };
    } catch (err) {
      dispatch(setError(err.error));
      return { success: false, error: err.error };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfilePicture = async (file) => {
    try {
      dispatch(setLoading(true));
      const data = await profileService.updateProfilePicture(file);
      dispatch(
        setProfileData({ ...profile, profilePicture: data.profilePicture })
      );
      return { success: true };
    } catch (err) {
      dispatch(setError(err.error));
      return { success: false, error: err.error };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    isEditing,
    updateProfile,
    updateProfilePicture,
    toggleEditMode,
  };
};

export default useProfile;
