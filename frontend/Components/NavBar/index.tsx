import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";

import NavBar from "./NavBar";

// hooks
import { useLogout } from "hooks/useOauth";

// store
import userSlice from "store/slices/User";
import userSelector from "store/selectors/userSelector";

// css
import styles from "./NavBar.module.css";

export interface NavBarProps {}
const DELTA = 15;
const { actions } = userSlice;

const NavBarIndex = ({}: NavBarProps) => {
  const dispatch = useDispatch();
  const [navBarState, setNavBarState] = useState<boolean>(true);
  const [navStyleClassName, setNavStyleClassName] = useState<Array<string>>([
    styles.navbar,
  ]);
  const lastScroll = useRef<number>(0);

  const userData = useSelector(userSelector);
  console.log(userData);

  const scrollEvent = useCallback(() => {
    const nowScrollTop = document.documentElement.scrollTop;

    if (Math.abs(nowScrollTop - lastScroll.current) < DELTA) return;

    if (nowScrollTop > lastScroll.current) {
      setNavBarState(false);
    } else {
      setNavBarState(true);
    }
    lastScroll.current = nowScrollTop;
  }, [setNavBarState, lastScroll]);

  const logoutFunction = useCallback(async () => {
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
        let date = new Date();
        date.setDate(date.getDate() - 100);
        const loginCookie = `loginData=;Expires=${date.toUTCString()}`;
        document.cookie = loginCookie;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const goLoginPage = () => {
    router.push("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
  }, []);

  useEffect(() => {
    const element = document.getElementById("navbar");

    if (element === null) {
      return;
    }

    if (navBarState) {
      setNavStyleClassName([styles.navbar]);
    } else {
      setNavStyleClassName([styles.navbar, styles.navbarnone]);
    }
  }, [navBarState]);

  return (
    <NavBar
      navStyleClassName={navStyleClassName.join(" ")}
      isLogin={userData.isLogin}
      logoutFunction={logoutFunction}
      goLoginPage={goLoginPage}
    />
  );
};

export default NavBarIndex;
