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

//UserRutes
exports.GetUserDeatils = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (!user) {
      throw ErrorHandler.customError("User Not Found", 404);
    }
    res.status(200).send({
      success: true,
      message: "You Details Gotted",
      user,
    });
  } catch (error) {
    ThrowError(error, res, "Getting user Details");
  }
};

//Chnage Password

exports.UpdatePasswordController = async (req, res) => {
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

    sendToken(user, 200, "Password Update  Succcessfully", res);
  } catch (error) {
    ThrowError(error, res, "Chnging Password");
  }
};

//update Profile Controller
exports.UpdateProfileController = async (req, res) => {
  try {
    const NewUserData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
    };

    const user = await usersModel.findByIdAndUpdate(req.user._id, NewUserData, {
      new: true,
    });

    res.status(200).send({
      success: true,
      message: "Profile Updated Succefully",
    });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "Update Profile");
  }
};

// admin show all user profiles

exports.GetAllUserDeatils = async (req, res) => {
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
exports.GetSingleUserDeatils = async (req, res) => {
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
exports.UpdateUserRole = async (req, res) => {
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
exports.DeleteUser = async (req, res) => {
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
