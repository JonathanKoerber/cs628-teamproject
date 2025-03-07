const mongoose = require('mongoose');

// Define the resume schema
const resumeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  phone: { 
    type: String, 
    required: false 
  },
  location: { 
    type: String, 
    required: false 
  },
  linkedin: { 
    type: String, 
    required: false 
  },
  github: { 
    type: String, 
    required: false 
  },
  summary: { 
    type: String, 
    required: false 
  },
  skills: { 
    type: String, 
    required: true 
  },
  experience: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    responsibilities: [{ type: String, required: true }]
  }],
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    graduation_year: { type: Number, required: true }
  }],
  certifications: [{
    name: { type: String, required: true },
    year: { type: Number, required: true }
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the 'updatedAt' field every time the resume is updated
resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Resume model
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
