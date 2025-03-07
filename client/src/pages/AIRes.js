import React, { useState } from "react";
import axios from "axios";
import "../Style/AIResume.css";
import { useSelector } from "react-redux";

const AIRes = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);

  const name = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("name", name || "Anonymous");
    formData.append("email", email || "no-email@example.com");

    setLoading(true);

    try {
        const response = await axios.post(process.env.REACT_APP_RESUME_AI, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setAnalysis(response.data.analysis);

        const fileUrl = URL.createObjectURL(resume);
        setResumeUrl(fileUrl);
    } catch (error) {
        console.error("Error uploading resume:", error);
    } finally {
        setLoading(false);
    }
  };


  const formatAnalysis = (text) => {

    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    formattedText = formattedText.replace(/\n/g, "<br />");

    return formattedText;
  };

  return (
    <div className="ai-resume-container">
      <h2 className="ai-resume-title">AI Resume Checker</h2>

      <form onSubmit={handleSubmit} className="ai-resume-form">
        <p>Upload the resume (only in PDF format)</p>
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          required
          className="ai-resume-file-input"
        />
        <textarea
          placeholder="Enter job description (optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="ai-resume-textarea"
        />
        <button
          type="submit"
          disabled={loading}
          className={`ai-resume-submit-button ${loading ? "disabled" : ""}`}
        >
          {loading ? "Analyzing..." : "Upload and Analyze"}
        </button>
      </form>

      {loading && (
        <div className="ai-resume-loading">
          <div className="spinner"></div>
          <p>Analyzing your resume. Please wait...</p>
        </div>
      )}


      {(analysis || resumeUrl) && (
        <div className="ai-resume-analysis-pdf-container">
          {/* Analysis Section */}
          {analysis && (
            <div className="ai-resume-analysis-section">
              <h3>Analysis:</h3>
              <div
                dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
                className="ai-resume-analysis-content"
              />
            </div>
          )}

          {/* PDF Section */}
          {resumeUrl && (
            <div className="ai-resume-pdf-section">
              <h3>Uploaded Resume:</h3>
              <iframe
                src={resumeUrl}
                className="ai-resume-iframe"
                title="Uploaded Resume"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRes;