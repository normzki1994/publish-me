const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 150, unique: true },
    imagePath: { type: String, required: true },
    description: { type: String, required: true, minLength: 10, maxLength: 150 }
});

module.exports = mongoose.model("Author", authorSchema);