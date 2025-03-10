const express = require('express');
const { uploadResume, upload, refineResume } = require('../Controlers/AIResumeController');

const router = express.Router();

router.post('/enhance', upload.single('resume'), uploadResume);
router.post('/refine', refineResume);

module.exports = router;