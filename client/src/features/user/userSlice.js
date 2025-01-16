// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const initialState = {
    id: null,
    name: '',
    email: '',
    isAuthenticated: false,
};

// Create a slice for user
const userSlice = createSlice({
    name: 'user',  // The name of this slice
    initialState,   // Initial state for user
    reducers: {
        // Action to set user data (e.g., after login)
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },

        // Action to clear user data (e.g., after logout)
        clearUser: (state) => {
            state.id = null;
            state.name = '';
            state.email = '';
            state.isAuthenticated = false;
        },

        // Action to update user's name (e.g., profile update)
        updateName: (state, action) => {
            state.name = action.payload;
        },
    },
});

// Export the actions automatically generated by createSlice
export const { setUser,
                clearUser,
                updateName } = userSlice.actions;

// Export the reducer to be used in the store
export const userReducer = userSlice.reducer;
export default userSlice;
