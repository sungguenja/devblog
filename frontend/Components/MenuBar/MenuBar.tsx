import { useEffect, useState } from "react";

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

  const onMouseOver = () => {
    setMenuBarState(true);
  };

  const onMouseOut = () => {
    setMenuBarState(false);
  };

  useEffect(() => {
    const element = document.getElementById("menubar");

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
      className={styles.menubarcontainer}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <nav className={menuBarClassName.join(" ")} id="menubar">
        <h2>Guru's DevBlog</h2>
        <ul>
          <li>test1</li>
          <li>test2</li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
