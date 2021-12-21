import React, { useCallback, useEffect, useState } from "react";
import { MENU_BAR_WRAPPER_ID, MENU_BAR_NAV_ID } from "@constants/MenuBar";

// css
import styles from "./MenuBar.module.css";

interface MenuBarProps {
  menuBarState: boolean;
  setMenuBarState: (a: boolean) => void;
  menuList: Array<MenuItem>;
}

interface MenuItem {
  title: string;
  id: number;
}

const MenuBar = ({ menuBarState, setMenuBarState, menuList }: MenuBarProps) => {
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
    <div
      id={MENU_BAR_WRAPPER_ID}
      className={styles.menubarcontainer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <nav className={menuBarClassName.join(" ")} id={MENU_BAR_NAV_ID}>
        <h2>DevBlog</h2>
        <ul>
          <li>test1</li>
          <li>test2</li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
