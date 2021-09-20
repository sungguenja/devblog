// css
import { useEffect, useState } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  navBarState: boolean,
  setNavBarState: (a:boolean) => void
}

const NavBar = ({ navBarState, setNavBarState }: NavBarProps) => {
  const [ navStyleClassName, setNavStyleClassName ] = useState<Array<string>>([styles.navbar]);

  const btnClick = () => {
    setNavBarState(!navBarState);
  };

  useEffect(()=>{
    const element = document.getElementById('navbar');

    if (element === null) {
      return
    }

    if (navBarState) {
      setNavStyleClassName([styles.navbar]);
    } else {
      setNavStyleClassName([styles.navbar,styles.navbarnone]);
    }

    console.log(navStyleClassName)
  },[navBarState]);

  return (
    <nav className={navStyleClassName.join(' ')} id="navbar">
      <div>
        <h2>img </h2>
        <h2> site name</h2>
      </div>
      <div>
        <h2>search component</h2>
        <h2>login or logout</h2>
      </div>
    </nav>
  );
};

export default NavBar;