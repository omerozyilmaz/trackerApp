import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    title: "",
    company: "",
    description: "",
    location: "",
    jobUrl: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
