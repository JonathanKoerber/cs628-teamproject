const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute")
const AIResumeRoutes = require("./Routes/AIResumeRoutes");


dotenv.config();

const app = express();

// cors middleware
app.use(cors({
  // origin:  process.env.REACT_FRONTEND,
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute)
app.use("/api/airesume", AIResumeRoutes);
