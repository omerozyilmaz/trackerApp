import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import formReducer from "./formSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    form: formReducer,
  },
});

export default store;
