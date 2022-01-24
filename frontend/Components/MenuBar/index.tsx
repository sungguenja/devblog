import React, { useCallback, useEffect, useState } from "react";
import {
  CategoryAndMenu,
  CategoryItem,
  MenuItem,
  responseCategoryItem,
  responseMenuItem,
} from "Interfaces/writing";
import { useGetAsync } from "hooks/useAsync";

import { MENU_BAR_WRAPPER_ID, MENU_BAR_NAV_ID } from "@constants/MenuBar";
import { GET_MENU_LIST } from "@constants/Url";

// css
import styles from "./MenuBar.module.css";
import MenuBar from "./MenuBar";
import { useRouter } from "next/router";

interface MenuBarProps {}

const menubarDefaultStyle = " md:block hidden";

const MenuBarIndex = ({}: MenuBarProps) => {
  const router = useRouter();
  const [menuBarState, setMenuBarState] = useState<boolean>(false);
  const [menuCellList, setMenuCellList] = useState<Array<CategoryAndMenu>>([]);
  const [menuBarClassName, setMenuBarClassName] = useState<Array<string>>([
    styles.menubar,
  ]);

  const onClickGoToMain = () => {
    router.push("/");
  };

  const onMouseEnter = useCallback(() => {
    setMenuBarState(true);
  }, [setMenuBarState]);

  const onMouseLeave = useCallback(() => {
    setMenuBarState(false);
  }, [setMenuBarState]);

  useEffect(() => {
    const element = document.getElementById(MENU_BAR_NAV_ID);

    if (element == null) {
      return;
    }

    useGetAsync(GET_MENU_LIST).then((res) => {
      const menuList: MenuItem[] = res.data.menuList.map(
        (item: responseMenuItem) => {
          return {
            pk: item.pk,
            title: item.fields.title,
            categoryId: item.fields.categoryId,
          };
        },
      );

      const categoryList: CategoryItem[] = res.data.categoryList.map(
        (item: responseCategoryItem) => {
          return {
            pk: item.pk,
            name: item.fields.name,
          };
        },
      );

      const tmpMenuCellList: CategoryAndMenu[] = [];
      categoryList.forEach((category) => {
        const tmpMenuList: MenuItem[] = [];
        menuList.forEach((menu) => {
          if (category.pk === menu.categoryId) {
            tmpMenuList.push(menu);
          }
        });

        tmpMenuCellList.push({
          categoryId: category.pk,
          name: category.name,
          menu: tmpMenuList,
        });
      });

      setMenuCellList(tmpMenuCellList);
    });

    if (menuBarState) {
      setMenuBarClassName([styles.menubar]);
    } else {
      setMenuBarClassName([styles.menubar, styles.menubarnone]);
    }
  }, [menuBarState]);

  return (
    <MenuBar
      menuBarWrapperId={MENU_BAR_WRAPPER_ID}
      menuBarWrapperClassName={styles.menubarcontainer + menubarDefaultStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      menuBarNavClassName={menuBarClassName.join(" ") + menubarDefaultStyle}
      menuBarNavId={MENU_BAR_NAV_ID}
      menuCellList={menuCellList}
      onClickGoToMain={onClickGoToMain}
    />
  );
};

export default MenuBarIndex;
