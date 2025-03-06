const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, username});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            sameSite: "strict",
            httpOnly: true,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user:{'username': username,
                                                                                  'email': email}});
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ){
            return res.json({message:'All fields are required', success: false})
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.json({message:'Incorrect password or email', success: false })
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
            return res.json({message:'Incorrect password or email', success: false})
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res.status(200).json({ message: "User logged in successfully", success: true, user:{'username': user.username,
                                                                                        'email': user.email, }});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error, please try again later"})
    }
}