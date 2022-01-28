import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CategoryAndMenu } from "Interfaces/writing";
import { MENU_BAR_WRAPPER_ID, MENU_BAR_NAV_ID } from "@constants/MenuBar";
import useMenuFunction from "hooks/useMenuFunction";

// store
import userSelector from "store/selectors/userSelector";

// css
import styles from "./MenuBar.module.css";

import MenuBar from "./MenuBar";

interface MenuBarProps {
  menuCellList: Array<CategoryAndMenu>;
}

const menubarDefaultStyle = " md:block hidden";

const MenuBarIndex = ({ menuCellList }: MenuBarProps) => {
  const [menuBarState, setMenuBarState] = useState<boolean>(false);
  const [menuBarClassName, setMenuBarClassName] = useState<Array<string>>([
    styles.menubar,
    "h-[100%]",
  ]);

  const userData = useSelector(userSelector);

  const { logoutFunction, goLoginPage, onClickGoToMain } = useMenuFunction();

  const onMouseEnter = useCallback(() => {
    setMenuBarState(true);
  }, [setMenuBarState]);

  const onMouseLeave = useCallback(() => {
    setMenuBarState(false);
  }, [setMenuBarState]);

  useEffect(() => {
    const element = document.getElementById(MENU_BAR_NAV_ID);

    if (element == null) {
      return;
    }

    if (menuBarState) {
      setMenuBarClassName([styles.menubar]);
    } else {
      setMenuBarClassName([styles.menubar, styles.menubarnone]);
    }
  }, [menuBarState, setMenuBarClassName]);

  return (
    <MenuBar
      menuBarWrapperId={MENU_BAR_WRAPPER_ID}
      menuBarWrapperClassName={styles.menubarcontainer + menubarDefaultStyle}
      isLogin={userData.isLogin}
      logoutFunction={logoutFunction}
      goLoginPage={goLoginPage}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      menuBarNavClassName={menuBarClassName.join(" ") + menubarDefaultStyle}
      menuBarNavId={MENU_BAR_NAV_ID}
      menuCellList={menuCellList}
      onClickGoToMain={onClickGoToMain}
    />
  );
};

export default MenuBarIndex;
