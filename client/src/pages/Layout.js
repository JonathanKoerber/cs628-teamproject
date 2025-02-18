import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Layout = () => {
  const navigate = useNavigate();
  const [cookies, removeCookies] = useCookies([]);
  const [username, setUsername] = useState('');

  const Logout = () => {
    removeCookies('token');
    navigate('/login');
  };

  //   useEffect(() => {
  //       const verifyCookies = async () => {
  //           console.log("API URL:", process.env.REACT_APP_BASE); // Debugging Line
  //           if (!cookies.token) {
  //               console.log("user in not logged in")
  //               navigate("/login");
  //           }

  //           try {
  //               const { data } = await axios.post(
  //                   process.env.REACT_APP_BASE, // Ensure it is correct
  //                   {},
  //                   { withCredentials: true }
  //               );

  //               const { status, user } = data;
  //               setUsername(user);

  //               return status
  //                   ? toast(`Hello ${user}`, { position: "top-right" })
  //                   : (removeCookies("token"), navigate("/login"));
  //           } catch (error) {
  //               console.error("Axios Error:", error);
  //           }
  //       };

  //       verifyCookies().then();
  //   }, [cookies, navigate, removeCookies]);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/resume'>Resume</Link>
          </li>
          <li>
            <Link to='/aires'>AI Resume</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/not_a_rout'>NoPage</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
