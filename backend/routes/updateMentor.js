const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Mentor = require("../models/mentor_profile");
const { upload } = require('../middleware/upload');

// UPDATE single mentor profile
router.put("/:id", upload.single('profile_photo'), async (req, res) => {
  try {
    const userId = req.params.id;
    let updateData = { ...req.body };

    console.log("🔄 Updating mentor:", userId);
    console.log("📦 Update data:", updateData);

    // Handle file upload
    if (req.file) {
      updateData.profile_photo = req.file.filename;
      console.log("✅ Profile photo saved as:", req.file.filename);
    }

    // Update user data
    const userUpdateData = {
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      email: updateData.email
    };

    // Update mentor profile data - match your schema fields
    const mentorUpdateData = {
      job_title: updateData.jobTitle || "",
      company: updateData.company || "",
      location: updateData.location || "",
      category: updateData.category || "",
      skills: updateData.skills || "",
      bio: updateData.bio || "",
      linkedin_url: updateData.linkedinUrl || "",
      personal_website: updateData.personal_website || "",
      intro_video_url: updateData.intro_video_url || "",
      featured_article_url: updateData.featured_article_url || "",
      why_become_mentor: updateData.why_become_mentor || "",
      greatest_achievement: updateData.greatest_achievement || ""
    };

    // Only add profile_photo if a new file was uploaded
    if (req.file) {
      mentorUpdateData.profile_photo = updateData.profile_photo;
    }

    // Convert skills string to array if needed
    if (mentorUpdateData.skills && typeof mentorUpdateData.skills === 'string') {
      mentorUpdateData.skills = mentorUpdateData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    console.log("👤 User update data:", userUpdateData);
    console.log("🎯 Mentor update data:", mentorUpdateData);

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userUpdateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update mentor profile - using user_id field from your schema
    let updatedMentor = await Mentor.findOneAndUpdate(
      { user_id: userId },
      { $set: mentorUpdateData },
      { 
        new: true, 
        runValidators: true,
        upsert: true // Create if doesn't exist
      }
    );

    console.log("✅ User updated:", updatedUser.first_name);
    console.log("✅ Mentor profile updated:", updatedMentor ? "Yes" : "No");

    // Combine data for response
    const combinedData = {
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      role: updatedUser.role,
      // Mentor profile data
      job_title: updatedMentor.job_title,
      company: updatedMentor.company,
      location: updatedMentor.location,
      category: updatedMentor.category,
      skills: updatedMentor.skills,
      bio: updatedMentor.bio,
      linkedin_url: updatedMentor.linkedin_url,
      personal_website: updatedMentor.personal_website,
      profile_photo: updatedMentor.profile_photo,
      intro_video_url: updatedMentor.intro_video_url,
      featured_article_url: updatedMentor.featured_article_url,
      why_become_mentor: updatedMentor.why_become_mentor,
      greatest_achievement: updatedMentor.greatest_achievement
    };

    res.json({
      success: true,
      message: "Mentor profile updated successfully",
      data: combinedData
    });

  } catch (error) {
    console.error("❌ Error updating mentor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
});

module.exports = router;