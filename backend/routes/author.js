const express = require("express");
const multer = require("multer");

const router = express.Router();

const Author = require("../models/author");

const checkAuth = require("../middleware/check-auth");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/authors/")
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
    const author = new Author({
        name: req.body.name,
        imagePath: url + "/images/authors/" + req.file.filename,
        description: req.body.description
    });

    author.save().then(author => {
        return res.status(201).json({
            message: "Author added succesfully", 
            post: author
        });
    }).catch(error => {
        return res.status(500).json({ message: "Something went wrong", error: error });
    });
});

router.get("/", async (req, res, next) => {
    let pageSize = req.query.pageSize ? +req.query.pageSize : 1;
    let currentPage = req.query.currentPage ? +req.query.currentPage : 1;
    let searchText = req.query.searchText;
    let searchParam = { name: { $regex: searchText, $options: "i" } };
    let lastPage = 1;

    var authorsCount = await Author.find(searchParam).count().exec();
    lastPage = Math.ceil(authorsCount / pageSize)

    await Author.find(searchParam)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ name: 1 })
        .then(authors => {
            authors = authors;
            return res.status(200).send({ authors: authors, lastPage: lastPage });
        }).catch(error => {
            return res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
});

module.exports = router;