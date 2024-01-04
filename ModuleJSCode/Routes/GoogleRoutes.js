import express from "express";
import passport from "passport";
import dotenv from "dotenv";

const googlerouter = express.Router();
dotenv.config();

googlerouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).send({
      success: true,
      message: "success",
      user: req.user,
    });
  } else {
    res.send("Error");
  }
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
    (err, user) => {
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

export default googlerouter;
