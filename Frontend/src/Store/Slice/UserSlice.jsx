import { createSlice } from "@reduxjs/toolkit";
import {
  LoadUser,
  LogOut,
  LoginUser,
  RegisterUser,
} from "../Actions/AuthAction";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
    message: null,
  },

  reducers: {
    clearMessage: (state) => ({
      ...state,
      message: null,
    }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    // Handle both LoginUser and RegisterUser actions
    builder
      .addCase(LoadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = null;
      })
      .addCase(LoadUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null;
      });

    // login / register
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });

    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });

    //Logout

    builder
      .addCase(LogOut.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(LogOut.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(LogOut.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export const { clearMessage, clearError } = UserSlice.actions;
export default UserSlice.reducer;
