import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import '../Style/Layout.css';
import logo from '../assets/jazi_logo_removebg.png';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.message);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    navigate("/");
    try {
     dispatch(logout())
    }catch(err){
      console.log("logout response error: ", err);
    }
  };

  return (
    <>
      <div className='nav-container'>
        <nav className='navbar'>
          <Link to='/'>
            <img src={logo} alt='Jazi AI Resume logo' className='logo' />
          </Link>

          <div className='right-nav'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
              ) : (
                <li>
                  <Link>Profile</Link>
                </li>
              )}
              <li>
                <Link to='/resume'>Resume</Link>
              </li>
              <li>
                <Link to='/aires'>AI Resume</Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <button className='btn-signin' onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className='blue-font'>
                    <Link className='wht-btn' to='/signup'>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <ToastContainer />
      </div>

      {/* Route content will be rendered here */}
      <Outlet />
    </>
  );
};

export default Layout;
