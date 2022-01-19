import { IState } from "store/slices";

const userSelector = (state: IState) => state.user;

export default userSelector;
