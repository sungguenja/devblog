import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useContext,
} from "react";

import { userStoreInterface } from "Interfaces/store";

interface userStoreWrapperProps {
  children: ReactNode;
}

type Action = { type: "LOGIN"; node: string };
type UserDispatch = Dispatch<Action>;

const UserStateContext = createContext<userStoreInterface | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

const reducer = (
  state: userStoreInterface,
  action: Action,
): userStoreInterface => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        node: action.node,
      };
  }
};

const UserStoreWrapper = ({ children }: userStoreWrapperProps) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    node: "",
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserStateContext = () => {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error("cannot find userStore");
  }
  return state;
};

export const useUserDispatchContext = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("cannot find userDispatch");
  }
  return dispatch;
};

export default UserStoreWrapper;
