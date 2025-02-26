import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    form: formReducer,
  },
});

export default store;
