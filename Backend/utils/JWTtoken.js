const dotenv = require("dotenv");
dotenv.config();

const sendToken = (user, status, msg, res) => {
  const token = user.getJWTToken();

  //option for cookie
  const options = {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
  };
  res.status(status).cookie("token", token, options).send({
    success: true,
    message: msg,
    token,
    options,
  });
};

module.exports = sendToken;
