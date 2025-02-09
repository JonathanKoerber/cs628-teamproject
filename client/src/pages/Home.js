import { useState, useEffect } from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

const Home = () => {
    const    navigate = useNavigate()
    const [cookies, removeCookies] = useCookies([]);
    const [username, setUsername ] = useState("")

    const Logout = () => {
        removeCookies("token");
        navigate("/login")
    }

    useEffect(() => {
        const verifyCookies = async () => {
            console.log("API URL:", process.env.REACT_APP_BASE); // Debugging Line
            if (!cookies.token) {
                console.log("user in not logged in")
                navigate("/login");
            }

            try {
                const { data } = await axios.post(
                     process.env.REACT_APP_BASE, // Ensure it is correct
                    {},
                    { withCredentials: true }
                );

                const { status, user } = data;
                setUsername(user);

                return status
                    ? toast(`Hello ${user}`, { position: "top-right" })
                    : (removeCookies("token"), navigate("/login"));
            } catch (error) {
                console.error("Axios Error:", error);
            }
        };

        verifyCookies().then();
    }, [cookies, navigate, removeCookies]);

    return (
        <>
            <div className="home_page">
                <h4>
                    Welcome <span>tp the HOME page!!!</span>
                </h4>

            </div>
            <ToastContainer />
        </>
    );
};
export default Home;