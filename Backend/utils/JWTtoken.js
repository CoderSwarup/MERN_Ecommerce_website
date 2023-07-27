const dotenv = require("dotenv");
dotenv.config();

const sendToken = (user, status, msg, res) => {
  const token = user.getJWTToken();

  //option for cookie
  const options = {
    expires: process.env.COOKIE_EXPRIE, // new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 3 days;  new Date(Date.now() + 10 * 60 * 1000)// 10 minutes
    httpOnly: true,
  };
  res.status(status).cookie("token", token).send({
    success: true,
    message: msg,
    user,
    // token,
    // options,
  });
};

module.exports = sendToken;
