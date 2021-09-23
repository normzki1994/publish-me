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

router.get("", checkAuth, async (req, res, next) => {
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }
    
    let pageSize = req.query.pageSize ? +req.query.pageSize : 1;
    let currentPage = req.query.currentPage ? +req.query.currentPage : 1;
    let searchText = req.query.searchText;
    let searchParam = { subject: { $regex: searchText, $options: "i" } };
    let lastPage = 1;

    var messageCount = await Message.find(searchParam).count().exec();
    lastPage = Math.ceil(messageCount / pageSize)

    await Message.find(searchParam)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ date: -1 })
        .then(messages => {
            return res.status(200).send({ messages: messages, lastPage: lastPage });
        }).catch(error => {
            return res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
});

router.get("/:id", (req, res, next) => {
    var messageId = req.params.id;

    Message.findById(messageId).then(message => {
        return res.status(200).send(message);
    }).catch(error => {
        return res.status(500).json({ message: "Something wen wrong", error: error });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    if(!req.userData.isAdmin) {
        return res.status(401).json({ message: "Not admin. User not authorized" });
    }
    
    const messageId = req.params.id;

    Message.deleteOne({ _id: messageId }).then(result => {
        return res.status(200).send(result);
    }).catch(error => {
        return res.status(500).json({ message: "Something went wrong", error: error });
    })
});

module.exports = router;