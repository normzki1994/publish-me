const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: { type: String, required: true, maxLength: 150 },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Comment", commentSchema);