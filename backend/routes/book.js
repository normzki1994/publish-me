const express = require("express");
const multer = require("multer");

const router = express.Router();

const Book = require("../models/book");

const checkAuth = require("../middleware/check-auth");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/books/");
    },
    filename: (req, file, callback) => {
        const ext = MIME_TYPE[file.mimetype];
        callback(null, Date.now() + "-" + file.originalname)
    }
})
// const upload = multer({dest: "images/posts/"});
// const upload = multer({storage: storage});

router.post("", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }

    const url = req.protocol + "://" + req.get("host");
    const book = new Book({
        title: req.body.title,
        imagePath: url + "/images/books/" + req.file.filename,
        author: req.body.author,
        price: req.body.price,
        genre: req.body.genre,
        datePublished: req.body.datePublished
    });

    book.save().then(book => {
        return res.status(201).json({
            message: "Book added succesfully", 
            book: book
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error });
    });
});

module.exports = router;