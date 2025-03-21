const express = require('express');
const router = express.Router();
const { createResume, getResumes, updateResume, deleteResume, getResumeById } = require('../Controlers/resumeController');
const { userVerification } = require('../Middleware/AuthMiddleware');
const { validateResumeFields, checkResumeOwnership, validateResumeFormat } = require('../Middleware/resumeMiddleware');

// Route to create a new resume
router.post('/resume', userVerification, validateResumeFields, validateResumeFormat, createResume);

// Route to get all resumes for the logged-in user
router.get('/resume', userVerification, getResumes);

// Route to update a resume by ID
router.put('/resume/:id', userVerification, validateResumeFields, validateResumeFormat, checkResumeOwnership, updateResume);

// Route to delete a resume by ID
router.delete('/resume/:id', userVerification, checkResumeOwnership, deleteResume);

//Route to get a resume by ID
router.get('/resume/:id', userVerification, getResumeById);

module.exports = router;
