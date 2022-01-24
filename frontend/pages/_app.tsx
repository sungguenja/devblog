import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";

// wrapper
import wrapper from "store";

// hooks
import { useGetCookie } from "hooks/useOauth";

// store
import userSlice from "store/slices/User";

// component
import NavBar from "@components/NavBar";
import MenuBar from "@components/MenuBar";

import "../styles/globals.css";
import { IUser } from "store/slices/User/type";

const { actions } = userSlice;

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const csrfToken = useGetCookie("csrftoken");
    if (csrfToken !== "test") {
      const loginData = localStorage.getItem("loginData");
      if (loginData === null) {
        return;
      }
      const data: IUser = JSON.parse(loginData);
      dispatch(
        actions.changeUserState({
          nodeId: data.nodeId,
          isLogin: data.isLogin,
          isAdmin: data.isAdmin,
        }),
      );
    }
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <MenuBar />
        <div className="bg-amber-400 mx-auto px-4">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
export default wrapper.withRedux(MyApp);
