import { CategoryAndMenu } from "Interfaces/writing";

import MenuCell from "Components/MenuCell";

interface MenuBarProps {
  menuBarWrapperId: string;
  menuBarWrapperClassName: string;
  menuBarNavClassName: string;
  menuBarNavId: string;
  menuCellList: Array<CategoryAndMenu>;
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
        <h2 onClick={onClickGoToMain}>DevBlog</h2>
        <div className="h-56">
          {menuCellList.map((item) => {
            return (
              <MenuCell
                menuCellItem={item}
                key={item.name + item.categoryId.toString()}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MenuBar;
