const express = require("express");
const multer = require("multer");

const router = express.Router();

const Message = require("../models/message");

const checkAuth = require("../middleware/check-auth");

router.post("", (req, res, next) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    message.save().then(message => {
        return res.status(201).send(message);
    }, error => {
        return res.status(500).json({ message: "Something went wrong", error: error });
    })
});

module.exports = router;