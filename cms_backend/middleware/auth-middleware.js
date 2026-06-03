const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized http, Token not provided" });
    }
    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = isVerified; // <--- important
        next();
    } catch (error) {
         return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }

}

module.exports = authMiddleware;