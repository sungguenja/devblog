import { createSlice } from "@reduxjs/toolkit";
import { IUser, initialUser } from "./type";

const initialState = initialUser;

const userSlice = createSlice({
  name: "userGlobalState",
  initialState,
  reducers: {
    resetState: (state) => {
      return (state = initialUser);
    },
    getUserState: (state) => {
      return state;
    },
  },
});

export default userSlice;
