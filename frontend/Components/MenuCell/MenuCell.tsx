import { CategoryAndMenu, MenuItem } from "Interfaces/writing";

interface MenuCellProps {
  clickFunctionList: VoidFunction[];
  menu: MenuItem[];
  name: string;
}

const MenuCell = ({ name, menu, clickFunctionList }: MenuCellProps) => {
  return (
    <ul>
      <b>{name}</b>
      {menu.map((item, index) => {
        return (
          <li
            onClick={clickFunctionList[index]}
            key={`li${name}${item.pk}${item.title}`}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuCell;
