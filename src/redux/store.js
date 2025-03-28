import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
}); 