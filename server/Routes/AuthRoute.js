const express = require("express");
const { Signup, Login} = require("../Controlers/AuthControllers");
const {userVerification} = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/", userVerification)

module.exports = router