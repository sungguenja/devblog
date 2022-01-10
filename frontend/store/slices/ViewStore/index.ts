import { createSlice } from "@reduxjs/toolkit";
import { IViewStore, initialViewStore } from "./type";

const initialState = initialViewStore;

const viewSlice = createSlice({
  name: "viewGlobalState",
  initialState,
  reducers: {
    resetState: (state) => {
      return (state = initialViewStore);
    },
    getViewState: (state) => {
      return state;
    },
    changeDarkMode: (state) => {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
  },
});

export default viewSlice;
