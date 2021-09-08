const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    try {
        const token = req.query.token;
        const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
        req.userData = {email: decodedToken.email, userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
        next();
    } catch(error) {
        res.status(401).json({ message: "Auth failed" });
    }
}