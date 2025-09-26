const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
    job_title: { type: String, required: true },
    company: { type: String, default: '' },
    location: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: String, required: true },
    bio: { type: String, minlength: 10, required: true },
    linkedin_url: { 
      type: String, 
      required: true,
      match: [
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/,
      'Please enter a valid LinkedIn URL'
    ]},
    personal_website: { type: String, default: '' },
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