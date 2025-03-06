const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
    console.log("User verification middleware")
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ status: false, message: "No token provided, unauthorized." });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id);
        if (user) {
            req.user = user;  // Attach user to request object
            return next();    // Proceed to next middleware or route handler
        } else {
            return res.status(404).json({ status: false, message: "User not found." });
        }
    } catch (err) {
        // If token is invalid or expired
        return res.status(401).json({ status: false, message: "Invalid or expired token." });
    }
};