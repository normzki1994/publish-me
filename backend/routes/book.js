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

router.get("", async (req, res, next) => {
    let pageSize = req.query.pageSize ? +req.query.pageSize : 1;
    let currentPage = req.query.currentPage ? +req.query.currentPage : 1;
    let searchText = req.query.searchText;
    let searchParam = { title: { $regex: searchText, $options: "i" } };
    let lastPage = 1;

    var bookCount = await Book.find(searchParam).count().exec();
    lastPage = Math.ceil(bookCount / pageSize)

    await Book.find(searchParam)
        .populate("author")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ title: 1 })
        .then(books => {
            books = books;
            return res.status(200).send({ books: books, lastPage: lastPage });
        }).catch(error => {
            return res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
});

router.get("/:id", (req, res, next) => {
    const bookId = req.params.id;

    Book.findById(bookId).then(book => {
        return res.status(200).send(book);
    }, error => {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
});

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    const bookId = req.params.id;
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }

    const book = { title: req.body.title, author: req.body.author, price: req.body.price, genre: req.body.genre,
        datePublished: req.body.datePublished };
        
    const url = req.protocol + "://" + req.get("host");
    if(req.file) {
        book.imagePath = url + "/images/books/" + req.file.filename
    }

    Book.findByIdAndUpdate(bookId, { $set: book }, { upsert: true, new: true }, function(error, docs) {
        if(error) {
            return res.status(500).json({ message: "Something went wrong", error: error });
        }
        return res.status(200).send(docs);
    });
})

module.exports = router;