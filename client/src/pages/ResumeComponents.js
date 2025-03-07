import React, { useState } from "react";
import {useAddResumeMutation} from "../redux/resume/resumeSlice";
import {toast} from "react-toastify";

const ResumeComponents = () => {
    const [resume, setResume] = useState({
        title: "",
        heading: {
            name: "",
            email: "",
            phone: "",
            linkedin: "",
            github: "",
            summary: ""
        },
        experience: [],
        skills: [],
        certifications: [],
        projects: [],
        education: []
    });
    const [addResume] = useAddResumeMutation();
    // Handles update for Title change
    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        setResume((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    // Handles updates for text inputs
    const handleHeadingChange = (e) => {
        const { name, value } = e.target;
        setResume((prev) => ({
            ...prev,
            heading: {
                ...prev.heading,
                [name]: value
            }
        }));
    };

    // Handles adding new experience
    const addExperience = () => {
        setResume((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { position: "", company: "", startDate: "", endDate: "", location: "", description: "" }
            ]
        }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperience = [...resume.experience];
        updatedExperience[index][name] = value;
        setResume((prev) => ({ ...prev, experience: updatedExperience }));
    };

    // Handles adding new skills
    const handleSkillsChange = (e) => {
        setResume((prev) => ({
            ...prev,
            skills: e.target.value.split(",").map((skill) => skill.trim()) // Convert comma-separated input into an array
        }));
    };

    // Handles adding new certifications
    const addCertification = () => {
        setResume((prev) => ({
            ...prev,
            certifications: [...prev.certifications, { name: "", organization: "", date: "" }]
        }));
    };

    const handleCertificationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCertifications = [...resume.certifications];
        updatedCertifications[index][name] = value;
        setResume((prev) => ({ ...prev, certifications: updatedCertifications }));
    };

    // Handles adding new projects
    const addProject = () => {
        setResume((prev) => ({
            ...prev,
            projects: [...prev.projects, { title: "", description: "", technologies: [], link: "" }]
        }));
    };

    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = [...resume.projects];
        if (name === "technologies") {
            updatedProjects[index][name] = value.split(",").map((tech) => tech.trim());
        } else {
            updatedProjects[index][name] = value;
        }
        setResume((prev) => ({ ...prev, projects: updatedProjects }));
    };

    // Handles adding new education
    const addEducation = () => {
        setResume((prev) => ({
            ...prev,
            education: [...prev.education, { degree: "", school: "", startDate: "", endDate: "", location: "" }]
        }));
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...resume.education];
        updatedEducation[index][name] = value;
        setResume((prev) => ({ ...prev, education: updatedEducation }));
    };
    const clearInputs = () =>{
        setResume({
            title: "",
            heading: {
                name: "",
                email: "",
                phone: "",
                linkedin: "",
                github: "",
                summary: ""
            },
            experience: [],
            skills: [],
            certifications: [],
            projects: [],
            education: []
        });
    }
    const onSubmit = async () => {
        console.log("onSubmit", resume.title === "")
        try {
            if (resume.title === "") {
                toast.error("Title is required");
                return;
            }
            const rsp = await addResume(resume).unwrap;
            console.log("Response", rsp);
            clearInputs();
            toast.success("Resume added successfully");
        } catch (error) {
            console.error("Failed to add resume:", error);
            toast.error(error?.data?.message || "Failed to add resume");
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(resume);
        }}><h2>Title</h2>
            <input type="text" name="title" placeholder="Title" value={resume.title} onChange={handleTitleChange} />
            <h2>Heading</h2>
            <input type="text" name="name" placeholder="Name" value={resume.heading.name} onChange={handleHeadingChange} />
            <input type="email" name="email" placeholder="Email" value={resume.heading.email} onChange={handleHeadingChange} />
            <input type="text" name="phone" placeholder="Phone" value={resume.heading.phone} onChange={handleHeadingChange} />
            <input type="text" name="linkedin" placeholder="LinkedIn URL" value={resume.heading.linkedin} onChange={handleHeadingChange} />
            <input type="text" name="github" placeholder="GitHub URL" value={resume.heading.github} onChange={handleHeadingChange} />
            <textarea name="summary" placeholder="Summary" value={resume.heading.summary} onChange={handleHeadingChange}></textarea>

            <h2>Experience</h2>
            {resume.experience.map((job, index) => (
                <div key={index}>
                    <input type="text" name="position" placeholder="Position" onChange={(e) => handleExperienceChange(index, e)} />
                    <input type="text" name="company" placeholder="Company" onChange={(e) => handleExperienceChange(index, e)} />
                    <input type="text" name="startDate" placeholder="Start Date" onChange={(e) => handleExperienceChange(index, e)} />
                    <input type="text" name="endDate" placeholder="End Date" onChange={(e) => handleExperienceChange(index, e)} />
                    <input type="text" name="location" placeholder="Location" onChange={(e) => handleExperienceChange(index, e)} />
                    <textarea name="description" placeholder="Description" onChange={(e) => handleExperienceChange(index, e)}></textarea>
                </div>
            ))}
            <button type="button" onClick={addExperience}>Add Experience</button>

            <h2>Skills</h2>
            <input type="text" placeholder="Skills (comma-separated)" onChange={handleSkillsChange} />

            <h2>Certifications</h2>
            {resume.certifications.map((cert, index) => (
                <div key={index}>
                    <input type="text" name="name" placeholder="Certification Name" onChange={(e) => handleCertificationChange(index, e)} />
                    <input type="text" name="organization" placeholder="Organization" onChange={(e) => handleCertificationChange(index, e)} />
                    <input type="text" name="date" placeholder="Date" onChange={(e) => handleCertificationChange(index, e)} />
                </div>
            ))}
            <button type="button" onClick={addCertification}>Add Certification</button>

            <h2>Projects</h2>
            {resume.projects.map((project, index) => (
                <div key={index}>
                    <input type="text" name="title" placeholder="Project Title" onChange={(e) => handleProjectChange(index, e)} />
                    <textarea name="description" placeholder="Description" onChange={(e) => handleProjectChange(index, e)}></textarea>
                    <input type="text" name="technologies" placeholder="Technologies (comma-separated)" onChange={(e) => handleProjectChange(index, e)} />
                    <input type="text" name="link" placeholder="Project Link" onChange={(e) => handleProjectChange(index, e)} />
                </div>
            ))}
            <button type="button" onClick={addProject}>Add Project</button>

            <h2>Education</h2>
            {resume.education.map((edu, index) => (
                <div key={index}>
                    <input type="text" name="degree" placeholder="Degree" onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="school" placeholder="School" onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="startDate" placeholder="Start Date" onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="endDate" placeholder="End Date" onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="location" placeholder="Location" onChange={(e) => handleEducationChange(index, e)} />
                </div>
            ))}
            <button type="button" onClick={addEducation}>Add Education</button>

            <button type="submit" onSubmit={()=> onSubmit}>Submit Resume</button>
        </form>
    );
};

export default ResumeComponents;
