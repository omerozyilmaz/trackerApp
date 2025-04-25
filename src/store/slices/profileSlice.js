import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
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
  },
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = { ...initialState.data, ...action.payload };
      state.error = null;
    },
    updateProfileData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
        username: state.data.username,
      };
      state.error = null;
    },
    setProfileError: (state, action) => {
      state.error = action.payload;
    },
    resetProfile: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
});

export const { setProfile, updateProfileData, setProfileError, resetProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
