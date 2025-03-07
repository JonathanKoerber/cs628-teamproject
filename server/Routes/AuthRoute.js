const express = require("express");
const { GetUserInfo, Signup, Login} = require("../Controlers/AuthControllers");
const { addResume, getResumes, getResumeById, updateResume, deleteResume} = require("../Controlers/ResumeControllers");
const {userVerification} = require("../Middleware/AuthMiddleware");
const router = express.Router();

// Authorization Routes
router.get("/", userVerification, GetUserInfo)
router.post("/signup", Signup)
router.post("/login", Login)

// Resume Routes
router.get("/resume", userVerification, getResumes)
router.get("/resume/:id", userVerification, getResumeById)
router.post("/resume", userVerification, addResume)
router.put("/resume/:id", userVerification, updateResume)
router.delete("/resume/:id", userVerification, deleteResume)


module.exports = router