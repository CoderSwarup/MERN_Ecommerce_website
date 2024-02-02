import usersModel from "../Model/users.model.js";
import validator from "validator";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/JWTtoken.js";
import { ThrowError } from "../utils/ErrorHelper.js";
import { SendEmail } from "../utils/sendEamil.js";
import cloudinary from "cloudinary";
import JWT from "jsonwebtoken";

export const RegisterUserController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (name.length < 4) {
      throw ErrorHandler.customError(
        "username length Must be greater Than 3",
        401
      );
    }
    if (!name || !email || !password || !mobile) {
      throw new ErrorHandler(400, "All fields are required!");
    }
    const registeruser = await usersModel.findOne({ email });
    if (registeruser) {
      return res.status(400).send({
        success: false,
        message: "User is Already Register",
      });
    }
    const validateEmail = validator.isEmail(email);
    // console.log(validateEmail);
    if (!validateEmail) {
      return res.status(400).send({
        success: false,
        message: "Email is Not Valid",
      });
    }
    let myCloud;

    if (req.body.avatar !== "/Profile.png") {
      myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "samecomm",
        width: 150,
        crop: "scale",
      });
    }

    const user = await usersModel({
      name,
      email,
      password,
      mobile,
      avatar: {
        public_id: myCloud?.public_id || Math.floor(Math.random() * 26633636),
        url: myCloud?.secure_url || "/Profile.png",
      },
    });

    await user.save();

    sendToken(user, 200, "User Register Successfully", res);
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "Registration");
  }
};

//login Controller
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking the password
    if (!email || !password) {
      throw ErrorHandler.validationerror();
    }

    const user = await usersModel.findOne({ email }).select("+password");

    if (!user) {
      throw ErrorHandler.customError("Invalid Email Or Password ", 401);
    }

    const isPassMatch = await user.comparePassword(password);

    if (!isPassMatch) {
      throw ErrorHandler.customError("Invalid Email Or Password ", 401);
    }

    sendToken(user, 200, "login Succcessfully", res);
  } catch (error) {
    ThrowError(error, res, "Login");
  }
};

//logout fucntionallity
export const LogoutUserController = async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .cookie("refreshToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .send({
        success: true,
        message: "logout Successfully",
      });
  } catch (error) {
    // res.status(error.status).send(error);
    console.log(error);
    ThrowError(error, res, "Logout");
  }
};

//Forgot Password Controller

export const ForgotPasswordController = async (req, res) => {
  if (req.body.email === "") {
    throw ErrorHandler.customError("Please Fill Email Field", 404);
  }
  // console.log(req.body.email);
  let user = await usersModel.findOne({ email: req.body.email });
  try {
    // console.log(user);
    if (!user) {
      throw ErrorHandler.customError(
        "User Not Found please Enter Correct Email",
        404
      );
    }

    // get Reset Pasword Token
    let resetToken = await user.generatePasswordResetToken();
    // console.log(resetToken);

    //saving token
    await user.save({ validateBeforeSave: false });

    // genaerate
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/password/reset/${resetToken}`;

    //genarate on frontend Url
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your Reset Password Token is  == \n\n  ${resetPasswordUrl} \n\n if You Have Not requested this Email then , Please Error `;

    let EmailSend = await SendEmail(
      {
        email: user.email,
        subject: `SamEcom Password Recovery`,
        message,
      },
      res
    );
    if (EmailSend) {
      res.status(200).send({
        success: true,
        message: `Email is Send TO ${user.email}`,
      });
    }
  } catch (error) {
    if (error instanceof ErrorHandler) {
      ThrowError(error, res, "Forgot Password ");
    } else {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpired = undefined;
      await user.save({ validateBeforeSave: false });
    }
  }
};

//Reset Password Controller
export const ResetPasswordController = async (req, res) => {
  try {
    const resetToken = req.params.token;

    if (req.body.password !== req.body.cpassword) {
      throw ErrorHandler.customError("Password Not Matched", 404);
    }

    const user = await usersModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpired: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      throw ErrorHandler.customError(
        "Password Token Is Expired Sorry Try Again",
        404
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();
    sendToken(user, 200, "Password Changed Succefully", res);
  } catch (error) {
    // console.log(error);
    ThrowError(error, res, "Reset Password Time ");
  }
};

//UserRutes
export const GetUserDeatils = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (!user) {
      throw ErrorHandler.customError("User Not Found", 404);
    }
    res.status(200).send({
      success: true,
      message: "Welcome Back To Our Website",
      user,
    });
  } catch (error) {
    ThrowError(error, res, "Getting user Details");
  }
};

// Refresh token
export const RefreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ success: false, message: "Refresh Token Not found" });
    }

    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await usersModel.findById(decoded._id);

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "User Not Found" });
    }

    sendToken(user, 200, "", res);
  } catch (error) {
    if (error instanceof JWT.TokenExpiredError) {
      return res.status(404).send({
        success: false,
        message: "Token Expire Please Login",
      });
    } else {
      ThrowError(error, res, "Authetication Time");
    }
  }
};

//Chnage Password

export const UpdatePasswordController = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user._id).select("+password");
    if (!user) {
      throw ErrorHandler.customError("User Not Found", 404);
    }

    if (!req.body.oldpassword || !req.body.newpassword || !req.body.cpassword) {
      throw ErrorHandler.customError("all Password Field Are Required", 404);
    }

    const isPassMatch = await user.comparePassword(req.body.oldpassword);
    if (!isPassMatch) {
      throw ErrorHandler.customError("Old Password i Incorrect", 404);
    }

    if (req.body.newpassword !== req.body.cpassword) {
      throw ErrorHandler.customError("Password Not Matched", 404);
    }

    user.password = req.body.newpassword;

    await user.save();

    sendToken(user, 200, "Password Update Succcessfully", res);
  } catch (error) {
    ThrowError(error, res, "Chnging Password");
  }
};

//update Profile Controller
export const UpdateProfileController = async (req, res) => {
  try {
    let NewUserData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
    };

    // Update Cloudinary Images
    if (req.body.avatar !== "") {
      const user = await usersModel.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "samecomm",
        width: 150,
        crop: "scale",
      });

      NewUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await usersModel.findByIdAndUpdate(req.user._id, NewUserData, {
      new: true,
    });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile Updated Succefully",
    });
  } catch (error) {
    ThrowError(error, res, "Update Profile");
  }
};

// admin show all user profiles

export const GetAllUserDeatils = async (req, res) => {
  try {
    const alluser = await usersModel.find({});

    res.status(200).send({
      success: true,
      message: "allUser Deatils",
      alluser,
    });
  } catch (error) {
    ThrowError(error, res, "Get ALL User");
  }
};

//single details of user admin can see only
export const GetSingleUserDeatils = async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if (!user) {
      throw ErrorHandler.customError(`${req.params.id} User Not Found `, 201);
    }

    res.status(200).send({
      success: true,
      message: "User Deatils",
      user,
    });
  } catch (error) {
    ThrowError(error, res, "Get ALL User");
  }
};

//update userRle ==>admin
export const UpdateUserRole = async (req, res) => {
  try {
    if (!req.body.role) {
      throw ErrorHandler.customError("please Pass the Role", 404);
    }
    const { role } = req.body;

    const user = await usersModel.findByIdAndUpdate(
      req.params.id,
      { role: role },
      { new: true }
    );

    await user.save();

    res.status(200).send({
      success: true,
      message: "user Role is Updated ",
    });
  } catch (error) {
    ThrowError(error, res, "Updating Role");
  }
};

//delete user
export const DeleteUser = async (req, res) => {
  try {
    const user = await usersModel.findByIdAndDelete(req.params.id);
    if (!user) {
      throw ErrorHandler.customError("User Not Found", 404);
    }
    res.status(200).send({
      success: true,
      message: "user is Deleted ",
    });
  } catch (error) {
    ThrowError(error, res, "Updating Role");
  }
};
