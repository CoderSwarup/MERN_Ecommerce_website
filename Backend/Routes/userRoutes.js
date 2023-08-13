const express = require("express");
const {
  RegisterUserController,
  loginUserController,
  LogoutUserController,
  ForgotPasswordController,
  ResetPasswordController,
  GetUserDeatils,
  UpdatePasswordController,
  UpdateProfileController,
  GetAllUserDeatils,
  GetSingleUserDeatils,
  UpdateUserRole,
  DeleteUser,
  RefreshTokenController,
} = require("../Controller/userControllers");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.route("/register").post(RegisterUserController);

//login
userRouter.route("/login").post(loginUserController);

//logout
userRouter.route("/logout").get(isAuthicatedUser, LogoutUserController);

//Forgot
userRouter.route("/password/forgot").post(ForgotPasswordController);

//Reste Password with token
userRouter.route("/password/reset/:token").put(ResetPasswordController);

//geting User Profile
userRouter.route("/myprofile").get(isAuthicatedUser, GetUserDeatils);
userRouter.route("/refresh-token").get(RefreshTokenController);

//update password
userRouter
  .route("/password/update")
  .put(isAuthicatedUser, UpdatePasswordController);

//updateProfile Controller
userRouter
  .route("/update-profile")
  .put(isAuthicatedUser, UpdateProfileController);

// admin can see all user details and single user details

userRouter
  .route("/admin/getallusers")
  .get(isAuthicatedUser, isAdmin, GetAllUserDeatils);

//
userRouter
  .route("/admin/getsingleuser/:id")
  .get(isAuthicatedUser, isAdmin, GetSingleUserDeatils);

//updateuser Role
userRouter
  .route("/admin/updaterole/:id")
  .put(isAuthicatedUser, isAdmin, UpdateUserRole);

userRouter
  .route("/admin/delete-user/:id")
  .delete(isAuthicatedUser, isAdmin, DeleteUser);

module.exports = userRouter;
