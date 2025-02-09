import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useNavigation} from "react-router-dom";
import {clearUser, setUser} from "../features/user/userSlice";
import {ToastContainer, toast } from "react-toastify";
import axios from "axios";
import '../Style/Login.css'

const Login = () => {
    const [ inputValue, setInputValue] = React.useState(
        {
            email: "",
            password: "",
            username: "",
        });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const navigate = useNavigate()
    const {email, password, username }= inputValue
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left"
        })
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const api_url = "http://backend:5000/login";
        console.log("api_url", api_url)
        try {
            const { data } = await axios.post(api_url, {
              ...inputValue
            }, { withCredentials: true}
            );
            const { success, message} = data;
            console.log("success", success, "message", message)
            if (success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/")
                }, 10000);
            } else {
                handleError(message);
            }
        }catch (error){
            // TODO implement error logging
            console.log(error)
        }
        setInputValue({
            ...inputValue,
            password: "",
            username: "",
            email: ""
        });
    };

    return (
        <div className={"login-container"}>
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="login-input" type={"test"} name={"username"} placeholder={"Add username"}/>
                    <input className="login-input" type="text" name="email" placeholder="Enter your email"/>
                    <input className="login-input" type="password" name="password" placeholder="Password"/>
                    <button className="login-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login;