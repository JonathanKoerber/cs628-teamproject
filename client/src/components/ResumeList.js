import React from 'react';
import '../Style/ResumeList.css';
import axios from 'axios';

const ResumeList = ({ resumes, fetchError, onEditClick, onDeleteClick }) => {
  
  // Delete function to trigger onDeleteClick and make API call
  const handleDelete = async (resumeId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        alert('Resume deleted successfully!');
        onDeleteClick(resumeId);
        // Call function to update the state or re-fetch the resumes
        
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  return (
    <div className="resume-list">
      <h3>Your Saved Resumes</h3>
      {fetchError && <div className="error-message">{fetchError}. Please try again.</div>}
      {resumes.length === 0 ? (
        <div className="no-resumes">
          <p>No resumes found.</p>
        </div>
      ) : (
        <div className="resume-card-container">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <h4 className="resume-name">{resume.name}</h4>
              <p className="resume-email">Email: {resume.email}</p>
              <p className="resume-skills">Skills: {resume.skills}</p>
              <div className="resume-actions">
                <button className="edit-button" onClick={() => onEditClick(resume._id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(resume._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;