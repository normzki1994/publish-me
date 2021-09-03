const express = require("express");
const mongoose = require("mongoose");
const config = require("config")

const path = require("path");

const app = express();

mongoose.connect(config.get("dbConfig.connectionString"),
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Database connection failed");
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    console.log("Header set")
    next();
});

module.exports = app;