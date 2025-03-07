const Resume = require("../Models/ResumeModel");

module.exports.addResume = async (req, res) => {
    try {
        console.log("add resume", req.user.id)
        console.log("req.body", req.body)
        // Extract data from the request body
        const { title, heading, experience, education, skills, projects, certifications} = req.body;

        const newResume = await Resume.create({
            userId: req.user.id,
            title,
            heading,       // Single object
            experience,    // Array of objects
            education,     // Array of objects
            skills,        // Single object
            projects,      // Array of objects
            certifications // Array of objects
        });
        console.log("newResume", newResume)
        newResume.save();
        return res.status(201).json({
            status: true,
            message: 'Resume added successfully',
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: 'Failed to add resume',
            error: err.message
        });
    }
};

module.exports.getResumes = async (req, res) => {
    try{
        console.log("getting resumes")
        const user = req.user;
        console.log("user", user)
        const resumes = await Resume.find({userId: user.id});
        if (!resumes){
            return res.status(404).json({message: 'Resumes not found'})
        }
        res.status(200).json(resumes);
    }catch (err){
        res.status(500).json({message: 'Error fetching resumes', error: err})
    }
}
module.exports.getResumeById = async (req, res) => {
    console.log("getting resume by id")
    try{
        const user = req.user;
        const id = req.params.id;
        const resume = await Resume.findOne({userId: user.id, _id: id});
        if (!resume){
            return res.status(404).json({message: 'Resume not found'})
        }
        res.status(200).json(resume);
    }catch (err){
        res.status(500).json({message: 'Error fetching resumes', error: err})
    }
}

module.exports.updateResume = async (req, res) => {
    try{
        const updateResume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if(!updateResume){
            return res.status(404).json({message: 'Resume not found'});
        }
        res.status(200).json(updateResume);
        res.json({ status: true, message: "Resume updated successfully", resume: updatedResume });
    } catch (error) {
    res.status(500).json({ status: false, message: "Failed to update resume", error: error.message });
    }
}
module.exports.deleteResume = async (req, res) => {
    try{
        const deleteResume = await Resume.findByIdAndDelete(req.params.id);
        if(!deleteResume){
            return res.status(404).json({message: 'Resume not found'});
        }
        res.json({ status: true, message: "Resume deleted successfully"});
    }catch (error) {
        res.status(500).json({ status: false, message: "Failed to delete resume", error: error.message });
    }
}
