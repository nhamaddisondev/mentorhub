const mongoose = require("mongoose");

const menteeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: { 
    type: String,
    trim: true
  },
  location: { 
    type: String,
    trim: true
  },
  jobTitle: { 
    type: String,
    trim: true
  },
  linkedinUrl: { 
    type: String,
    trim: true
  },
  education: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  careerInterests: {
    type: String,
    trim: true
  },
  goal: { 
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  profile_photo: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Add index for better query performance
menteeSchema.index({ user: 1 });

const MenteeProfile = mongoose.model("MenteeProfile", menteeSchema);
module.exports = MenteeProfile;