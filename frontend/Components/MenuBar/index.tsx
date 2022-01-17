import React, { useCallback, useEffect, useState } from "react";
import { MENU_BAR_WRAPPER_ID, MENU_BAR_NAV_ID } from "@constants/MenuBar";

// css
import styles from "./MenuBar.module.css";
import MenuBar from "./MenuBar";

interface MenuBarProps {
  menuList: MenuItem[];
}

interface MenuItem {
  title: string;
  id: number;
}

const MenuBarIndex = ({ menuList }: MenuBarProps) => {
  const [menuBarState, setMenuBarState] = useState<boolean>(false);
  const [menuBarClassName, setMenuBarClassName] = useState<Array<string>>([
    styles.menubar,
  ]);

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
  }, [menuBarState]);

  return (
    <MenuBar
      menuBarWrapperId={MENU_BAR_WRAPPER_ID}
      menuBarWrapperClassName={styles.menubarcontainer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      menuBarNavClassName={menuBarClassName.join(" ")}
      menuBarNavId={MENU_BAR_NAV_ID}
    />
  );
};

export default MenuBarIndex;
