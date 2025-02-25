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
    setJobs: (state, action) => {
      return action.payload;
    },
    addJob: (state, action) => {
      const { column, job } = action.payload;
      state[column].push(job);
    },
    updateJob: (state, action) => {
      const { column, jobId, updatedJob } = action.payload;
      const index = state[column].findIndex((job) => job.id === jobId);
      if (index !== -1) {
        state[column][index] = { ...state[column][index], ...updatedJob };
      }
    },
    deleteJob: (state, action) => {
      const { column, jobId } = action.payload;
      state[column] = state[column].filter((job) => job.id !== jobId);
    },
    moveJob: (state, action) => {
      const { fromColumn, toColumn, jobIndex } = action.payload;
      // Find the job to move
      const job = state[fromColumn][jobIndex];

      if (job) {
        // Remove from the source column
        state[fromColumn] = state[fromColumn].filter(
          (_, i) => i !== parseInt(jobIndex)
        );

        // Add to the destination column
        state[toColumn].push(job);
      }
    },
  },
});

export const { setJobs, addJob, updateJob, deleteJob, moveJob } =
  jobSlice.actions;
export default jobSlice.reducer;
