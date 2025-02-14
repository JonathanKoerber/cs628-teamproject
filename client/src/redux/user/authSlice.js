import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// Async thunk to login user
export const loginUser = createAsyncThunk("auth/loginUser", async ( credentials, _, { rejectWithValue }) => {

    console.log("loginUser", credentials)
    try {
        const { data } = await axios.post(
            process.env.REACT_APP_AUTH_LOGIN,
            credentials,
            { withCredentials: true });

        if (data.status) {
            Cookies.set("token", data.token, { path: "/", secure: false, sameSite: "Lax" });
            toast(`Hello ${data.user}`, { position: "top-right" });
            return { user: data.user, token: data.token };
        } else {
            toast("Login failed!", { position: "top-right", type: "error" });
            return rejectWithValue("Login failed");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to verify user
export const verifyUser = createAsyncThunk("auth/verifyUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(process.env.REACT_APP_BASE, {}, { withCredentials: true });

        if (data.status) {
            return { user: data.user };
        } else {
            Cookies.remove("token");
            return rejectWithValue("Unauthorized");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, status: "idle", error: null },
    reducers: {
        logout: (state) => {
            Cookies.remove("token");
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(verifyUser.rejected, (state) => {
                state.user = null;
            });
    },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
