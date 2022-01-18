import { useEffect } from "react";
import router from "next/router";
import { useDispatch } from "react-redux";

// custom hook
import useGetAccessToken from "hooks/useOauth";

// store
import userSlice from "store/slices/User";

// component
import Login from "../../Components/LoginComponent/Login";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const { actions } = userSlice;

const loginPropsList = [
  {
    oauthSite: "github",
    loginFunction: () => {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    },
  },
];

const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.asPath === "/login") {
      return;
    }

    const code = router.asPath.split("=")[1];
    const loginWithParam = async () => {
      try {
        const {
          data: { nodeId, isLogin, isAdmin },
        } = await useGetAccessToken(code.split("&")[0]);
        dispatch(actions.changeUserState({ nodeId, isLogin, isAdmin }));
        document.cookie = `loginData={"nodeId":"${nodeId}","isAdmin":"${isAdmin}"}`;
        router.push("/");
      } catch (err) {
        console.log(err);
        alert("로그인에 실패했습니다. \n 한번더 시도해주시길 바라겠습니다");
      }
    };
    loginWithParam();
  }, []);

  return <Login loginPropsList={loginPropsList} />;
};

export default index;
