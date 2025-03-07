import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE, // Using the base URL from .env
  withCredentials: true, // For handling cookies, if necessary (authentication tokens)
});

// You can then use these environment variables in your API calls
export const fetchResumes = async () => {
  try {
    const response = await api.get(`${process.env.REACT_APP_RESUME}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createResume = async (resumeData) => {
  try {
    const response = await api.post(`${process.env.REACT_APP_RESUME}`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateResume = async (id, updatedData) => {
  try {
    const response = await api.put(`${process.env.REACT_APP_RESUME}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteResume = async (id) => {
  try {
    const response = await api.delete(`${process.env.REACT_APP_RESUME}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
