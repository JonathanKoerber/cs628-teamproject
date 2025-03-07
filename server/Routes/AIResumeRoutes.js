const express = require('express');
const { uploadResume, upload } = require('../Controlers/AIResumeController');

const router = express.Router();

router.post('/enhance', upload.single('resume'), uploadResume);

module.exports = router;