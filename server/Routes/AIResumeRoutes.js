const express = require("express");
const axios = require("axios");
const AIResume = require("../Models/AIResume");
const router = express.Router();
require("dotenv").config();


router.post("/enhance", async (req, res) => {
   const { jobDescription, profileSummary } = req.body;


   if (!profileSummary) {
       return res.status(400).json({ error: "Profile summary is required." });
   }


   try {
       let enhancedSummary = profileSummary;


       if (jobDescription) {
           const prompt = `You are a Resume Expert, responsible for refining and tailoring a user's resume summary section based on the given job description. If a job description is provided, analyze it carefully and adjust the profile summary to highlight relevant skills, experience, and qualifications while ensuring that only the details explicitly stated in the user’s existing summary are included. No additional information should be introduced. The revised summary should be clear, concise, and directly replace the original text. If no job description is provided, enhance the readability, clarity, and flow of the profile summary without altering its meaning. Grammar, spelling, and structural errors should be corrected while ensuring coherence. The enhanced summary should maintain the original intent and factual correctness of the provided content. Do not modify or include any other sections such as work experience unless explicitly requested. This task is solely for refining the profile summary section of the resume.`;


           const requestBody = {
               contents: [
                   {
                       parts: [
                           { text: `${prompt} Job Description: ${jobDescription} Profile Summary: ${profileSummary}` }
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


           // Extracting enhanced summary from API response
           enhancedSummary = response.data.candidates[0].content.parts[0].text ; //|| profileSummary
       }


       // Save to MongoDB
       const resumeEntry = new AIResume({ jobDescription, profileSummary, enhancedSummary });
       await resumeEntry.save();


       res.json({ enhancedSummary });
   } catch (error) {
       console.error("Gemini API Error:", error.response?.data || error.message);
       res.status(500).json({ error: "Something went wrong" });
   }
});


module.exports = router;