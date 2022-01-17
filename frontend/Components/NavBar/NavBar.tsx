export interface NavBarProps {
  navStyleClassName: string;
  isLogin: boolean;
  logoutFunction: VoidFunction;
  goLoginPage: VoidFunction;
}

const NavBar = ({
  navStyleClassName,
  isLogin,
  logoutFunction,
  goLoginPage,
}: NavBarProps) => {
  return (
    <nav className={navStyleClassName} id="navbar">
      <div>
        <h2>img </h2>
        <h2>site name</h2>
      </div>
      <div>
        <h2>search component</h2>
        {isLogin ? (
          <button onClick={logoutFunction}>logout</button>
        ) : (
          <h2 onClick={goLoginPage}>login</h2>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
