const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
    profile_photo: { type: String, require: true},
    company: { type: String, default: '' },
    job_title: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: [String], required: true },
    bio: { type: String, minlength: 10, required: true },
    linkedin_url: { 
      type: String, 
      required: true,
      match: [
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/,
      "Please enter a valid LinkedIn URL"
    ]},
    personal_website: { 
      type: String, 
      match: [
         /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
        "Please enter a valid website URL (e.g., example.com or https://example.com)"
      ],
      default: '' },
    intro_video_url: { type: String, default: '' },
    featured_article_url: { type: String, default: '' },
    why_become_mentor: { type: String, default: '' },
    greatest_achievement: { type: String, default: '' },
    application_status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('MentorProfile', mentorSchema);