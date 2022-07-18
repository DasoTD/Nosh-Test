const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.json(
        `Authorization token is invalid`
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.json(
        `Authorization token is missing`
      );
    }

    const decoded =  jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id)

    if (!user || (user && user.accessToken !== token)) {
      return res.json(
        `Failed to authenticate user`
      );
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json(
      error.message
    );
  }
};
