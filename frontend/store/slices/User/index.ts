import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    changeUserState: (state, action: PayloadAction<IUser>) => {
      const { payload } = action;
      state = { ...payload };
      return state;
    },
  },
});

export default userSlice;
