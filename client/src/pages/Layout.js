import {Outlet, Link, useNavigate} from "react-router-dom";
import {useEffect } from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/user/authSlice";
import { validateUser} from "../redux/user/authActions";
import {setUser} from "../redux/user/userSlice";
import Cookies from "js-cookie";
import Signup from "../components/Signup";
import LoginPage from "./LoginPage";
//import {logout, verifyUser} from "../redux/user/authSlice";

const Layout = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   const username = useSelector(state => state.auth.username);
   const message = useSelector(state => state.auth.message);

   useEffect(() => {
      if(message != null){
          toast.error(message, {position: "top-right"})
      }
   }, [message])

    useEffect(() => {
        const tokenFromCookie = Cookies.get("token");
            dispatch(validateUser())
                .unwrap()
                .then((response) => {
                    console.log("validate user success", response)
            }).catch(err => {
                // navigate('/login')
            });  // Redirect if verification fails
        // navigate("/")
    }, [isLoggedIn, dispatch, navigate]);

     const handleLogout = () => {
        console.log("logout");
        dispatch(logout());
     }

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/resume">Resume</Link></li>
                    <li><Link to="/aires">AI Resume</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/not_a_rout">NoPage</Link></li>
                </ul>
            </nav>
            <button className={"login-button"} onClick={() =>handleLogout()}>logout</button>
            <h2>{username ? username : "No User"}</h2>
            <Outlet />
        </>
    )
};

export default Layout;
