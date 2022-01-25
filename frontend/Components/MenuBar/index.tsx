import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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

// store
import userSlice from "store/slices/User";
import userSelector from "store/selectors/userSelector";

// css
import styles from "./MenuBar.module.css";

import MenuBar from "./MenuBar";
import { useLogout } from "hooks/useOauth";

interface MenuBarProps {}
const { actions } = userSlice;
const menubarDefaultStyle = " md:block hidden";

const MenuBarIndex = ({}: MenuBarProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuBarState, setMenuBarState] = useState<boolean>(false);
  const [menuCellList, setMenuCellList] = useState<Array<CategoryAndMenu>>([]);
  const [menuBarClassName, setMenuBarClassName] = useState<Array<string>>([
    styles.menubar,
    "h-[100%]",
  ]);

  const userData = useSelector(userSelector);

  const goLoginPage = () => {
    router.push("/login");
  };

  const logoutFunction = useCallback(async () => {
    try {
      const {
        data: { success },
      } = await useLogout();
      console.log(success);
      if (success) {
        dispatch(
          actions.changeUserState({
            nodeId: "",
            isAdmin: false,
            isLogin: false,
          }),
        );
        localStorage.removeItem("loginData");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      setMenuBarClassName([styles.menubar]);
    }
  }, [menuBarState]);

  return (
    <MenuBar
      menuBarWrapperId={MENU_BAR_WRAPPER_ID}
      menuBarWrapperClassName={styles.menubarcontainer + menubarDefaultStyle}
      isLogin={userData.isLogin}
      logoutFunction={logoutFunction}
      goLoginPage={goLoginPage}
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
