import { createSlice } from '@reduxjs/toolkit';
import { createResume, fetchResumes, updateResume, deleteResume } from './resumeActions';

const initialState = {
  resumes: [],
  loading: false,
  error: null,
  success: false,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
        state.success = true;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.map((resume) =>
          resume._id === action.payload._id ? action.payload : resume
        );
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter((resume) => resume._id !== action.payload._id);
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const resumeReducer = resumeSlice.reducer;
export default resumeSlice;
