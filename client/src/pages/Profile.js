import React from "react";
import {useGetResumesQuery} from "../redux/resume/resumeSlice";

const Profile = () => {
    const resume = {
        "heading": {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone": "+1 (555) 123-4567",
            "linkedin": "https://www.linkedin.com/in/johndoe",
            "github": "https://github.com/johndoe",
            "summary": "Full-stack developer with 5+ years of experience in building scalable web applications."
        },
        "experience": [
            {
                "company": "Tech Corp",
                "position": "Software Engineer",
                "startDate": "2021-01-01",
                "endDate": "2023-12-31",
                "location": "New York, NY",
                "description": "Developed and maintained web applications using React, Node.js, and MongoDB."
            },
            {
                "company": "Innovate Solutions",
                "position": "Frontend Developer",
                "startDate": "2018-06-01",
                "endDate": "2020-12-31",
                "location": "San Francisco, CA",
                "description": "Built responsive UI components using React and integrated APIs with Redux."
            }
        ],
        "education": [
            {
                "school": "University of California, Berkeley",
                "degree": "Bachelor of Science in Computer Science",
                "startDate": "2014-08-01",
                "endDate": "2018-05-31",
                "location": "Berkeley, CA"
            }
        ],
        "skills": [
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB",
            "Redux",
            "Express",
            "Git"
        ],
        "projects": [
            {
                "title": "E-commerce Platform",
                "description": "Developed a full-stack e-commerce platform with user authentication and payment integration.",
                "technologies": ["React", "Node.js", "MongoDB", "Stripe API"],
                "link": "https://github.com/johndoe/ecommerce-platform"
            },
            {
                "title": "Chat App",
                "description": "Built a real-time chat application using WebSockets and Firebase.",
                "technologies": ["React", "Firebase", "WebSockets"],
                "link": "https://github.com/johndoe/chat-app"
            }
        ],
        "certifications": [
            {
                "name": "AWS Certified Developer - Associate",
                "organization": "Amazon Web Services",
                "date": "2022-09-15"
            }
        ]
    }
    const {data, resumes, error, isLoading} = useGetResumesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!resume || !Array.isArray(resume.experience)) return <p>No data found</p>;

const handleAddResume = () =>{

}
    return(
        <>
            <h1>Profile Page</h1>
            <p>Resume test</p>
            <button>Add Resume</button>
            <button>Console Log Resume</button>
        </>
    )
}
export default Profile;