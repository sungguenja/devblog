import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// store
import { IState } from "store/slices";

// css
import styles from "./NavBar.module.css";

export interface NavBarProps {
  navBarState: boolean;
  setNavBarState: (a: boolean) => void;
}

const NavBar = ({ navBarState, setNavBarState }: NavBarProps) => {
  const [navStyleClassName, setNavStyleClassName] = useState<Array<string>>([
    styles.navbar,
  ]);

  const userData = useSelector((state: IState) => state.user);
  console.log(userData, "?");
  const { isLogin } = userData;

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
        <h2> site name</h2>
      </div>
      <div>
        <h2>search component</h2>
        <h2>{isLogin ? "logout" : "login"}</h2>
      </div>
    </nav>
  );
};

export default NavBar;
