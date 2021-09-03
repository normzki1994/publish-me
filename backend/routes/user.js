const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: false
        });

        user.save().then(result => {
            res.status(200).json({
                message: "User created",
                result: result
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
});

module.exports = router;