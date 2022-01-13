export interface IUser {
  isLogin: boolean;
  isAdmin: boolean;
  nodeId: string;
}

export const initialUser: IUser = {
  isLogin: false,
  isAdmin: false,
  nodeId: "",
};
