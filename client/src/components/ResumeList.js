import React from 'react';

const ResumeList = ({ resumes, fetchError }) => {
  return (
    <div className="resume-list">
      <h3>Your Saved Resumes</h3>
      {fetchError && <div className="error-message">{fetchError}. Please try again.</div>}
      {resumes.length === 0 ? (
        <div>
          <p>No resumes found.</p>
        </div>
      ) : (
        <ul>
          {resumes.map((resume) => (
            <li key={resume._id}>
              <h4>{resume.name}</h4>
              <p>Email: {resume.contact.email}</p>
              <p>Phone: {resume.contact.phone}</p>
              <p>Skills: {resume.skills}</p>
              <p>Summary: {resume.summary}</p>
              {/* You can display more fields here as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
