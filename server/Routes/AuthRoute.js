const express = require("express");
const { Signup } = require("../Controlers/AuthControllers");
const router = express.Router();
console.log(" AuthRoute.js is loaded")
router.use((req, res, next) => {
    console.log(`Route accessed: ${req.originalUrl}`);
    next();
});
router.post("/signup", Signup)

module.exports = router