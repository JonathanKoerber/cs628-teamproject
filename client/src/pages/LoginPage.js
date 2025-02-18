import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const LoginPage = () => {

  const [login, setLogin] = useState(false);
  const toggleLogin = () => setLogin((prev) => !prev);

  return (
    <>
      {login ? (
        <Login toggleLogin={toggleLogin} />
      ) : (
        <Signup toggleLogin={toggleLogin} />
      )}
    </>
  );
};

export default LoginPage;
