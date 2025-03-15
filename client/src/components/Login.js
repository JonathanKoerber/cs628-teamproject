import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {loginUser} from "../redux/auth/authActions";

const Login = ({toggleLogin}) => {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputValue;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        console.log(inputValue);
    };

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
           toast("Email and password is required!", {position: "top-right"});
       }else{
           const toastId = toast.loading(
               {render: "Loading...",
               position: "top-right",
               autoClose: 5000});

           try {
               const response = await dispatch(loginUser({
                   password: inputValue.password,
                   email: inputValue.email,
               })).unwrap()
               if (response.success) {
                   toast.update(toastId, {
                       render: `Welcome back, ${response.user.username}`,
                       type: "success",
                       isLoading: false,
                       autoClose: 3000,
                       position: "top-right",
                   });
               } else {
                   toast.update(toastId, {
                       render: response.message,
                       type: "error",
                       isLoading: false,
                       autoClose: 3000,
                       position: "top-right"
                   })
               }
           }catch(err) {
               toast.update(toastId, {
                   render: "Login failed. Please try again later.",
                   type: "error",
                   isLoading: false,
                   autoClose: 3000,
                   position: "top-right"
               });
               console.log(err);
               }
       }
       clearInputs()
        navigate("/");

    };
    return (
        <div className={"login-container"}>
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit} onChange={handleOnChange}>
                    <input className="login-input" type="text" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange}/>
                    <input className="login-input" type="password" name="password" value={password} placeholder="Password" onChange={handleOnChange}/>
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