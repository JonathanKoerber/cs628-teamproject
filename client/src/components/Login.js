import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../redux/auth/authActions';
import logo from '../assets/jazi_blue_logo_removebg.png';

const Login = ({ toggleLogin }) => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputValue;

  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("handleOnChange", name);
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const clearInputs = () => {
    setInputValue({
      ...inputValue,
      password: '',
      email: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state)
    if (!inputValue.email || !inputValue.password) {
      toast('Email and password is required!', { position: 'bottom-right' });
    } else {
      dispatch(
        loginUser({
          password: inputValue.password,
          email: inputValue.email,
        })
      )
        .unwrap()
        .then((response) => {})
        .catch((err) => {
          console.log('login', err);
        });
    }
    console.log(state)
    clearInputs();
  };
  return (
    <div className={'login-container'}>
      {/* <div className='login'> */}
      <Link to='/'>
        <img src={logo} alt='Jazi AI Resume' className='blue-logo' />
      </Link>
      <h2 className='sign-in-header'>Log In</h2>
      <form
        className='login-form'
        onSubmit={handleSubmit}
        onChange={handleOnChange}
      >
        <label htmlFor='email'>Email</label>
        <input
          className='login-input'
          type='text'
          name='email'
          value={email}
          placeholder='Enter your email'
        />
        <label htmlFor='password'>Password</label>
        <input
          className='login-input'
          type='password'
          name='password'
          value={password}
          placeholder='Password'
        />
        <button className='login-form-btn' type='submit'>
          Login
        </button>
        <span className='btm-text'>
          Don't have an account?{' '}
          <span
            onClick={() => toggleLogin()}
            style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Signup
          </span>
        </span>
      </form>
      <ToastContainer />
      {/* </div> */}
    </div>
  );
};

export default Login;
