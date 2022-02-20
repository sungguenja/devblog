import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";

// interface & contants
import {
  CategoryAndMenu,
  CategoryItem,
  MenuItem,
  ResponseCategoryItem,
  ResponseMenuItem,
} from "Interfaces/writing";
import { GET_MENU_LIST } from "@constants/Url";

// wrapper
import wrapper from "store";

// hooks
import { useGetCookie } from "hooks/useOauth";
import { useGetAsync } from "hooks/useAsync";

// store
import userSlice from "store/slices/User";

// component
import NavBar from "@components/NavBar";
import MenuBar from "@components/MenuBar";

import "../styles/globals.css";
import { IUser } from "store/slices/User/type";

const { actions } = userSlice;

function MyApp({ Component, pageProps }: AppProps) {
  const [menuCellList, setMenuCellList] = useState<Array<CategoryAndMenu>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      const csrfToken = useGetCookie("csrftoken");
      if (csrfToken !== "test") {
        const loginData = localStorage.getItem("loginData");
        if (loginData === null) {
          console.log("nonlogin");
        } else {
          const data: IUser = JSON.parse(loginData);
          dispatch(
            actions.changeUserState({
              nodeId: data.nodeId,
              isLogin: data.isLogin,
              isAdmin: data.isAdmin,
            }),
          );
        }
      }

      useGetAsync(GET_MENU_LIST).then((res) => {
        const menuList: MenuItem[] = res.data.menuList.map(
          (item: ResponseMenuItem) => {
            return {
              pk: item.pk,
              title: item.fields.title,
              categoryId: item.fields.categoryId,
            };
          },
        );

        const categoryList: CategoryItem[] = res.data.categoryList.map(
          (item: ResponseCategoryItem) => {
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
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      <NavBar menuCellList={menuCellList} />
      <div>
        <MenuBar menuCellList={menuCellList} />
        <div className="mx-auto px-4">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
export default wrapper.withRedux(MyApp);
