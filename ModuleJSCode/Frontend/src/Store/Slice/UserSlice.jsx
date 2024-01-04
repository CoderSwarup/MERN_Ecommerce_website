import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteUserAction,
  GetAllUsersAction,
  GetUserDetails,
  LoadUser,
  LogOut,
  LoginUser,
  RegisterUser,
  UpdateUserRoleDetails,
} from "../Actions/AuthAction";
import {
  ForgotPasswordAPi,
  PasswordUpdate,
  ProfileUpdate,
  ResetPasswordToken,
} from "../Actions/ProfileActions";

// Login Register And Logout
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
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMessage, clearError } = UserSlice.actions;
export const { reducer: UserReducer } = UserSlice;

//Reducer For Profile
const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    message: null,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    ProfileClearMsg: (state) => ({
      ...state,
      message: null,
    }),
    ProfileClearErr: (state) => ({
      ...state,
      error: null,
    }),
    Reset_Is_Updated: (state) => ({
      ...state,
      isUpdated: false,
    }),
    Reset_Is_Deleted: (state) => ({
      ...state,
      isDeleted: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProfileUpdate.pending, (state) => {
        (state.loading = true), (state.error = null), (state.message = null);
      })
      .addCase(ProfileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload.message;
      })
      .addCase(ProfileUpdate.rejected, (state, action) => {
        (state.loading = false),
          (state.isUpdated = false),
          (state.message = null),
          (state.error = action.error.message);
      });

    // password update
    builder
      .addCase(PasswordUpdate.pending, (state) => {
        (state.loading = true),
          (state.message = null),
          (state.isUpdated = false),
          (state.error = null);
      })
      .addCase(PasswordUpdate.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isUpdated = true),
          (state.message = action.payload.message);
      })
      .addCase(PasswordUpdate.rejected, (state, action) => {
        (state.loading = false),
          (state.isUpdated = false),
          (state.message = null),
          (state.error = action.error.message);
      });

    //Role Update
    builder
      .addCase(UpdateUserRoleDetails.pending, (state) => {
        (state.loading = true),
          (state.message = null),
          (state.isUpdated = false),
          (state.error = null);
      })
      .addCase(UpdateUserRoleDetails.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isUpdated = true),
          (state.message = action.payload.message);
      })
      .addCase(UpdateUserRoleDetails.rejected, (state, action) => {
        (state.loading = false),
          (state.isUpdated = false),
          (state.message = null),
          (state.error = action.error.message);
      });

    // delete User
    builder
      .addCase(DeleteUserAction.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.isDeleted = false;
      })
      .addCase(DeleteUserAction.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isDeleted = true),
          (state.message = action.payload.message);
      })
      .addCase(DeleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.message = null;
        state.error = action.error.message;
      });
  },
});
export const { ProfileClearErr, ProfileClearMsg, Reset_Is_Updated } =
  ProfileSlice.actions;
export const { reducer: ProfileReducer } = ProfileSlice;

//Forgot Password Slice
const ForgotPasswordSlice = createSlice({
  name: "ForgotPassword",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    forgotclearError: (state) => ({
      ...state,
      error: null,
    }),
    forgotclearSuccess: (state) => ({
      ...state,
      success: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(ForgotPasswordAPi.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgotPasswordAPi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(ForgotPasswordAPi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(ResetPasswordToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPasswordToken.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(ResetPasswordToken.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.error.message;
      });
  },
});

export const { forgotclearError, forgotclearSuccess } =
  ForgotPasswordSlice.actions;

export const { reducer: ForgotPasswordReducer } = ForgotPasswordSlice;

const GetAllUserSlice = createSlice({
  name: "GetAllUsers",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(GetAllUsersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.alluser;
      })
      .addCase(GetAllUsersAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: GetAllUserReducer } = GetAllUserSlice;

const UserDetailsSlice = createSlice({
  name: "UserDetails",
  initialState: {
    loading: false,
    user: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: UserDetailsReducer } = UserDetailsSlice;
