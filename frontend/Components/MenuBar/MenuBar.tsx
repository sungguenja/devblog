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

  const btnClick = () => {
    setMenuBarState(!menuBarState);
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
    <div className={styles.menubarcontainer}>
      <button onClick={btnClick} className={styles.menubtn}>
        {menuBarState ? "메뉴바 숨기기" : "메뉴바 보이기"}
      </button>
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
