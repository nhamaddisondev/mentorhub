const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Input validation
    if (!first_name || !last_name || !email || !password || !role) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }


    // Check if user already exists
    console.log("Checking if user exists for email:", email);
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists with this email" });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role.toLowerCase()
    });

    console.log("Saving new user...");
    await newUser.save();
    console.log("User created successfully:", newUser.email);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      console.log("Duplicate key error:", error.keyValue);
      if (error.keyValue.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(400).json({ message: "Duplicate key error" });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;