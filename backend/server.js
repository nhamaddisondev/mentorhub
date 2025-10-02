const express = require('express');
const mongoose = require('./config/database'); 
const cors = require('cors');
const mentor = require('./routes/mentor_users');
const login = require('./routes/login');
const signup = require('./routes/signup');
const mentors = require('./routes/showMentors.js');
const menteeRoutes = require('./routes/updateMentee');
const path = require('path');

const updateMentorRoutes = require('./routes/updateMentor');  
const getMentorRoutes = require('./routes/getMentor');        

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', signup);  
app.use('/api', login);
app.use('/api', mentor);
app.use('/api', mentors);               
app.use('/api/mentees', menteeRoutes);

// NEW Mentor Profile Routes - Add these lines
app.use('/api/mentors', getMentorRoutes);    
app.use('/api/mentors', updateMentorRoutes); 

const PORT = process.env.PORT || 2999;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Mentor routes:`);
  console.log(`   GET  /api/mentors          - List all mentors`);
  console.log(`   GET  /api/mentors/:id      - Get single mentor profile`);
  console.log(`   PUT  /api/mentors/:id      - Update mentor profile`);
});