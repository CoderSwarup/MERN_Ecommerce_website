import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [30],
      minLength: [4, "minmum name Cahrater Length 4"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Eneter a Valid Email"],
    },
    password: {
      type: String,
      // required: true,
      select: false,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpired: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

//jwt token
UserSchema.methods.getJWTToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

//Refresh token
UserSchema.methods.generateRefreshToken = function () {
  return JWT.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

//campare password
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compareSync(password, this.password);
  return await isMatch;
};

//reset pasword Method
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

    this.resetPasswordExpired = new Date(Date.now() + 15 * 60 * 1000);

    // console.log(this.resetPasswordToken.length);
    return this.resetPasswordToken;
  } catch (error) {
    console.log("error");
  }
};
const usersModel = mongoose.model("User", UserSchema);
export default usersModel;
