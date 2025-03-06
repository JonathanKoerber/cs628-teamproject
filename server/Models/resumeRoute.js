const express = require('express');
const router = express.Router();
const { createResume, getResumes, updateResume, deleteResume } = require('../controllers/resumeController');
const { userVerification } = require('../middleware/AuthMiddleware');
const { validateResumeFields, checkResumeOwnership, validateResumeFormat } = require('../middleware/resumeMiddleware');

// Route to create a new resume
router.post('/resume', userVerification, validateResumeFields, validateResumeFormat, createResume);

// Route to get all resumes for the logged-in user
router.get('/resume', userVerification, getResumes);

// Route to update a resume by ID
router.put('/resume/:id', userVerification, validateResumeFields, validateResumeFormat, checkResumeOwnership, updateResume);

// Route to delete a resume by ID
router.delete('/resume/:id', userVerification, checkResumeOwnership, deleteResume);

module.exports = router;
