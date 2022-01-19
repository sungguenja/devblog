import { IState } from "store/slices";

const viewStoreSelector = (state: IState) => state.viewStore;

export default viewStoreSelector;
