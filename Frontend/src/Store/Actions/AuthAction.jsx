import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
