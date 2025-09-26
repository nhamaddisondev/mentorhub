// In your routes file (signup.js or mentors.js)
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Mentor = require("../models/mentor_profile");

// Get all mentors with their profiles
router.get("/mentors", async (req, res) => {
  try {
    console.log("📡 Fetching mentors with profiles...");
    
    // Method 1: Simple approach - get users and their mentor profiles separately
    const mentorUsers = await User.find({ role: "mentor" })
      .select("first_name last_name email role createdAt")
      .sort({ createdAt: -1 });

    // Get mentor profiles for these users
    const mentorProfiles = await Mentor.find({ 
      user_id: { $in: mentorUsers.map(user => user._id) } 
    });

    // Combine the data
    const mentorsWithProfiles = mentorUsers.map(user => {
      const profile = mentorProfiles.find(prof => prof.user_id.toString() === user._id.toString());
      return {
        ...user.toObject(), // Convert mongoose document to plain object
        job_title: profile?.job_title || "",
        company: profile?.company || "",
        location: profile?.location || "",
        bio: profile?.bio || "",
        skills: profile?.skills || "",
        linkedin_url: profile?.linkedin_url || ""
      };
    });

    res.status(200).json({
      success: true,
      count: mentorsWithProfiles.length,
      mentors: mentorsWithProfiles
    });

  } catch (error) {
    console.error("❌ Error fetching mentors:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching mentors",
      error: error.message 
    });
  }
});

module.exports = router;