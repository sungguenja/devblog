import { CategoryAndMenu } from "Interfaces/writing";

import MenuCell from "Components/MenuCell";

interface MenuBarProps {
  menuBarWrapperId: string;
  menuBarWrapperClassName: string;
  onMouseEnter: VoidFunction;
  onMouseLeave: VoidFunction;
  menuBarNavClassName: string;
  menuBarNavId: string;
  menuCellList: Array<CategoryAndMenu>;
}

const MenuBar = ({
  menuBarWrapperId,
  menuBarWrapperClassName,
  onMouseEnter,
  onMouseLeave,
  menuBarNavClassName,
  menuBarNavId,
  menuCellList,
}: MenuBarProps) => {
  return (
    <div
      id={menuBarWrapperId}
      className={menuBarWrapperClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <nav className={menuBarNavClassName} id={menuBarNavId}>
        <h2>DevBlog</h2>
        {menuCellList.map((item) => {
          return (
            <MenuCell
              menuCellItem={item}
              key={item.name + item.categoryId.toString()}
            />
          );
        })}
      </nav>
    </div>
  );
};

export default MenuBar;
