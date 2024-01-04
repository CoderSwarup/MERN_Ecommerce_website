import dotenv from "dotenv";
dotenv.config();

const sendToken = (user, status, msg, res) => {
  const token = user.getJWTToken();
  const refreshtoken = user.generateRefreshToken();

  const accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // Access token expiration: 15 minutes
    httpOnly: true,
  };

  const refreshTokenOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh token expiration: 7 days
    httpOnly: true,
  };

  // Set access token and refresh token as separate cookies
  res
    .status(status)
    .cookie("token", token, accessTokenOptions)
    .cookie("refreshToken", refreshtoken, refreshTokenOptions)
    .send({
      success: true,
      message: msg,
      user,
    });
};

export default sendToken;
