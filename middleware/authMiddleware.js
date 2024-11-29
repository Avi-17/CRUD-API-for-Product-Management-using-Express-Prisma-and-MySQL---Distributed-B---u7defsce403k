const API_AUTH_KEY = require("./authkey");

const authMiddleware = async(req, res, next) => {
    const apikey = req.headers["apiauthkey"];

    if(!apikey) return res.status(401).json({"message": "Access denied, apiauthkey is missing"});

    if(apikey !== API_AUTH_KEY) return res.status(401).json({"message": "Failed to authenticate apiauthkey"})

    next();
}

module.exports = authMiddleware;