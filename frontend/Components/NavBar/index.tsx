import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { CategoryAndMenu } from "Interfaces/writing";

// hooks
import useMenuFunction from "hooks/useMenuFunction";

// store
import userSelector from "store/selectors/userSelector";

import NavBar from "./NavBar";

// css
import styles from "./NavBar.module.css";

export interface NavBarProps {
  menuCellList: Array<CategoryAndMenu>;
}

const DELTA = 15;
const navbarDefaultStyle = " md:hidden block";

const NavBarIndex = ({ menuCellList }: NavBarProps) => {
  const [navBarState, setNavBarState] = useState<boolean>(true);
  const [menuState, setMenuState] = useState<boolean>(false);
  const [navStyleClassName, setNavStyleClassName] = useState<Array<string>>([
    styles.navbar,
  ]);
  const [menuStyleClassName, setMenuStyleClassName] = useState<Array<string>>([
    styles.innerMenu,
    styles.innerMenuNone,
  ]);
  const lastScroll = useRef<number>(0);

  const userData = useSelector(userSelector);

  const { logoutFunction, goLoginPage, onClickGoToMain } = useMenuFunction();

  const scrollEvent = useCallback(() => {
    const nowScrollTop = document.documentElement.scrollTop;

    if (Math.abs(nowScrollTop - lastScroll.current) < DELTA) return;

    if (nowScrollTop > lastScroll.current) {
      setNavBarState(false);
      setMenuState(false);
    } else {
      setNavBarState(true);
    }
    lastScroll.current = nowScrollTop;
  }, [setNavBarState, setMenuState, lastScroll]);

  const onClickMenuState = useCallback(() => {
    setMenuState((state) => !state);
  }, [setMenuState]);

  const turnOffMenu = useCallback(() => {
    setMenuState(false);
  }, [setMenuState]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

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

    if (menuState) {
      setMenuStyleClassName([styles.innerMenu]);
    } else {
      setMenuStyleClassName([styles.innerMenu, styles.innerMenuNone]);
    }
  }, [navBarState, menuState, setNavStyleClassName, setMenuStyleClassName]);

  return (
    <NavBar
      navStyleClassName={navStyleClassName.join(" ") + navbarDefaultStyle}
      isLogin={userData.isLogin}
      logoutFunction={logoutFunction}
      goLoginPage={goLoginPage}
      menuCellList={menuCellList}
      menuState={menuState}
      menuStyleClassName={menuStyleClassName.join(" ")}
      onClickMenuState={onClickMenuState}
      onClickGoToMain={onClickGoToMain}
      turnOffMenu={turnOffMenu}
    />
  );
};

export default NavBarIndex;
