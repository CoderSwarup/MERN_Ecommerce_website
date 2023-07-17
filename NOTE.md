# note about the Nodemailer

```
When You Send the Email throug the node is use the your Origial Email or Passsword of yor account but password is not real passwod that is Use from the created by follwoing steps wich are

    If you have enabled two-step verification for your Gmail account, you need to generate an application-specific password. Here's how you can generate an application-specific password:

    1] Go to your Google Account settings.
    2]  Navigate to the "Security" tab.
    3] Look for the "Signing in to Google" section and click on "App passwords".
    4] Select the app as "Mail" and the device as "Other (Custom name)".
    5] Click on "Generate" to create an application-specific password.
    6] Use the generated application-specific password in your nodemailer configuration instead of your account's regular password.
```

> > ## Inside Usermodel Use This code 👇👇

```js
UserSchema.methods.generatePasswordResetToken = function () {
  try {
    // this resettoken genarate the random value
    let resetToken = crypto.randomBytes(20).toString("hex");
    // console.log(resetToken);

    //hashing and adding to user schema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpired = new Date(Date.now() + 1 * 60 * 1000);

    // console.log(newlytoken, expires);
    return this.resetPasswordToken;
  } catch (error) {
    console.log("error");
  }
};
```

> > ## use in to send mail function inseparate file

```js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.SendEmail = async (options) => {
  try {
    const TransPorter = nodemailer.createTransport({
      host: process.env.NODEMAILER_SERVICE, // if uou use the gamil use this "smtp.gmail.com"
      //   secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: options?.email,
      subject: options?.subject,
      text: options?.message,
    };

    await TransPorter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
```

> > ## and Finally create a one controller For That route

```js
exports.ForgotPasswordController = async (req, res) => {
  let user = await usersModel.findOne({ email: req.body.email });
  try {
    if (!user) {
      throw ErrorHandler.customError("User Not Found", 404);
    }

    // get Reset Pasword Token
    let resetToken = user.generatePasswordResetToken();
    console.log(resetToken);

    //saving token
    await user.save({ validateBeforeSave: false });

    // genaerate
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v3/password/reset/${resetToken}`;
    const message = `Your Reset Password Token is  == \n\n  ${resetPasswordUrl} \n\n if You Have Not requested this Email then , Please Error `;

    await SendEmail({
      email: user.email,
      subject: `SamEcom Password Recovery`,
      message,
    });

    res.status(200).send({
      success: true,
      message: `Email is Send TO ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });
    ThrowError(error, res, "Forgot Password ");
    console.log(error);
  }
};
```
