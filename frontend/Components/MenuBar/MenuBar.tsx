import { CategoryAndMenu } from "Interfaces/writing";

import MenuCell from "Components/MenuCell";

interface MenuBarProps {
  menuBarWrapperId: string;
  menuBarWrapperClassName: string;
  menuBarNavClassName: string;
  menuBarNavId: string;
  menuCellList: Array<CategoryAndMenu>;
  isLogin: boolean;
  logoutFunction: VoidFunction;
  goLoginPage: VoidFunction;
  onMouseEnter: VoidFunction;
  onMouseLeave: VoidFunction;
  onClickGoToMain: VoidFunction;
}

const MenuBar = ({
  menuBarWrapperId,
  menuBarWrapperClassName,
  menuBarNavClassName,
  menuBarNavId,
  menuCellList,
  isLogin,
  logoutFunction,
  goLoginPage,
  onMouseEnter,
  onMouseLeave,
  onClickGoToMain,
}: MenuBarProps) => {
  return (
    <div
      id={menuBarWrapperId}
      className={menuBarWrapperClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <nav className={menuBarNavClassName} id={menuBarNavId}>
        <div className="h-[80%]">
          <h2 className="cursor-pointer" onClick={onClickGoToMain}>
            DevBlog
          </h2>
          <div>
            {menuCellList.map((item) => {
              return (
                <MenuCell
                  menuCellItem={item}
                  key={item.name + item.categoryId.toString()}
                />
              );
            })}
          </div>
        </div>
        <div>
          {isLogin ? (
            <button onClick={logoutFunction} className="cursor-pointer">
              logout
            </button>
          ) : (
            <button onClick={goLoginPage} className="cursor-pointer">
              login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MenuBar;
