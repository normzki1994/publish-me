const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: { type: String, required: true, minLength: 2, maxLength: 150, unique: true },
    imagePath: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    price: { type: Number, required: true, min: 10, max: 500 },
    genre: { type: String, required: true },
    datePublished: { type: Date, required: true }
});

module.exports = mongoose.model("Book", bookSchema);