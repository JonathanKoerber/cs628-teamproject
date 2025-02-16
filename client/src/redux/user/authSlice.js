import { createSlice  } from "@reduxjs/toolkit";
import {signupUser, loginUser, validateUser} from "./authActions";
import Cookies from "js-cookie";


const initialState =  {
    loading: false,
    user: null,
    isLoggedIn: false,
    success: false,
}

// auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.success = false;
            state.error = null;

            Cookies.remove("token")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.user = payload.user;
                state.isLoggedIn = true;
                state.success = true;
            })
            .addCase(signupUser.rejected, (state,{ payload} ) => {
                state.loading = false
                state.error = payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.user = payload.user;
                state.isLoggedIn = true;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })
            .addCase(validateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(validateUser.fulfilled, (state, {payload}) => {
                state.user = payload.user
                state.loading = false;
                state.isLoggedIn = true;
                state.success = true;
            })
            .addCase(validateUser.rejected, (state, {payload}) => {
                state.loading = false
                state.user = null
                state.isLoggedIn = false;
                state.error = payload
            })
    }
})

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
