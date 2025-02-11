import { useState, useEffect } from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

const Home = () => {


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