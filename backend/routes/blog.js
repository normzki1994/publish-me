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
        callback(null, "images/blogs/");
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

router.get("", async (req, res, next) => {
    let pageSize = req.query.pageSize ? +req.query.pageSize : 1;
    let currentPage = req.query.currentPage ? +req.query.currentPage : 1;
    let searchText = req.query.searchText;
    let searchParam = { title: { $regex: searchText, $options: "i" } };
    let lastPage = 1;

    var blogCount = await Blog.find(searchParam).count().exec();
    lastPage = Math.ceil(blogCount / pageSize)

    await Blog.find(searchParam)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ date: -1 })
        .then(blogs => {
            return res.status(200).send({ blogs: blogs, lastPage: lastPage });
        }).catch(error => {
            return res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
});

router.get("/:id", (req, res, next) => {
    var blogId = req.params.id;

    Blog.findById(blogId).then(blog => {
        return res.status(200).send(blog);
    }).catch(error => {
        return res.status(500).json({ message: "Something wen wrong", error: error });
    });
});

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    const blogId = req.params.id;
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }

    const blog = { title: req.body.title, description: req.body.description, date: req.body.date };
    const url = req.protocol + "://" + req.get("host");
    if(req.file) {
        blog.imagePath = url + "/images/blogs/" + req.file.filename
    }

    Blog.findByIdAndUpdate(blogId, { $set: blog }, { upsert: true, new: true }, function(error, docs) {
        if(error) {
            return res.status(500).json({ message: "Something went wrong", error: error });
        }
        return res.status(200).send(docs);
    })
});

router.delete("/:id", checkAuth, (req, res, next) => {
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }
    
    const blogId = req.params.id;

    Blog.deleteOne({ _id: blogId }).then(result => {
        return res.status(200).send(result);
    }).catch(error => {
        return res.status(500).json({ message: "Something went wrong", error: error });
    })
})

module.exports = router;