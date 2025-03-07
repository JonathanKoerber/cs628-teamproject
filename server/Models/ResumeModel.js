const mongoose = require("mongoose");

const HeadingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    summary: String
});

const ExperienceSchema = new mongoose.Schema({
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    location: String,
    description: String
});

const EducationSchema = new mongoose.Schema({
    school: String,
    degree: String,
    startDate: Date,
    endDate: Date,
    location: String
});

const SkillsSchema = new mongoose.Schema({
    skills: [String]  // Array of skill names
});

const ProjectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    technologies: [String],
    link: String
});

const CertificationsSchema = new mongoose.Schema({
    name: String,
    organization: String,
    date: Date
});

// Define the Resume Schema with each section separately
const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    heading: HeadingSchema,  // Single heading
    experience: [ExperienceSchema],  // Multiple experiences
    education: [EducationSchema],  // Multiple education entries
    skills: [String],  // One skills section
    projects: [ProjectsSchema],  // Multiple projects
    certifications: [CertificationsSchema]  // Multiple certifications
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
