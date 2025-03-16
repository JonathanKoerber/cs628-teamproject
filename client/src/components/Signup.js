import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {signupUser} from "../redux/auth/authActions";
import '../Style/Login.css';
import logo from "../assets/jazi_blue_logo_removebg.png";

const Signup = ({toggleLogin}) => {
    const [ inputValue, setInputValue] = useState(
        {
            email: "",
            password: "",
            username: "",
        });
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);

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

    const handleSubmit = async(e) => {
       e.preventDefault();
        if (!inputValue.email.length > 0 ||
            !inputValue.username.length >  0 ||
            !inputValue.password.length > 0) {
            toast.error("Please enter an username, email and password", {position: "top-right"});
        }else {
                dispatch(signupUser({
                    username: inputValue.username,
                    email: inputValue.email,
                    password: inputValue.password
                })
                )
                    .unwrap()
                    .then((response)=>{})
                    .catch(err => {
                    console.log(err)
                });
            }
        console.log(state)
        // clearInputs()
        }


    return (
        <div className={"login-container"}>
            <Link to='/'>
                <img src={logo} alt='Jazi AI Resume' className='blue-logo' />
            </Link>
            <h2 className='sign-in-header'>Sign Up</h2>
                <form className="login-form" onSubmit={handleSubmit} onChange={handleOnChange}>
                    <input
                        className="login-input"
                        name={"username"}
                        type={"test"}
                        placeholder={"Add username"}
                        value={username}
                        onChange={handleOnChange}/>
                    <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleOnChange}/>
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleOnChange}/>
                    <button className="login-button" type="submit">Signup</button>
                    <span className='btm-text'>
          Already have an account?{' '}
                        <span
                            onClick={() => toggleLogin()}
                            style={{
                                color: 'blue',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
            Login
          </span>
        </span>
                </form>
                <ToastContainer/>
        </div>
)}


export default Signup;
