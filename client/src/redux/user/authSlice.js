import { createSlice  } from "@reduxjs/toolkit";
import {signupUser, loginUser, validateUser} from "./authActions";
import Cookies from "js-cookie";


const initialState =  {
    loading: false,
    email: null,
    username: null,
    isLoggedIn: false,
    success: false,
    error: false,
}

// auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.loading = false;
            state.username = null;
            state.email = null;
            state.isLoggedIn = false;
            state.success = false;
            state.message = "Hi You have been logging out.";

            Cookies.remove("token")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("pending")
            })
            .addCase(signupUser.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.userusername = payload.user.username;
                state.email = payload.user.email;
                state.isLoggedIn = true;
                state.success = true;
                console.log("payload", payload);
            })
            .addCase(signupUser.rejected, (state,{ payload} ) => {
                state.loading = false
                state.error = payload;
                console.log("rejected payload", payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                console.log("authSlice loginUser.fulfilled", payload);
                if (payload.success === true) {
                    state.loading = false;
                    state.username = payload.user.username;
                    state.email = payload.user.email;
                    state.isLoggedIn = true;
                    state.success = true;
                    state.message = payload.message;
                }else{
                    state.loading = false;
                    state.message = payload.message
                    state.success = false;
                }
            })
            .addCase(loginUser.rejected, (state, {payload}) => {
                state.loading = false
                state.e = payload
            })
            .addCase(validateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(validateUser.fulfilled, (state, {payload}) => {
                console.log("validate user", payload.user.username, payload.user.email)
                state.loading = false;
                state.username = payload.user.username;
                state.email = payload.user.email;
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
