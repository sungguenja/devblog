export interface IUser {
  isLogin: boolean;
  isAdmin: boolean;
  nodeState: string;
}

export const initialUser: IUser = {
  isLogin: false,
  isAdmin: false,
  nodeState: "",
};
