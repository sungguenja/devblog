import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// hooks
import { useLogout } from "hooks/useOauth";

// store
import { IState } from "store/slices";
import userSlice from "store/slices/User";

// css
import styles from "./NavBar.module.css";
import router from "next/router";

export interface NavBarProps {}
const DELTA = 15;
const { actions } = userSlice;

const NavBar = ({}: NavBarProps) => {
  const dispatch = useDispatch();
  const [navBarState, setNavBarState] = useState<boolean>(true);
  const [navStyleClassName, setNavStyleClassName] = useState<Array<string>>([
    styles.navbar,
  ]);
  const lastScroll = useRef<number>(0);

  const userData = useSelector((state: IState) => state.user);
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
    <nav className={navStyleClassName.join(" ")} id="navbar">
      <div>
        <h2>img </h2>
        <h2>site name</h2>
      </div>
      <div>
        <h2>search component</h2>
        {userData.isLogin ? (
          <button onClick={logoutFunction}>logout</button>
        ) : (
          <h2 onClick={goLoginPage}>login</h2>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
