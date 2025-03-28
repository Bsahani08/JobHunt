import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => { 
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // Transform the data to match our job structure
      return response.data.map((post) => ({
        id: post.id,
        title: post.title,
        company: `Company ${post.id}`,
        location: "Remote",
        type: "Full Time",
        experience: "2-5 years",
        salary: "$50,000 - $80,000",
        description: post.body,
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "Strong problem-solving skills",
          "Excellent communication abilities",
          "Team player with leadership potential",
        ],
        skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single job
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      // Transform the data to match our job structure
      return {
        id: response.data.id,
        title: response.data.title,
        company: `Company ${response.data.id}`,
        location: "Remote",
        type: "Full Time",
        experience: "2-5 years",
        salary: "$50,000 - $80,000",
        description: response.data.body,
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "Strong problem-solving skills",
          "Excellent communication abilities",
          "Team player with leadership potential",
        ],
        skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedJob } = jobsSlice.actions;
export default jobsSlice.reducer; 