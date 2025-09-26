const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['mentee', 'mentor'], required: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
