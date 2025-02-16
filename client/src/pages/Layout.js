import {Outlet, Link, useNavigate} from "react-router-dom";
import {useEffect } from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/user/authSlice";
import { validateUser} from "../redux/user/authActions";
import {setUser} from "../redux/user/userSlice";
import Cookies from "js-cookie";
//import {logout, verifyUser} from "../redux/user/authSlice";

const Layout = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const tokenFromCookie = Cookies.get("token");
        if (tokenFromCookie) {
            // Only dispatch verifyUser if user is not logged in
            dispatch(validateUser())
                .unwrap()
                .catch(() => navigate('/login'));  // Redirect if verification fails
        }else if(!isLoggedIn){
          //  navigate('/login') Todo this function quite work.
        }
    }, [isLoggedIn, dispatch, navigate]);

     const handleLogout = () => {
        console.log("logout");
        dispatch(logout());
        navigate('/login');
        toast("User logged out", {position:"top-right"});
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
            <h2>{user ? user.username : "No User"}</h2>
            <h2> {isLoggedIn ? "user lodded in": "user not logged in"}</h2>
            <Outlet />
        </>
    )
};

export default Layout;