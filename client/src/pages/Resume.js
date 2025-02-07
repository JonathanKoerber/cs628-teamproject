import React, { useState } from 'react';
import axios from 'axios';
import './Resume.css';

const Resume = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !skills) {
      setError('Name, email, and skills are required!');
      return;
    }

    setError('');

    const resumeData = { name, email, phone, education, projects, skills };

    try {
      await axios.post('http://localhost:5000/api/resume', resumeData);
      alert('Resume saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving resume');
    }
  };

  return (
    <div className="resume-container">
      <h2>Create Your Resume</h2>
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone" />
        </div>
        <div className="form-group">
          <label>Education</label>
          <textarea value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Your Education" />
        </div>
        <div className="form-group">
          <label>Projects</label>
          <textarea value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="Your Projects" />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Your Skills" />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">Save Resume</button>
      </form>
    </div>
  );
};

export default Resume;
