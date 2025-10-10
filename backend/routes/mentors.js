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
      user_id: { $in: mentorUsers.map((user) => user._id) },
    });

    // Combine the data
    const mentorsWithProfiles = mentorUsers.map((user) => {
      const profile = mentorProfiles.find(
        (prof) => prof.user_id.toString() === user._id.toString()
      );
      return {
        ...user.toObject(), // Convert mongoose document to plain object
        job_title: profile?.job_title || "",
        company: profile?.company || "",
        location: profile?.location || "",
        bio: profile?.bio || "",
        skills: profile?.skills || "",
        linkedin_url: profile?.linkedin_url || "",
      };
    });

    res.status(200).json({
      success: true,
      count: mentorsWithProfiles.length,
      mentors: mentorsWithProfiles,
    });
  } catch (error) {
    console.error("❌ Error fetching mentors:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mentors",
      error: error.message,
    });
  }
});

// Get a single mentor by user_id
router.get("/mentors/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user (mentor)
    const user = await User.findById(userId).select(
      "first_name last_name email role createdAt"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found" });
    }

    // Find the mentor profile
    const profile = await Mentor.findOne({ user_id: userId });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor profile not found" });
    }

    // Ensure skills is a string

    let skillsString = profile.skills;
    if (Array.isArray(profile.skills)) {
      skillsString = profile.skills.join(", "); 
    }

    console.log("Mentor profile from DB:", profile);
    console.log("Skills field:", skillsString);

    // Combine user info + mentor profile
    const mentorData = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      job_title: profile.job_title,
      company: profile.company,
      location: profile.location,
      category: profile.category,
      skills: skillsString,
      bio: profile.bio,
      linkedin_url: profile.linkedin_url,
      personal_website: profile.personal_website,
      intro_video_url: profile.intro_video_url,
      featured_article_url: profile.featured_article_url,
      why_become_mentor: profile.why_become_mentor,
      greatest_achievement: profile.greatest_achievement,
      application_status: profile.application_status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };

    res.status(200).json({
      success: true,
      mentor: mentorData,
    });
  } catch (error) {
    console.error("❌ Error fetching mentor profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching mentor profile",
      error: error.message,
    });
  }
});

module.exports = router;
