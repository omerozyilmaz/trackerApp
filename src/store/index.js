import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import formReducer from "./slices/formSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    form: formReducer,
    profile: profileReducer,
  },
});

export default store;
