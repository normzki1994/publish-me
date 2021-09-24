const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 150 },
    email: { type: String, required: true, unique: true, maxLength: 150 },
    password: { type: String, required: true, minLength: 6, maxLength: 150 },
    isAdmin: { type: Boolean, required: true },
    imagePath: { type: String }
});

module.exports = mongoose.model("User", userSchema);