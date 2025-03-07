import React from 'react';
import {useNavigate} from "react-router-dom"
const ResumeCard = ({ resume }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/resume/${resume._id}`)
    }
    return (
        <div className="resume-card" onClick={handleClick}>
            <h3>{resume.title}</h3>
           // add heading
        </div>
    );
};

export default ResumeCard;