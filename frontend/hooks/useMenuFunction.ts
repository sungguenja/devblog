import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import userSlice from "store/slices/User";
import { useLogout } from "./useOauth";

const { actions } = userSlice;

const useMenuFunction = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutFunction = async () => {
    try {
      const {
        data: { success },
      } = await useLogout();
      console.log(success);
      if (success) {
        dispatch(
          actions.changeUserState({
            nodeId: "",
            isAdmin: false,
            isLogin: false,
          }),
        );
        localStorage.removeItem("loginData");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goLoginPage = () => {
    router.push("/login");
  };

  const onClickGoToMain = () => {
    router.push("/");
  };
  return { logoutFunction, goLoginPage, onClickGoToMain };
};

export default useMenuFunction;
