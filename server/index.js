const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Import Routes
const authRoute = require('./Routes/AuthRoute');
const resumeRoute = require('./Routes/resumeRoute');  // Include the resume routes
const AIResumeRoutes = require('./Routes/AIResumeRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.REACT_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware to parse cookies and JSON requests
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/', authRoute);  // Auth routes (signup, login)
app.use('/api', resumeRoute);  // Resume routes (CRUD operations for resumes)
app.use('/api/airesume', AIResumeRoutes);  // AI Resume related routes (if any)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
