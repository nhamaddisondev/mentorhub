const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Mentor = require("../models/mentor_profile");

// Get all mentors with their profiles
router.get("/mentors", async (req, res) => {
  try {
    console.log("📡 Fetching mentors with profiles...");
    
    // Get all users with mentor role
    const mentorUsers = await User.find({ role: "mentor" })
      .select("first_name last_name email role createdAt")
      .sort({ createdAt: -1 });

    // Get mentor profiles for these users
    const mentorProfiles = await Mentor.find({ 
      user_id: { $in: mentorUsers.map(user => user._id) } 
    });

    // Combine the data with profile photo
    const mentorsWithProfiles = mentorUsers.map(user => {
      const profile = mentorProfiles.find(prof => prof.user_id.toString() === user._id.toString());
      return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        created_at: user.createdAt,
        // Mentor profile data
        job_title: profile?.job_title || "",
        company: profile?.company || "",
        location: profile?.location || "",
        category: profile?.category || "",
        bio: profile?.bio || "",
        skills: profile?.skills || "",
        linkedin_url: profile?.linkedin_url || "",
        personal_website: profile?.personal_website || "",
        profile_photo: profile?.profile_photo || "", 
        intro_video_url: profile?.intro_video_url || "",
        featured_article_url: profile?.featured_article_url || "",
        why_become_mentor: profile?.why_become_mentor || "",
        greatest_achievement: profile?.greatest_achievement || ""
      };
    });

    console.log(`✅ Found ${mentorsWithProfiles.length} mentors`);
    
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