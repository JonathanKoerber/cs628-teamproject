import React, { useState } from "react";
import axios from "axios";

const AIRes = () => {

    const [jobDescription, setJobDescription] = useState("");
    const [profileSummary, setProfileSummary] = useState("");
    const [enhancedSummary, setEnhancedSummary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profileSummary) {
            alert("Profile Summary is required.");
            return;
        }

        try {
            const response = await axios.post(process.env.REACT_APP_RESUME_AI, {
                jobDescription,
                profileSummary
            });

            setEnhancedSummary(response.data.enhancedSummary);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="container">
            <h2>AI Resume Enhancer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Description (optional):</label>
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
                <div>
                    <label>Profile Summary:</label>
                    <textarea required value={profileSummary} onChange={(e) => setProfileSummary(e.target.value)} />
                </div>
                <button type="submit">Enhance Resume</button>
            </form>
            {enhancedSummary && (
                <div>
                    <h3>Enhanced Summary:</h3>
                    <p>{enhancedSummary}</p>
                </div>
            )}
        </div>
    );
};

export default AIRes;