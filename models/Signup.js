// Defining our schema
const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true, // Ensure fullName is required
  },
  email: {
    type: String,
    trim: true,
    unique: true, // Email must be unique
    required: true, // Ensure email is required
  },
  branch: {
    type: String,
    trim: true,
    required: true, // Ensure branch is required
  },
  role: {
    type: String,
    trim: true,
    required: true, // Ensure role is required
  },
});

// Configure passport-local-mongoose to use email as the username field
signupSchema.plugin(PassportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("Signup", signupSchema);