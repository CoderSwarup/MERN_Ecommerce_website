const googlerouter = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
googlerouter.get("/login/success", (req, res) => {
  // if (!req.isAuthenticated()) {
  console.log(req);
  if (req.user) {
    // console.log("ssjs");
    res.status(200).send({
      success: true,
      message: "success",
      user: req.user,
    });
  }
  z;
  // }
  res.send("Error");
});
googlerouter.get("/login/failed", (req, res) => {
  return res.status(400).send({
    message: "Login Failed",
  });
});

googlerouter.get("/google/callback", (req, res) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login/failed",
      successRedirect: process.env.CLIENT_URL,
    },
    (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: false,
          message: "Google Login Failed",
        });
      }
      if (user) {
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
          .status(200)
          .cookie("token", token, accessTokenOptions)
          .cookie("refreshToken", refreshtoken, refreshTokenOptions)
          .redirect(`${process.env.CLIENT_URL}account`);
      }
    }
  )(req, res);
});

googlerouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = googlerouter;
