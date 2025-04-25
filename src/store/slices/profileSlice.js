import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    setProfileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProfileLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfileData,
  setProfileError,
  setProfileLoading,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile.data;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
