var User = require("../model/User");
const { verifyToken } = require("../utils/token");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    console.log(token);
    if (user instanceof User) {
      next();
    } else {
      console.log("Token Verification failed");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  AuthMiddleware,
};
