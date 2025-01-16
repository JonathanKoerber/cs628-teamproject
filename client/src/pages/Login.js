import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearUser, setUser} from "../features/user/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const login = () => {
        const user = {name: "Bill", id: 1, email: "bill@gmail.com"};
        dispatch(setUser(user))
        console.log(user)
    }
    const logout = () => {
        dispatch(clearUser())
        console.log(user)
    }
    return (
        <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        <h1>Login</h1>
        </div>
)
}

export default Login;