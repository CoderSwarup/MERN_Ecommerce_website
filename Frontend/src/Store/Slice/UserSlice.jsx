import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, RegisterUser } from "../Actions/AuthAction";

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
  },
  extraReducers: (builder) => {
    // Handle both LoginUser and RegisterUser actions
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = state.user.message;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        // Handle the successful registration here (if needed)
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = state.user.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        // Handle the registration failure here (if needed)
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMessage } = UserSlice.actions;
export default UserSlice.reducer;
