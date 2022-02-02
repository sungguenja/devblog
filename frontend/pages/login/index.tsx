import { useEffect } from "react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";

// custom hook
import useGetAccessToken from "hooks/useOauth";

// store
import userSlice from "store/slices/User";
import userSelector from "store/selectors/userSelector";

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
  const userData = useSelector(userSelector);
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
        localStorage.setItem(
          "loginData",
          JSON.stringify({ nodeId, isLogin, isAdmin }),
        );
        router.push("/");
      } catch (err) {
        console.log(err);
        alert("로그인에 실패했습니다. \n 한번더 시도해주시길 바라겠습니다");
      }
    };
    loginWithParam();
  }, [dispatch]);

  useEffect(() => {
    if (router.asPath === "/login" && userData.isLogin) {
      alert("이미 로그인 하셨네요!");
      router.push("/");
      return;
    }
  }, [userData]);

  return <Login loginPropsList={loginPropsList} />;
};

export default index;
