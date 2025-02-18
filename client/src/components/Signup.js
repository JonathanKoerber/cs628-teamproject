import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { clearUser, setUser } from '../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import '../Style/Login.css';

const Signup = ({ toggleLogin }) => {
  const [inputValue, setInputValue] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log('handleOnchange', inputValue);
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-right',
    });
  const postValue = async () => {
    try {
      const { data } = await axios.post(process.env.REACT_APP_AUTH_SIGNUP, {
        ...inputValue,
      });
      const { success, message } = data;
      return { success, message }; // Returning the object
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        console.error(
          'Server responded with:',
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postValue(); // Await the result of the promise
    if (result) {
      const { success, message } = result; // Destructure success and message here
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 9999);
      } else {
        handleError(message);
      }
    }
    setInputValue({
      ...inputValue,
      password: '',
      username: '',
      email: '',
    });
  };

  return (
    <div className={'login-container'}>
      <div className='login'>
        <form
          className='login-form'
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <input
            className='login-input'
            type={'test'}
            name={'username'}
            placeholder={'Add username'}
          />
          <input
            className='login-input'
            type='text'
            name='email'
            placeholder='Enter your email'
          />
          <input
            className='login-input'
            type='password'
            name='password'
            placeholder='Password'
          />
          <button className='login-button' type='submit'>
            Sign Up
          </button>
          <span>
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
