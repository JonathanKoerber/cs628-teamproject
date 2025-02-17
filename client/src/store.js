import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./redux/user/userSlice";
import {authReducer} from "./redux/user/authSlice";


const store = configureStore({
    reducer:{
        // user: userReducer,
        auth: authReducer
    }
})

export default store;