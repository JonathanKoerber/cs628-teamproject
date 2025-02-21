import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import {signupUser} from "../redux/user/authActions";
import '../Style/Login.css'

const Signup = ({toggleLogin}) => {
    const [ inputValue, setInputValue] = React.useState(
        {
            email: "",
            password: "",
            username: "",
        });
    const dispatch = useDispatch();

    const {email, password, username }= inputValue
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        console.log("handleOnchange", inputValue)
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const clearInputs = () =>{
        setInputValue({
            ...inputValue,
            password: "",
            username: "",
            email: ""
        });
    }

    const handleSubmit = (e) => {
        if (!inputValue.email.length > 0 ||
            !inputValue.username.length >  0 ||
            !inputValue.password.length > 0) {
        }else {
                dispatch(signupUser({
                    username: inputValue.username,
                    email: inputValue.email,
                    password: inputValue.password})).unwrap().then((response)=>{
                                                        console.log("Signup Success", response)
                }).catch(err => {
                    console.log(err)
                });
            }
        clearInputs()
        }


    return (
        <div className={"login-container"}>
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit} onChange={handleOnChange}>
                    <input className="login-input" type={"test"} name={"username"}value={username} placeholder={"Add username"}/>
                    <input className="login-input" type="text" name="email" placeholder="Enter your email" value={email}/>
                    <input className="login-input" type="password" name="password" placeholder="Password" value={password}/>
                    <button className="login-button" type="submit">Signup</button>
                    <span>
                    Already have an account? <span
                        onClick={ () => toggleLogin() }
                        style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}
                    >Login</span>
                    </span>
                </form>
                <ToastContainer/>
            </div>
        </div>
)}


export default Signup;
