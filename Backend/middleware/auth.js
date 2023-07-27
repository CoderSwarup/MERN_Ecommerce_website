const usersModel = require("../Model/users.model");
const ErrorHandler = require("../utils/ErrorHandler");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ThrowError } = require("../utils/ErrorHelper");

dotenv.config();

exports.isAuthicatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token || token == undefined) {
      throw ErrorHandler.customError(
        "Please Login to access This resources",
        401
      );
    }

    const decodeTokenData = JWT.verify(token, process.env.JWT_SECRET);
    if (!decodeTokenData) {
      console.log("ddddd");
    }
    req.user = await usersModel.findById(decodeTokenData._id);
    next();
  } catch (error) {
    if (error instanceof JWT.TokenExpiredError) {
      return res.status(404).send({
        success: false,
        message: "Token Expire Please Login",
      });
    } else {
      ThrowError(error, res, "Authetication Time");
    }

    // console.log("ERRR");
  }
};

//Check the user is admin or not
exports.isAdmin = async (req, res, next) => {
  try {
    const getuser = req.user;
    if (getuser.role !== "admin") {
      throw ErrorHandler.customError(
        "Sorry But Your Not Authorised user for This Operation",
        400
      );
    }
    next();
  } catch (error) {
    ThrowError(error, res, "ists the role");
  }
};
