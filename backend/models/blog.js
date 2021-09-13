const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: true, minLength: 2, maxLength: 150, unique: true },
    imagePath: { type: String, required: true },
    description: { type: String, required: true, minLength: 10, maxLength: 400, },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Blog", blogSchema);