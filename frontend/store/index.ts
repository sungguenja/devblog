import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { AnyAction, Reducer } from "@reduxjs/toolkit";

// reducer
import rootReducer, { IState } from "./slices";

const isDev = true; // todo: env파일로 데브모드 설정

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore);

export default wrapper;
