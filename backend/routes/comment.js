const express = require("express");
const multer = require("multer");

const router = express.Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
    const comment = new Comment({
        content: req.body.content,
        user: req.userData.userId
    });

    comment.save().then(comment => {
        const blogId = req.body.blogId;
        Blog.findById(blogId, function(error, blog) {
            blog.comments.push(comment);
            blog.save().then(blog => {
                res.status(200).send(blog);
            }, error => {
                return res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            })
        })
    }).catch(error => {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
});

module.exports = router;