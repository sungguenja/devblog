import MenuCell from "@components/MenuCell";
import { CategoryAndMenu } from "Interfaces/writing";

export interface NavBarProps {
  navStyleClassName: string;
  isLogin: boolean;
  menuCellList: Array<CategoryAndMenu>;
  menuState: boolean;
  menuStyleClassName: string;
  logoutFunction: VoidFunction;
  goLoginPage: VoidFunction;
  onClickMenuState: VoidFunction;
  onClickGoToMain: VoidFunction;
}

const NavBar = ({
  navStyleClassName,
  isLogin,
  menuCellList,
  menuState,
  menuStyleClassName,
  logoutFunction,
  goLoginPage,
  onClickMenuState,
  onClickGoToMain,
}: NavBarProps) => {
  return (
    <nav className={navStyleClassName} id="navbar">
      <div>
        <div onClick={onClickGoToMain}>
          <h2>img </h2>
          <h2>site name</h2>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={onClickMenuState}
        >
          <div className="space-y-2">
            <span
              className={
                menuState
                  ? "block w-8 h-1 bg-slate-100 animate-pulse"
                  : "block w-8 h-1 bg-gray-600 animate-pulse"
              }
            ></span>
            <span
              className={
                menuState
                  ? "block w-8 h-1 bg-slate-100 animate-pulse"
                  : "block w-8 h-1 bg-gray-600 animate-pulse"
              }
            ></span>
            <span
              className={
                menuState
                  ? "block w-8 h-1 bg-slate-100 animate-pulse"
                  : "block w-8 h-1 bg-gray-600 animate-pulse"
              }
            ></span>
          </div>
        </div>
      </div>
      <nav className={menuStyleClassName}>
        {menuCellList.map((item) => {
          return (
            <MenuCell
              menuCellItem={item}
              key={item.name + item.categoryId.toString()}
            />
          );
        })}
        <h2 className="text-center">search component</h2>
        {isLogin ? (
          <h2 onClick={logoutFunction} className="text-center">
            logout
          </h2>
        ) : (
          <h2 onClick={goLoginPage} className="text-center">
            login
          </h2>
        )}
      </nav>
    </nav>
  );
};

export default NavBar;
