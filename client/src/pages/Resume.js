import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Resume.css';
import DisplayResume from '../components/DisplayResume';
import ResumeList from '../components/ResumeList';
import ResumePreview from '../components/ResumePreview';

const Resume = () => {
  // States for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState([
    {
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      responsibilities: [''],
    },
  ]);
  const [education, setEducation] = useState([
    { degree: '', institution: '', graduation_year: '' },
  ]);
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState([
    { name: '', year: '' },
  ]);
  const [projects, setProjects] = useState([
    { name: '', description: '', technologies: [''] },
  ]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resumes, setResumes] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [showForm, setShowForm] = useState(true); // Show the form

  const [refinedSummary, setRefinedSummary] = useState('');
  const [refinedResponsibilities, setRefinedResponsibilities] = useState([]);

  // Fetch resumes on component mount
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

  useEffect(() => {
    fetchResumes(); // Call fetchResumes when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !skills) {
      setError('Name, email, and skills are required!');
      return;
    }

    setError('');
    setSuccessMessage('');

    const resumeData = {
      name,
      contact: {
        email,
        phone,
        location,
        linkedin,
        github,
      },
      summary,
      experience,
      education,
      skills,
      certifications,
      projects,
    };

    try {
      await axios.post('http://localhost:5000/api/resume', resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setSuccessMessage('Resume saved successfully!');
      resetForm();
      fetchResumes(); // Re-fetch the resumes after saving
    } catch (err) {
      setError('Error saving resume');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setLinkedin('');
    setGithub('');
    setSummary('');
    setExperience([
      {
        title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        responsibilities: [''],
      },
    ]);
    setEducation([{ degree: '', institution: '', graduation_year: '' }]);
    setSkills('');
    setCertifications([{ name: '', year: '' }]);
    setProjects([{ name: '', description: '', technologies: [''] }]);
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

  // Add a new experience entry
  const handleExperienceChange = (index, e) => {
    const updatedExperience = [...experience];
    updatedExperience[index][e.target.name] = e.target.value;
    setExperience(updatedExperience);
  };

  // Add a new education entry
  const handleEducationChange = (index, e) => {
    const updatedEducation = [...education];
    updatedEducation[index][e.target.name] = e.target.value;
    setEducation(updatedEducation);
  };

  // Add a new certification entry
  const handleCertificationChange = (index, e) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][e.target.name] = e.target.value;
    setCertifications(updatedCertifications);
  };

  // Add a new project entry
  const handleProjectChange = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
  };

  const handleTechnologyChange = (projIndex, techIndex, e) => {
    const updatedProjects = [...projects];
    updatedProjects[projIndex].technologies[techIndex] = e.target.value;
    setProjects(updatedProjects);
  };

  // Add a new responsibility in experience
  const handleResponsibilityChange = (index, e, responsibilityIndex) => {
    const updatedExperience = [...experience];
    updatedExperience[index].responsibilities[responsibilityIndex] =
      e.target.value;
    setExperience(updatedExperience);
  };

  // Handle dynamic input for experience, education, certifications, and projects
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        responsibilities: [''],
      },
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: '', institution: '', graduation_year: '' },
    ]);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', year: '' }]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { name: '', description: '', technologies: [''] },
    ]);
  };

  const handleGeminiSummary = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/airesume/refine',
        { text: summary }
      );
      setRefinedSummary(response.data.enhancedText);
      console.log(response.data.enhancedText);
    } catch (error) {
      console.error('Error fetching refined summary:', error);
    }
  };

  const handleGeminiResponsibilities = async (index) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/airesume/refine',
        {
          text: experience[index].responsibilities.join('. '),
        }
      );
      const updatedResponsibilities = [...refinedResponsibilities];
      updatedResponsibilities[index] = response.data.enhancedText.split('. ');
      setRefinedResponsibilities(updatedResponsibilities);
      console.log(response.data.enhancedText);
    } catch (error) {
      console.error('Error fetching refined responsibilities:', error);
    }
  };

  return (
    <div className='container-wrapper'>
      <div className='resume-container-left'>
        <ResumePreview
          name={name}
          email={email}
          phone={phone}
          location={location}
          linkedin={linkedin}
          github={github}
          summary={summary}
          experience={experience}
          education={education}
          skills={skills}
          certifications={certifications}
          projects={projects}
        />
      </div>
      <div className='resume-container'>
        <h2>Create Your Resume</h2>
        {/* Show the form conditionally based on showForm */}
        {showForm && (
          <form onSubmit={handleSubmit} className='resume-form'>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                id='phone'
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Your Phone'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='location'>Location</label>
              <input
                id='location'
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Your Location'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='linkedin'>LinkedIn</label>
              <input
                id='linkedin'
                type='text'
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder='Your LinkedIn'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='github'>GitHub</label>
              <input
                id='github'
                type='text'
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder='Your GitHub'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='summary'>Summary</label>
              <textarea
                id='summary'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder='Summary'
              />

              <button
                className='btn-three'
                type='button'
                onClick={handleGeminiSummary}
              >
                Refine with AI
              </button>
            </div>
            <div>
              {refinedSummary && (
                <div className='ai-response'>
                  <p>
                    <strong>Refined Summary:</strong> {refinedSummary}
                  </p>
                  <button
                    type='button'
                    onClick={() => setSummary(refinedSummary)}
                  >
                    Use This
                  </button>
                </div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='skills'>Skills</label>
              <textarea
                id='skills'
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder='Your Skills'
              />
            </div>

            {/* Experience */}
            <div className='form-group'>
              <label>Experience</label>
              {experience.map((exp, index) => (
                <div key={index} className='experience-entry'>
                  <input
                    name='title'
                    type='text'
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder='Job Title'
                  />
                  <input
                    name='company'
                    type='text'
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder='Company'
                  />
                  <input
                    name='location'
                    type='text'
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder='Location'
                  />
                  <input
                    name='start_date'
                    type='date'
                    value={exp.start_date}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder='Start Date'
                  />
                  <input
                    name='end_date'
                    type='date'
                    value={exp.end_date}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder='End Date'
                  />
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className='responsibility-entry'>
                      <input
                        type='text'
                        value={resp}
                        onChange={(e) =>
                          handleResponsibilityChange(index, e, respIndex)
                        }
                        placeholder='Responsibility'
                      />
                    </div>
                  ))}
                  <button
                    className='btn-three'
                    type='button'
                    onClick={() => handleGeminiResponsibilities(index)}
                  >
                    Refine with AI
                  </button>
                  <button
                    className='btn-three'
                    type='button'
                    onClick={() => {
                      const updatedExperience = [...experience];
                      updatedExperience[index].responsibilities.push('');
                      setExperience(updatedExperience);
                    }}
                  >
                    Add Responsibility
                  </button>
                  {refinedResponsibilities[index] && (
                    <div className='ai-response'>
                      <p>
                        <strong>Refined Responsibilities:</strong>
                      </p>
                      <ul>
                        {refinedResponsibilities[index].map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                      <button
                        type='button'
                        onClick={() => {
                          const updatedExperience = [...experience];
                          updatedExperience[index].responsibilities =
                            refinedResponsibilities[index];
                          setExperience(updatedExperience);
                        }}
                      >
                        Use These
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                className='btn-three'
                type='button'
                onClick={addExperience}
              >
                Add Experience
              </button>
            </div>

            {/* Education */}
            <div className='form-group'>
              <label>Education</label>
              {education.map((edu, index) => (
                <div key={index} className='education-entry'>
                  <input
                    name='degree'
                    type='text'
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder='Degree'
                  />
                  <input
                    name='institution'
                    type='text'
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder='Institution'
                  />
                  <input
                    name='graduation_year'
                    type='number'
                    value={edu.graduation_year}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder='Graduation Year'
                  />
                </div>
              ))}
              <button
                className='btn-three'
                type='button'
                onClick={addEducation}
              >
                Add Education
              </button>
            </div>

            {/* Certifications */}
            <div className='form-group'>
              <label>Certifications</label>
              {certifications.map((cert, index) => (
                <div key={index} className='certification-entry'>
                  <input
                    name='name'
                    type='text'
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, e)}
                    placeholder='Certification Name'
                  />
                  <input
                    name='year'
                    type='number'
                    value={cert.year}
                    onChange={(e) => handleCertificationChange(index, e)}
                    placeholder='Year'
                  />
                </div>
              ))}
              <button
                className='btn-three'
                type='button'
                onClick={addCertification}
              >
                Add Certification
              </button>
            </div>

            {/* Projects */}
            <div className='form-group'>
              <label>Projects</label>
              {projects.map((proj, index) => (
                <div key={index} className='project-entry'>
                  <input
                    name='name'
                    type='text'
                    value={proj.name}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder='Project Name'
                  />
                  <textarea
                    name='description'
                    value={proj.description}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder='Project Description'
                  />
                  {proj.technologies.map((tech, techIndex) => (
                    <div key={techIndex}>
                      <input
                        type='text'
                        value={tech}
                        onChange={(e) =>
                          handleTechnologyChange(index, techIndex, e)
                        }
                        placeholder='Technology'
                      />
                    </div>
                  ))}
                  <button
                    className='btn-three'
                    type='button'
                    onClick={() => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].technologies.push('');
                      setProjects(updatedProjects);
                    }}
                  >
                    Add Technology
                  </button>
                </div>
              ))}
              <button className='btn-three' type='button' onClick={addProject}>
                Add Project
              </button>
            </div>

            {error && <div className='error-message'>{error}</div>}
            {successMessage && (
              <div className='success-message'>{successMessage}</div>
            )}

            <button type='submit' className='btn-two' disabled={!isFormValid}>
              Save Resume
            </button>
          </form>
        )}

        {/* Add ResumeList component to display fetched resumes */}
        <ResumeList resumes={resumes} fetchError={fetchError} />
      </div>
    </div>
  );
};

export default Resume;
