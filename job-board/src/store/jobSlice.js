import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  applied: [],
  interview: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action) => {
      const { column, job } = action.payload;
      state[column].push(job);
    },
    moveJob: (state, action) => {
      const { fromColumn, toColumn, jobIndex } = action.payload;
      const job = state[fromColumn].splice(jobIndex, 1)[0];
      state[toColumn].push(job);
    },
  },
});

export const { addJob, moveJob } = jobSlice.actions;
export default jobSlice.reducer;
