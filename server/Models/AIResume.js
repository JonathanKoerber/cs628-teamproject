const mongoose = require("mongoose");

const AIResumeSchema = new mongoose.Schema({
    jobDescription: { type: String, default: "" },
    profileSummary: { type: String, required: true },
    enhancedSummary: { type: String, required: true }
});

module.exports = mongoose.model("AIResume", AIResumeSchema);
