import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  company: string;
  addedTime: string;
  column: "Wishlist" | "Applied" | "Interview";
}

interface JobState {
  jobs: Job[];
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    moveJob: (
      state,
      action: PayloadAction<{ id: string; column: Job["column"] }>
    ) => {
      const job = state.jobs.find((job) => job.id === action.payload.id);
      if (job) {
        job.column = action.payload.column;
      }
    },
  },
});

export const { addJob, moveJob } = jobSlice.actions;
export default jobSlice.reducer;
