const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Resume Schema with validation
const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  skills: { type: String, required: true },
  education: String,
  projects: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

// User Schema for authentication
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token expired or invalid' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization token is required' });
  }
};
// ****************************************************<> User Longin <>******************************************************************
// POST: Register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// POST: User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});
// *******************************************<>Resume<>*******************************************************************
// POST: Save Resume
app.post('/api/resume', authenticateJWT, async (req, res) => {
  const { name, email, phone, skills, education, projects } = req.body;

  if (!name || !email || !skills) {
    return res.status(400).json({ message: 'Name, email, and skills are required' });
  }

  const newResume = new Resume({
    name,
    email,
    phone,
    skills,
    education,
    projects,
  });

  try {
    await newResume.save();
    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving resume', error });
  }
});

// GET: Fetch all resumes for logged-in user
app.get('/api/resume', authenticateJWT, async (req, res) => {
  try {
    const resumes = await Resume.find({ email: req.user.email });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
});

// PUT: Update a resume
app.put('/api/resume/:id', authenticateJWT, async (req, res) => {
  const { name, email, phone, skills, education, projects } = req.body;

  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phone,
      skills,
      education,
      projects,
    }, { new: true });

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
});

// DELETE: Delete a resume
app.delete('/api/resume/:id', authenticateJWT, async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
});

// *****************************************************<> AI GEN <> ****************************************************************

// *******************************************************<> <>*****************************************************************
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
