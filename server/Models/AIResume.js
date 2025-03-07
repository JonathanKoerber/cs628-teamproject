const mongoose = require("mongoose");

const AIResumeSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    resumePath: { type: String, required: true },
    jobDescription: { type: String, default: "" },
    analysis: { type: String, default: "" },
});

module.exports = mongoose.model("AIResume", AIResumeSchema);
