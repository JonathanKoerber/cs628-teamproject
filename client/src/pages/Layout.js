import {Outlet, Link, useNavigate} from "react-router-dom";
import {useEffect } from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/auth/authSlice";
import { validateUser} from "../redux/auth/authActions";
import {setUser} from "../redux/user/userSlice";
import Cookies from "js-cookie";
import Signup from "../components/Signup";
import LoginPage from "./LoginPage";
//import {logout, verifyUser} from "../redux/user/authSlice";
import '../Style/Layout.css';
import logo from '../assets/jazi_logo_removebg.png';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.username);
  const message = useSelector(state => state.auth.message);

  useEffect(() => {
    if (message != null) {
      toast.error(message, { position: "top-right" });
    }
  }, [message]);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    dispatch(validateUser())
      .unwrap()
      .then((response) => {
        console.log("validate user success", response);
      }).catch(err => {
        // navigate('/login');
      });
  }, [isLoggedIn, dispatch, navigate]);

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
  };

  return (
    <>
      <div className="nav-container">
        <nav className="navbar">

          <Link to="/">
            <img src={logo} alt='Jazi AI Resume logo' className='logo' />

          </Link>


          <div className="right-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/aires">AI Resume</Link></li>
              {isLoggedIn ? (
                <li>
                  <button className="btn-signin" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li><Link to="/signup">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>

      {/* Display username if logged in */}
      <h2>{username ? username : ""}</h2>

      {/* Route content will be rendered here */}
      <Outlet />
    </>
  );
};

export default Layout;
