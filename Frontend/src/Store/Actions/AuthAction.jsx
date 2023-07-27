import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//login user Action
export const LoginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    // Destructure the arguments into email and password
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Register User
export const RegisterUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    // Destructure the arguments into email and password
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/register", userData, config);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Loduser Action
export const LoadUser = createAsyncThunk("user/loaduser", async () => {
  // Destructure the arguments into email and password
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get("/api/v1/myprofile");
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});

//Logout User
export const LogOut = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.get("/api/v1/logout");
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});
