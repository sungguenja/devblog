import {
  AnyAction,
  CombinedState,
  combineReducers,
  Store,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// slices
import userSlice from "./User";
import viewSlice from "./ViewStore";

// types
import { IUser } from "./User/type";
import { IViewStore } from "./ViewStore/type";

export interface IState {
  user: IUser;
  viewStore: IViewStore;
}

const rootReducer = (
  state: IState,
  action: AnyAction,
): CombinedState<IState> => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user: userSlice.reducer,
    viewStore: viewSlice.reducer,
  })(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
