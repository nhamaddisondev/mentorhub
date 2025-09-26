const mongoose = require("mongoose");
// const connectDB = require('../config/database.js');

const menteeSchema = mongoose.Schema({
    location: { type: String },
    Job_title: { type: String },
    linkedin_url: { type: String },
    goal: { type: String },
});
const MenteeProfile = mongoose.model("MenteeProfile", menteeSchema);