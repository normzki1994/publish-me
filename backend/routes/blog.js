const express = require("express");
const multer = require("multer");

const router = express.Router();

const Blog = require("../models/blog");

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
    const blog = new Blog({
        title: req.body.title,
        imagePath: url + "/images/blogs/" + req.file.filename,
        description: req.body.description,
        date: req.body.date,
        user: req.userData.userId // See check-auth.js in middleware folder
    });

    blog.save().then(book => {
        return res.status(201).json({
            message: "Blog added succesfully", 
            book: book
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error });
    });
});

module.exports = router;