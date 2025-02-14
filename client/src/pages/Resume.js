import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Resume.css';

const Resume = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resumes, setResumes] = useState([]);
  const [fetchError, setFetchError] = useState('');
  
  // Fetch resumes on component mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resume', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setResumes(response.data);
      } catch (err) {
        setFetchError('Error fetching resumes');
      }
    };

    fetchResumes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !skills) {
      setError('Name, email, and skills are required!');
      return;
    }
    if (phone && !/^\d+$/.test(phone)) {
      setError('Phone number should contain only numbers');
      return;
    }

    setError('');
    setSuccessMessage('');

    const resumeData = { name, email, phone, education, projects, skills };

    try {
      await axios.post('http://localhost:5000/api/resume', resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setSuccessMessage('Resume saved successfully!');
      resetForm();
      fetchResumes();
    } catch (err) {
      setError('Error saving resume');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setEducation('');
    setProjects('');
    setSkills('');
  };

  // Handle success and error messages timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, error]);

  const isFormValid = name && email && skills && !error;

  return (
    <div className="resume-container">
      <h2>Create Your Resume</h2>

      {/* Resume Form */}
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <textarea
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Your Education"
          />
        </div>
        <div className="form-group">
          <label htmlFor="projects">Projects</label>
          <textarea
            id="projects"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            placeholder="Your Projects"
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Your Skills"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid}
        >
          Save Resume
        </button>
      </form>

      {/* Display Fetched Resumes */}
      <div className="resume-list">
        <h3>Your Saved Resumes</h3>
        {fetchError && <div className="error-message">{fetchError}</div>}
        {resumes.length === 0 ? (
          <div>
            <p>No resumes found.</p>
            <button onClick={() => setShowForm(true)}>Create New Resume</button>
          </div>
        ) : (
          <ul>
            {resumes.map((resume) => (
              <li key={resume._id}>
                <h4>{resume.name}</h4>
                <p>Email: {resume.email}</p>
                <p>Phone: {resume.phone}</p>
                <p>Skills: {resume.skills}</p>
                <p>Education: {resume.education}</p>
                <p>Projects: {resume.projects}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Resume;
