const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Mentor = require("../models/mentor_profile"); 
const MenteeProfile = require("../models/mentee_profile"); 
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

router.post("/login", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ✅ FETCH PROFILE DATA BASED ON ROLE
    let profileData = {};
    
    if (user.role === "mentor") {
      const mentorProfile = await Mentor.findOne({ user_id: user._id });
      profileData = {
        profile_photo: mentorProfile?.profile_photo || "",
      };
    } else if (user.role === "mentee") {
      const menteeProfile = await MenteeProfile.findOne({ user: user._id });
      profileData = {
        profile_photo: menteeProfile?.profile_photo || "",
        phone: menteeProfile?.phone || "",
        location: menteeProfile?.location || "",
        jobTitle: menteeProfile?.jobTitle || "",
        linkedinUrl: menteeProfile?.linkedinUrl || "",
        education: menteeProfile?.education || "",
        skills: menteeProfile?.skills || [],
        careerInterests: menteeProfile?.careerInterests || "",
        goal: menteeProfile?.goal || "",
        bio: menteeProfile?.bio || "",
      };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { 
        id: user._id, 
        _id: user._id,
        email: user.email, 
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        // ✅ Include all profile fields
        ...profileData
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;