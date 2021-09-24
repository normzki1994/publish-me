const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer")

const router = express.Router();

const User = require("../models/user");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/users/");
    },
    filename: (req, file, callback) => {
        const ext = MIME_TYPE[file.mimetype];
        callback(null, Date.now() + "-" + file.originalname)
    }
})

router.post("/signup", multer({ storage: storage }).single("image"), (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        var userData = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: false
        };

        const url = req.protocol + "://" + req.get("host");
        if(req.file) {
            userData.imagePath = url + "/images/users/" + req.file.filename
        }

        const user = new User(userData);

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
         userId: fetchedUser._id, isAdmin: fetchedUser.isAdmin, imagePath: fetchedUser.imagePath });
         
    }).catch(error => {
        return res.status(401).json({ message: "Authentication failed", error: error });
    });
});

module.exports = router;