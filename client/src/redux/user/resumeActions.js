import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Access the API URLs from environment variables
const BASE_URL = process.env.REACT_APP_BASE;
const RESUME_URL = process.env.REACT_APP_RESUME;

// Create a new resume
export const createResume = createAsyncThunk(
  'resume/createResume',
  async (resumeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${RESUME_URL}`, resumeData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all resumes for the logged-in user
export const fetchResumes = createAsyncThunk(
  'resume/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${RESUME_URL}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a resume
export const updateResume = createAsyncThunk(
  'resume/updateResume',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${RESUME_URL}/${id}`, updatedData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a resume
export const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${RESUME_URL}/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
