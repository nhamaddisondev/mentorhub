const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Mentor = require("../models/mentor_profile"); 
const Joi = require("joi");

// CORRECT IMPORT - make sure the path is correct
const { upload, handleMulterError } = require('../middleware/upload');

// validation schema
const createUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("mentee", "mentor").required(),
  job_title: Joi.string().max(50).required(),
  company: Joi.string().max(50).allow('').optional(),
  location: Joi.string().max(100).required(),
  category: Joi.string().max(50).required(),
  skills: Joi.string().max(200).required(),
  bio: Joi.string().max(500).required(),
  linkedin_url: Joi.string().uri().required(),
  personal_website: Joi.string().uri().allow('').optional(),
  intro_video_url: Joi.string().uri().allow('').optional(),
  featured_article_url: Joi.string().uri().allow('').optional(),
  why_become_mentor: Joi.string().max(1000).allow('').optional(),
  greatest_achievement: Joi.string().max(1000).allow('').optional(),
});

router.post("/mentor-signup", 
  upload.single('photo'),  
  (req, res, next) => {
    // Simple error handling middleware
    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        message: req.fileValidationError
      });
    }
    next();
  },
  async (req, res) => {
    try {
      // Check if mentorData exists in the form data
      if (!req.body.mentorData) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing mentor data" 
        });
      }

      // Parse the JSON data from FormData
      let mentorData;
      try {
        mentorData = JSON.parse(req.body.mentorData);
      } catch (parseError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid JSON data in mentorData" 
        });
      }

      // Validate the parsed data
      const { error, value } = createUserSchema.validate(mentorData);
      if (error) {
        return res.status(400).json({ 
          success: false, 
          message: error.details[0].message 
        });
      }

      const {
        first_name, last_name, email, password, role, job_title, company, location,
        category, skills, bio, linkedin_url, personal_website, 
        intro_video_url, featured_article_url, why_become_mentor, greatest_achievement,
      } = value;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "User already exists" 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle photo file - get filename if uploaded
      const profile_photo = req.file ? req.file.filename : null;

      // 1. Create user in Users collection
      const newUser = new User({
        first_name, 
        last_name, 
        email, 
        password: hashedPassword, 
        role
      });

      await newUser.save();

      // 2. Create mentor profile in Mentor collection
      const newMentor = new Mentor({
        user_id: newUser._id, 
        job_title, 
        company, 
        location, 
        category, 
        skills, 
        bio, 
        linkedin_url, 
        personal_website,
        intro_video_url, 
        featured_article_url, 
        why_become_mentor, 
        greatest_achievement,
        profile_photo 
      });

      await newMentor.save();
      
      res.status(201).json({
        success: true,
        message: "Mentor user created successfully",
        user: {
          id: newUser._id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        },
        mentor_profile: {
          job_title: newMentor.job_title,
          company: newMentor.company,
          category: newMentor.category,
          has_photo: !!profile_photo
        }
      });
      
    } catch (error) {
      console.error("Error creating mentor user:", error);
      
      // Handle multer errors
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          success: false, 
          message: "File too large. Maximum size is 5MB." 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
);

module.exports = router;