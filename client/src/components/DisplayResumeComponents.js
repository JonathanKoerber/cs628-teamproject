export const Heading = ({ content }) => {
    return (
        <div className="heading">
            <h1>{content.name}</h1>
            <p>Email: <a href={`mailto:${content.email}`}>{content.email}</a></p>
            <p>Phone: {content.phone}</p>
            <p>LinkedIn: <a href={content.linkedin} target="_blank" rel="noopener noreferrer">View LinkedIn</a></p>
            <p>GitHub: <a href={content.github} target="_blank" rel="noopener noreferrer">View GitHub</a></p>
            <p><strong>Summary:</strong> {content.summary}</p>
        </div>
    );
};
export const Experience = ({ content }) => {
    if (!content) return null;
    return (
        <div className="experience">
            <h2>Experience</h2>
            {content.map((job, index) => (
                <div key={index} className="job">
                    <h3>{job.position} at {job.company}</h3>
                    <p>{job.startDate} - {job.endDate}</p>
                    <p>Location: {job.location}</p>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    );
};
export const Skills = ({ content }) => {
    if (!content || content.length === 0) return null;
    return (
        <div className="skills">
            <h2>Skills</h2>
            <ul>
                {content.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};
export const Certification = ({ content }) => {
    if (!content) return null;
    return (
        <div className="certifications">
            <h2>Certifications</h2>
            {content.map((cert, index) => (
                <div key={index} className="cert">
                    <h3>{cert.name}</h3>
                    <p>{cert.organization}</p>
                    <p>Date: {cert.date}</p>
                </div>
            ))}
        </div>
    );
};
export const Projects = ({ content }) => {
    if (!content) return null;
    return (

        <div className="projects">
            <h2>Projects</h2>
            {content.map((project, index) => (
                <div key={index} className="project">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>Technologies: {project.technologies.join(', ')}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            ))}
        </div>
    );
};
export const Education = ({ content }) => {
    if (!content) return null;
    return (
        <div className="education">
            <h2>Education</h2>
            {content.map((edu, index) => (
                <div key={index} className="edu">
                    <h3>{edu.degree} from {edu.school}</h3>
                    <p>{edu.startDate} - {edu.endDate}</p>
                    <p>Location: {edu.location}</p>
                </div>
            ))}
        </div>
    );
};
