const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if(!result) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id, isAdmin: fetchedUser.isAdmin }, 
            config.get("jwtPrivateKey"), { expiresIn: "1h" });
        
        return res.status(200).json({ token: token, expiresIn: 3600, email: fetchedUser.email, name: fetchedUser.name,
         userId: fetchedUser._id, isAdmin: fetchedUser.isAdmin });
         
    }).catch(error => {
        return res.status(401).json({ message: "Authentication failed", error: error });
    });
});

module.exports = router;