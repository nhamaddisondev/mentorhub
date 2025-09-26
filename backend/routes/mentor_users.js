const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Mentor = require("../models/mentor_profile"); 
const Joi = require("joi");

// validation with Joi
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


router.post("/mentor-signup", async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const {
      first_name, last_name, email, password, role, job_title, company, location,
      category, skills, bio, linkedin_url, personal_website, 
      intro_video_url, featured_article_url, why_become_mentor, greatest_achievement,
    } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Create user in Users collection (authentication data)
    const newUser = new User({
      first_name, last_name, email, password: hashedPassword, role
    });

    await newUser.save();

    // 2. Create mentor profile in Mentor collection (mentor-specific data)
    const newMentor = new Mentor({
      user_id: newUser._id, // Reference to the user
      job_title, company, location, category, skills, bio, linkedin_url, personal_website,
      intro_video_url, featured_article_url, why_become_mentor, greatest_achievement
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
      }
    });
  } catch (error) {
    console.error("Error creating mentor user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/debug-users', async (req, res) => {
    try {
        const indexes = await mongoose.connection.collection('users').getIndexes();
        const nullUsers = await User.find({ 
            $or: [{ userName: null }, { userName: { $exists: false } }] 
        });
        
        res.json({
            indexes,
            documentsWithNullUserName: nullUsers.length,
            sampleNullUsers: nullUsers.slice(0, 3)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;