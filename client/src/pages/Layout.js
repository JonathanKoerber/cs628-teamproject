import { Outlet, Link } from "react-router-dom";

const Layout = () => {
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

            <Outlet />
        </>
    )
};

export default Layout;