import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormVisible: false,
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
    toggleFormVisibility(state) {
      state.isFormVisible = !state.isFormVisible;
    },
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    resetFormData(state) {
      state.formData = initialState.formData;
    },
  },
});

export const { toggleFormVisibility, updateFormData, resetFormData } =
  formSlice.actions;
export default formSlice.reducer;
