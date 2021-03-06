const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");
const cors = require("cors")

const path = require("path");

const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");
const blogRoutes = require("./routes/blog");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");

const app = express();

mongoose.connect(config.get("dbConfig.connectionString"),
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Database connection failed");
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentRoutes);

// For creating admin user
// const userModel = require("./models/user");
// var password = "yourpassword";

// console.log(userModel);
// bcrypt.hash(password, 10).then(hash => {
//     const user = new userModel({
//         name: "yourname",
//         email: "youremail",
//         password: hash,
//         isAdmin: true
//     });

//     user.save().then(result => {
//         console.log(result);
//     }).catch(error => {
//         console.log(error);
//     });
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
});