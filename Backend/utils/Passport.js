var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const usersModel = require("../Model/users.model");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await usersModel.findOne({ email: profile.emails[0].value });
        if (user) {
          // User exists, proceed with logging them in
          return cb(null, user);
        } else {
          // User does not exist, you might choose to create an account or handle it as needed
          const newuser = await usersModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: {
              public_id: Math.floor(Math.random() * 12345678),
              url: profile.photos[0].value,
            },
          });
          const saveduser = await newuser.save();
          return cb(null, saveduser);
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
// Serialize and deserialize user
passport.serializeUser((user, done) => {
  console.log("serial " + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
