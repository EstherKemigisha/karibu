//defining our schema
const mongoose = require("mongoose");
const PassportLocalMongoose = require('passport-local-mongoose');
const signupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    }
});
signupSchema.plugin(PassportLocalMongoose, {
    usernameField: "email",
});
module.exports = mongoose.model("Signup", signupSchema);