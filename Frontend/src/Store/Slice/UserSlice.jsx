import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
      // console.log("inside action ", action.payload);
    },
    removeUser(state, action) {
      state.user = "";
    },
    DeleteAllUser(state, action) {
      return [];
    },
  },
});

export default UserSlice.reducer;
export const { addUser, removeUser } = UserSlice.actions;
