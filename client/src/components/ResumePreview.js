import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../Style/ResumePreview.css';

const ResumePreview = ({
  name,
  email,
  phone,
  location,
  linkedin,
  github,
  summary,
  experience,
  education,
  skills,
  certifications,
  projects,
}) => {
  const [template, setTemplate] = useState(1);

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const resumeContent = document.getElementById('resume-preview-content');

    doc.html(resumeContent, {
      callback: (doc) => {
        doc.save(`${name}_resume.pdf`);
      },
      x: 1,
      y: 1,
      width: 190,
      windowWidth: 1200,
      html2canvas: {
        scale: 0.215,
      },
    });
  };

  return (
    <div>
      {/* Template Selection */}
      <div className='template-selection'>
        <button className='btn-one' onClick={() => setTemplate(1)}>
          Template 1
        </button>
        <button className='btn-one' onClick={() => setTemplate(2)}>
          Template 2
        </button>
      </div>

      {/* Resume Preview */}
      <div
        id='resume-preview-content'
        className={`resume-preview template-${template}`}
      >
        <h2 className='resume-name'>{name || 'Your Name'}</h2>

        <div className='resume-contact'>
          {email && <p>Email: {email}</p>}
          {phone && <p>Phone: {phone}</p>}
          {location && <p>Location: {location}</p>}
          {linkedin && (
            <p>
              LinkedIn:{' '}
              <a href={linkedin} target='_blank' rel='noopener noreferrer'>
                {linkedin}
              </a>
            </p>
          )}
          {github && (
            <p>
              GitHub:{' '}
              <a href={github} target='_blank' rel='noopener noreferrer'>
                {github}
              </a>
            </p>
          )}
        </div>

        {summary && (
          <div className='resume-section'>
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {experience.length > 0 && experience.some((exp) => exp.title) && (
          <div className='resume-section'>
            <h3>Experience</h3>
            {experience.map((exp, index) =>
              exp.title ? (
                <div key={index} className='resume-entry'>
                  <h4>
                    {exp.title} at {exp.company}
                  </h4>
                  <p>
                    {exp.location} | {exp.start_date} - {exp.end_date}
                  </p>
                  <ul>
                    {exp.responsibilities.map(
                      (resp, i) => resp && <li key={i}>{resp}</li>
                    )}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}

        {education.length > 0 && education.some((edu) => edu.degree) && (
          <div className='resume-section'>
            <h3>Education</h3>
            {education.map((edu, index) =>
              edu.degree ? (
                <div key={index} className='resume-entry'>
                  <h4>{edu.degree}</h4>
                  <p>
                    {edu.institution} | {edu.graduation_year}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}

        {skills && (
          <div className='resume-section'>
            <h3>Skills</h3>
            <p>{skills}</p>
          </div>
        )}

        {certifications.length > 0 &&
          certifications.some((cert) => cert.name) && (
            <div className='resume-section'>
              <h3>Certifications</h3>
              <ul>
                {certifications.map((cert, index) =>
                  cert.name ? (
                    <li key={index}>
                      {cert.name} ({cert.year})
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

        {projects.length > 0 && projects.some((proj) => proj.name) && (
          <div className='resume-section'>
            <h3>Projects</h3>
            {projects.map((proj, index) =>
              proj.name ? (
                <div key={index} className='resume-entry'>
                  <h4>{proj.name}</h4>
                  <p>{proj.description}</p>
                  <p>
                    <strong>Technologies:</strong>{' '}
                    {proj.technologies.join(', ')}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Download Button */}
      <button
        className='download-btn btn-two margin-left'
        onClick={generatePDF}
      >
        Download Resume
      </button>
    </div>
  );
};

export default ResumePreview;
