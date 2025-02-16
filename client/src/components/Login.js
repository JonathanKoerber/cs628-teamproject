import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {loginUser} from "../redux/user/authActions";

const Login = ({toggleLogin}) => {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        console.log(inputValue);
    };
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>{
        toast.success(msg, {
            position: "bottom-left",
        });
        clearInputs()
        navigate('/');
    }
    const clearInputs = () =>{
        setInputValue({
            ...inputValue,
            password: "",
            email: ""
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       if(!inputValue.email || !inputValue.password){
           handleError("Email and password is required!");
       }else{
           try{
               const result = dispatch(loginUser({password: inputValue.password,
                                                        email: inputValue.email,}))

               handleSuccess("User logged in successfully!");
           }catch(err) {
               handleError(err)
           }
       }

    };
    return (
        <div className={"login-container"}>
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit} onChange={handleOnChange}>
                    <input className="login-input" type="text" name="email" placeholder="Enter your email"/>
                    <input className="login-input" type="password" name="password" placeholder="Password"/>
                    <button className="login-button" type="submit">Login</button>
                    <span>
                    Don't have an account? <span
                        onClick={() => toggleLogin()}
                        style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}
                    >
                        Signup</span>
                </span>
                </form>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default Login;