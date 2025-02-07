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
  const [resumes, setResumes] = useState([]); // Store fetched resumes
  const [fetchError, setFetchError] = useState(''); // To handle fetch errors

  // Fetch user's resumes when component mounts
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
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !skills) {
      setError('Name, email, and skills are required!');
      return;
    }

    setError('');
    setSuccessMessage(''); // Clear any previous success messages

    const resumeData = { name, email, phone, education, projects, skills };

    try {
      await axios.post('http://localhost:5000/api/resume', resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming JWT is saved in localStorage
        },
      });
      setSuccessMessage('Resume saved successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setEducation('');
      setProjects('');
      setSkills('');
      // Fetch resumes again after a successful save
      const response = await axios.get('http://localhost:5000/api/resume', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setResumes(response.data);
    } catch (err) {
      console.error(err);
      setError('Error saving resume');
    }
  };

  const isFormValid = name && email && skills && !error;

  return (
    <div className="resume-container">
      <h2>Create Your Resume</h2>

      {/* Resume form */}
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone"
          />
        </div>
        <div className="form-group">
          <label>Education</label>
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Your Education"
          />
        </div>
        <div className="form-group">
          <label>Projects</label>
          <textarea
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            placeholder="Your Projects"
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <textarea
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
          disabled={!isFormValid} // Disable button if form is invalid
        >
          Save Resume
        </button>
      </form>

      {/* Display the fetched resumes */}
      <div className="resume-list">
        <h3>Your Saved Resumes</h3>
        {fetchError && <div className="error-message">{fetchError}</div>}
        {resumes.length === 0 ? (
          <p>No resumes found.</p>
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
