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

//Get Refresh Token
export const RefreshAccessToken = createAsyncThunk(
  "user/refresh-token",
  async () => {
    try {
      const { data } = await axios.get(`/api/v1/refresh-token`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);

//Loduser Action
export const LoadUser = createAsyncThunk(
  "user/loaduser",
  async (_, thunkAPI) => {
    // Destructure the arguments into email and password
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get("/api/v1/myprofile");
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response.data.message === "Token Expire Please Login") {
        try {
          await thunkAPI.dispatch(RefreshAccessToken());
          // Retry loading user data after refreshing the token
          const { data } = await axios.get("/api/v1/myprofile");
          return data;
        } catch (refreshError) {
          throw new Error(refreshError.response.data.message);
        }
      }
      throw new Error(error.response.data.message);
    }
  }
);

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

//Admin get all users
export const GetAllUsersAction = createAsyncThunk("admin/users", async () => {
  try {
    const { data } = await axios.get(`/api/v1/admin/getallusers`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//GetUserDetails
export const GetUserDetails = createAsyncThunk(
  "admin/userDetails",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/getsingleuser/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update User Details
export const UpdateUserRoleDetails = createAsyncThunk(
  "admin/updateUser",
  async ([id, Data]) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/updaterole/${id}`,
        Data,
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const DeleteUserAction = createAsyncThunk(
  "admin/deleteuser",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/delete-user/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response.message);
    }
  }
);
