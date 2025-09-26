const express = require('express');
const mongoose = require('./config/database'); 
const cors = require('cors');
const mentor = require('./routes/mentor_users');
const login = require('./routes/login');
const signup = require('./routes/signup');
const mentors = require('./routes/mentors');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());

// ✅ CORRECTED ROUTE MOUNTING
app.use('/api', signup);  
app.use('/api', login);
app.use('/api', mentor);
app.use('/api', mentors);


const PORT = process.env.PORT || 2999;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});