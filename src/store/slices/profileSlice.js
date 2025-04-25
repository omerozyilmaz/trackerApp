import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
    about: "",
    location: "",
    currentPosition: "",
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addEducation: (state, action) => {
      state.profile.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, data } = action.payload;
      state.profile.education[index] = data;
    },
    removeEducation: (state, action) => {
      state.profile.education = state.profile.education.filter(
        (_, index) => index !== action.payload
      );
    },
    addExperience: (state, action) => {
      state.profile.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, data } = action.payload;
      state.profile.experience[index] = data;
    },
    removeExperience: (state, action) => {
      state.profile.experience = state.profile.experience.filter(
        (_, index) => index !== action.payload
      );
    },
    addProject: (state, action) => {
      state.profile.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const { index, data } = action.payload;
      state.profile.projects[index] = data;
    },
    removeProject: (state, action) => {
      state.profile.projects = state.profile.projects.filter(
        (_, index) => index !== action.payload
      );
    },
    addSkill: (state, action) => {
      state.profile.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.profile.skills = state.profile.skills.filter(
        (skill) => skill !== action.payload
      );
    },
    updateAbout: (state, action) => {
      state.profile.about = action.payload;
    },
  },
});

export const {
  setProfileData,
  setLoading,
  setError,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addProject,
  updateProject,
  removeProject,
  addSkill,
  removeSkill,
  updateAbout,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile.profile;
export const selectProfileLoading = (state) => state.profile.isLoading;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
