const Resume = require('../Models/resumeModel');

// Controller to create a new resume
const createResume = async (req, res) => {
  const { 
    name, 
    email, 
    phone, 
    location, 
    linkedin, 
    github, 
    summary, 
    skills, 
    experience, 
    education, 
    certifications, 
    projects 
  } = req.body;

  try {
    const newResume = new Resume({
      name,
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      skills,
      experience,
      education,
      certifications,
      projects,
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume created successfully', resume: newResume });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error });
  }
};

// Controller to get all resumes for the logged-in user
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ email: req.user.email });
    if (resumes.length === 0) {
      return res.status(404).json({ message: 'No resumes found' });
    }
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
};

// Controller to update a resume by ID
const updateResume = async (req, res) => {
  const { name, email, phone, location, linkedin, github, summary, skills, experience, education, certifications, projects } = req.body;

  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        location,
        linkedin,
        github,
        summary,
        skills,
        experience,
        education,
        certifications,
        projects,
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
};

// Controller to delete a resume by ID
const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};

module.exports = {
  createResume,
  getResumes,
  updateResume,
  deleteResume
};
