import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./redux/user/userSlice";
import {authReducer} from "./redux/auth/authSlice";
import {resumeApi} from "./redux/resume/resumeSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        [resumeApi.reducerPath]: resumeApi.reducer,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(resumeApi.middleware),
})

export default store;