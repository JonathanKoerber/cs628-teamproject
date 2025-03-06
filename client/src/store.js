import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./redux/user/userSlice";
import {authReducer} from "./redux/user/authSlice";
import { resumeReducer } from "./redux/user/resumeSlice";


const store = configureStore({
    reducer:{
        // user: userReducer,
        auth: authReducer,
        resume: resumeReducer,
    }
})

export default store;
