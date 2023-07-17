const usersModel = require("../Model/users.model");
const validator = require("validator");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/JWTtoken");
const { ThrowError } = require("../utils/ErrorHelper");
const { SendEmail } = require("../utils/sendEamil");

exports.RegisterUserController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const validateEmail = validator.isEmail(email);
    // console.log(validateEmail);
    if (!validateEmail) {
      return res.status(400).send({
        success: false,
        message: "Email is Not Valid",
      });
    }

    const user = await usersModel({
      name,
      email,
      password,
      mobile,
      avatar: {
        public_id: "this is images",
        url: "djdjdj",
      },
    });
    user
      .save()
      .then((result) => {
        // const token = user.getJWTToken();
        // res.status(200).send({
        //   success: true,
        //   message: "User is Created Successfully ",
        //   token,
        // });
        sendToken(user, 200, "User is Created Successfully ", res);
      })
      .catch((err) => {
        if (err.code === +11000) {
          return res.status(201).send({
            success: false,
            message: "Email Already Register",
          });
        }
      });
  } catch (error) {
    ThrowError(error, res, "Registration");
  }
};

//login Controller
exports.loginUserController = async (req, res) => {
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
    console.log(error);
    ThrowError(error, res, "Login");
  }
};

//logout fucntionallity
exports.LogoutUserController = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      message: "logout Successfully",
    });
  } catch (error) {
    // res.status(error.status).send(error);
    ThrowError(error, res, "Logout");
  }
};

//Forgot Password Controller

exports.ForgotPasswordController = async (req, res) => {
  let user = await usersModel.findOne({ email: req.body.email });
  try {
    if (!user) {
      throw ErrorHandler.customError(
        "User Not Found please Enter Correct Email",
        404
      );
    }

    // get Reset Pasword Token
    let resetToken = user.generatePasswordResetToken();
    // console.log(resetToken);

    //saving token
    await user.save({ validateBeforeSave: false });

    // genaerate
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
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
exports.ResetPasswordController = async (req, res) => {
  try {
    const resetToken = req.params.token;

    if (req.body.password !== req.body.cpassword) {
      throw ErrorHandler.customError("Password Not Matched", 201);
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
    console.log(error);
    ThrowError(error, res, "Reset Password Time ");
  }
};
