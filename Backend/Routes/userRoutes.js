const express = require("express");
const {
  RegisterUserController,
  loginUserController,
  LogoutUserController,
  ForgotPasswordController,
  ResetPasswordController,
} = require("../Controller/userControllers");
const userRouter = express.Router();

userRouter.route("/register").post(RegisterUserController);

//login
userRouter.route("/login").post(loginUserController);

//logout
userRouter.route("/logout").get(LogoutUserController);

//Forgot
userRouter.route("/password/forgot").post(ForgotPasswordController);

//Reste Password with token
userRouter.route("/password/reset/:token").put(ResetPasswordController);

module.exports = userRouter;
