import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginURL = process.env.REACT_APP_AUTH_LOGIN;
const signupURL = process.env.REACT_APP_AUTH_SIGNUP;
const baseURL = process.env.REACT_APP_BASS;

export const signupUser = createAsyncThunk(
    'auth/signup',
    async({username, email, password},{rejectWithValue}) => {
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
           const response = await axios.post(
                `${signupURL}`,
                {
                    "username": username,
                    "email": email,
                    "password": password
                },
                config
            )
            console.log('Signup User', response.data)
            return response
        }catch(error){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.data);
            }
        }
    });

export const loginUser = createAsyncThunk(
    'auth/login',
    async({email, password}, {rejectWithValue}) => {
        console.log("loginUser Action", email, password);

        try{
            const config = {
                headers:{
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            const response = await axios.post(
                `${loginURL}`,
                {
                    "email": email,
                    "password" : password
                },
            config
            );

            console.log("loginUser", response.data);
            return response.data
        }catch(error){
            console.log("loginUser", error.response && error.response.data);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.data);
            }
        }
    });


export const validateUser = createAsyncThunk(
  'auth/validateUser',
  async (_, { rejectWithValue }) => {
      console.log("validateUser Action");

      try {
          // Configuration for axios request
          const config = {
              withCredentials: true,  // Ensure cookies are sent with the request
          };

          // Make the GET request to validate the user
          const response = await axios.get(
              `${baseURL}`,  // Ensure this URL points to a protected route on the backend
              config  // Pass in the config here
          );

          // Return the response data if successful
          return response.data;
      } catch (error) {
          // Catch and handle errors
          if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
          } else {
              return rejectWithValue("An error occurred while validating user");
          }
      }
});