//defining our schema
const mongoose = require("mongoose");
const PassportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        unique: true
    },
    lname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    }
});
userSchema.plugin(PassportLocalMongoose, {
    usernameField: "email",
});
module.exports = mongoose.model("User",userSchema);