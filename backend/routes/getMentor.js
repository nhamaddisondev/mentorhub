const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Mentor = require("../models/mentor_profile");

// GET single mentor profile
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    
    console.log("📥 Fetching mentor profile for:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let mentorProfile = await Mentor.findOne({ user_id: userId });
    if (!mentorProfile) {
      // Create empty profile if doesn't exist
      console.log("📝 Creating new mentor profile for user:", userId);
      mentorProfile = new Mentor({ user_id: userId });
      await mentorProfile.save();
    }

    // Combine user and mentor data
    const combinedData = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      // Mentor profile data
      job_title: mentorProfile.job_title || "",
      company: mentorProfile.company || "",
      location: mentorProfile.location || "",
      category: mentorProfile.category || "",
      skills: mentorProfile.skills || [],
      bio: mentorProfile.bio || "",
      linkedin_url: mentorProfile.linkedin_url || "",
      personal_website: mentorProfile.personal_website || "",
      profile_photo: mentorProfile.profile_photo || "",
      intro_video_url: mentorProfile.intro_video_url || "",
      featured_article_url: mentorProfile.featured_article_url || "",
      why_become_mentor: mentorProfile.why_become_mentor || "",
      greatest_achievement: mentorProfile.greatest_achievement || ""
    };

    console.log("✅ Mentor data fetched successfully");

    res.json({
      success: true,
      data: combinedData
    });

  } catch (error) {
    console.error("❌ Error fetching mentor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
});

module.exports = router;