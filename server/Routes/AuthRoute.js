const express = require("express");
const { Signup, Login} = require("../Controlers/AuthControllers");
const { addResume, getResumes, updateResume, deleteResume} = require("../Controlers/ResumeControllers");
const {userVerification} = require("../Middleware/AuthMiddleware");
const router = express.Router();

// Authorization Routes
router.post("/", userVerification)
router.post("/signup", Signup)
router.post("/login", Login)

// Resume Routes
router.get("/resume", userVerification, getResumes)
router.post("/resume", userVerification, addResume)
router.put("/resume/:id", userVerification, updateResume)
router.delete("/resume/:id", userVerification, deleteResume)


module.exports = router