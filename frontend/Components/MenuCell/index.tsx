import { CategoryAndMenu } from "Interfaces/writing";
import { useRouter } from "next/router";
import MenuCell from "./MenuCell";

interface MenuCellProps {
  menuCellItem: CategoryAndMenu;
}

const MenuCellIndex = ({ menuCellItem }: MenuCellProps) => {
  const router = useRouter();
  return (
    <MenuCell
      name={menuCellItem.name}
      menu={menuCellItem.menu}
      clickFunctionList={menuCellItem.menu.map((item) => {
        return () => router.push(`/menu/${item.pk}`);
      })}
    />
  );
};

export default MenuCellIndex;
