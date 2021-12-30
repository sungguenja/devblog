import { atom } from "recoil";

interface userStateInterface {
  isLogin: boolean;
  node: string;
}

const userState = atom<userStateInterface>({
  key: "userState",
  default: { isLogin: false, node: "" },
});

export { userState };
