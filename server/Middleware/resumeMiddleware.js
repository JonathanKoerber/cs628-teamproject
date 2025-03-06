const Resume = require('../Models/resumeModel');

// Middleware to validate required fields for creating or updating a resume
const validateResumeFields = (req, res, next) => {
  const { name, email, skills, experience } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !skills) {
    return res.status(400).json({ message: "Name, email, and skills are required fields." });
  }

  // Check if experience is provided and has at least one job
  if (experience && !Array.isArray(experience)) {
    return res.status(400).json({ message: "Experience should be an array." });
  }

  // Proceed to the next middleware or route handler
  next();
};

// Middleware to check if a user owns the resume before updating or deleting
const checkResumeOwnership = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    // If the resume is not found
    if (!resume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    // Check if the resume belongs to the logged-in user
    if (resume.email !== req.user.email) {
      return res.status(403).json({ message: "You can only modify your own resumes." });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while checking resume ownership." });
  }
};

// Middleware to validate specific fields, such as phone number or email format
const validateResumeFormat = (req, res, next) => {
  const { email, phone } = req.body;

  // Simple email validation (use a more robust regex for production)
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Simple phone number validation (adjust the regex to match the desired phone format)
  const phoneRegex = /^[0-9]{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }

  // Proceed to the next middleware or route handler
  next();
};

module.exports = {
  validateResumeFields,
  checkResumeOwnership,
  validateResumeFormat,
};
