import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// update Profile
export const ProfileUpdate = createAsyncThunk(
  "user/profileUpdate",
  async (userData) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        "/api/v1/update-profile",
        userData,
        config
      );
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);

//Password Uodate
export const PasswordUpdate = createAsyncThunk(
  "user/passwordupdate",
  async (Data) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put("/api/v1/password/update", Data, config);
      // console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Forgot Password
export const ForgotPasswordAPi = createAsyncThunk(
  "user/forgotpassword",
  async (email) => {
    console.log(email);
    try {
      const config = { headres: { "Content-type": "appliction/json" } };
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        { email: email },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Reset Token
///password/reset/:token
export const ResetPasswordToken = createAsyncThunk(
  "user/reset",
  async ([resetToken, password, cpassword]) => {
    try {
      // console.log(resetToken, password, cpassword);
      const config = { headres: { "Content-type": "appliction/json" } };
      const { data } = await axios.put(
        `/api/v1/password/reset/${resetToken}`,
        { password, cpassword },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
