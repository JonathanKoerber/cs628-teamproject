const fs = require('fs');
const axios = require('axios');
const AIResume = require('../Models/AIResume');
const multer = require('multer');
const pdf = require('pdf-parse');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Upload resume and analyze
const uploadResume = async (req, res) => {
  try {
    const { name, email, jobDescription } = req.body;
    const resumePath = req.file.path;

    // Analyze resume using Gemini API
    const analysis = await analyzeResume(resumePath, jobDescription);

    // Save analysis to database
    const details = new AIResume({
        name,
        email,
        resumePath,
        jobDescription,
        analysis,
    });
    await details.save();

    res.status(200).json({ analysis });
  } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Analysis failed' });
  }
};

// Analyze resume using Gemini API
const analyzeResume = async (resumePath, jobDescription) => {
    try { 
        // Check if the file exists
        if (!fs.existsSync(resumePath)) {
            throw new Error(`File not found: ${resumePath}`);
        }
    
        // Read the PDF file
        const dataBuffer = fs.readFileSync(resumePath);
    
        // Extract text from the PDF
        const data = await pdf(dataBuffer);
        const resumeText = data.text;

        const prompt = `You are a resume rating and improvement assistant. Your task is to evaluate a provided resume, considering the job description if available, and suggest improvements based solely on the information within the resume.`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: `${prompt} Resume: ${resumeText} Job Description: ${jobDescription}` }
                    ]
                }
            ]
        };

        const response = await axios.post(`
            https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            requestBody,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
};

// refine resume
const refineResume = async (req, res) => {
    const { text } = req.body;
    try {
        let enhancedText = text;

        const prompt = `You are a professional resume writer. Your task is to enhance the provided profile/summary or work experience text for a resume. Enhance the given text to make it more impactful and suitable for a resume. Focus on conciseness, strong action verbs, and quantifiable achievements. Incorporate relevant keywords to optimize the resume for applicant tracking systems. Do not add any information that is not present in the user-provided text.  Only enhance the existing content. Maintain the overall meaning and tone of the original text.`;
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: `${prompt} user_input: ${text}` }
                    ]
                }
            ]
        };
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            requestBody,
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        enhancedText = response.data.candidates[0].content.parts[0].text ;

        res.json({ enhancedText });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { uploadResume, upload, refineResume };