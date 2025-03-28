import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appliedJobs: JSON.parse(localStorage.getItem('appliedJobs')) || []
};

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {
    addAppliedJob: (state, action) => {
      const job = action.payload;
      if (!state.appliedJobs.find(j => j.id === job.id)) {
        state.appliedJobs.push(job);
        localStorage.setItem('appliedJobs', JSON.stringify(state.appliedJobs));
      }
    },
    removeAppliedJob: (state, action) => {
      const jobId = action.payload;
      state.appliedJobs = state.appliedJobs.filter(job => job.id !== jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(state.appliedJobs));
    },
    clearAppliedJobs: (state) => {
      state.appliedJobs = [];
      localStorage.removeItem('appliedJobs');
    }
  }
});

export const { addAppliedJob, removeAppliedJob, clearAppliedJobs } = appliedJobsSlice.actions;
export default appliedJobsSlice.reducer; 