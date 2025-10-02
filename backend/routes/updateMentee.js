const express = require("express");
const router = express.Router();
const User = require("../models/users");
const MenteeProfile = require("../models/mentee_profile"); 
const { upload } = require('../middleware/upload');

router.put("/:id", upload.single('profile_photo'), async (req, res) => {
  try {
    const userId = req.params.id;
    let updateData = { ...req.body };

    // Handle file upload 
    if (req.file) {
      updateData.profile_photo = req.file.filename;
      console.log("Profile photo saved as:", req.file.filename);
    }
    // If no new file, DO NOT include profile_photo in updateData at all
    // This preserves the existing photo

    // Validate update data
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No data provided for update" 
      });
    }

    // Separate user data and mentee profile data
    const userUpdateData = {
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      email: updateData.email
    };

    // Update Data for Mentee Profile - only include profile_photo if it exists
    const menteeUpdateData = {
      phone: updateData.phone || "",
      location: updateData.location || "",
      jobTitle: updateData.jobTitle || "",
      linkedinUrl: updateData.linkedinUrl || "",
      education: updateData.education || "",
      skills: updateData.skills || "", 
      careerInterests: updateData.careerInterests || "",
      goal: updateData.goal || "",
      bio: updateData.bio || ""
    };

    // Only add profile_photo to menteeUpdateData if a new file was uploaded
    if (req.file) {
      menteeUpdateData.profile_photo = updateData.profile_photo;
    }

    // Convert skills string to array if needed
    if (menteeUpdateData.skills && typeof menteeUpdateData.skills === 'string') {
      menteeUpdateData.skills = menteeUpdateData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    // Update user in Users collection
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

    // Update or create mentee profile
    let updatedMentee = await MenteeProfile.findOneAndUpdate(
      { user: userId },
      { $set: menteeUpdateData },
      { 
        new: true, 
        runValidators: true,
        upsert: true
      }
    );

    // Combine both updates for response
    const combinedData = {
      ...updatedUser.toObject(),
      ...updatedMentee.toObject() 
    };

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: combinedData
    });

  } catch (error) {
    console.error("Error updating mentee:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

module.exports = router;