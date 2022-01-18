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

const { actions } = userSlice;

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const csrfToken = useGetCookie("csrftoken");
    if (csrfToken !== "test") {
      const loginData = useGetCookie("loginData");
      const data = JSON.parse(loginData);
      dispatch(
        actions.changeUserState({
          nodeId: data.nodeId,
          isLogin: true,
          isAdmin: data.isAdmin === "true",
        }),
      );
    }
  }, []);

  return (
    <>
      <NavBar />
      <div id="page">
        <MenuBar menuList={[]} />
        <div className="bg-amber-400 mx-[16vw]">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
export default wrapper.withRedux(MyApp);
