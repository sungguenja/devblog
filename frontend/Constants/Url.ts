import { isDev } from "Helpers/environment";

export const BACKEND_URL = isDev
  ? "http://localhost:8000"
  : "아직 배포 가 안되어있습니다";

export const GET_ARTICLE_LIST_OR_MENU_LIST_URL = `${BACKEND_URL}/writing/menus/`;
export const GET_ARTICLE_DETAIL_URL = `${BACKEND_URL}/writing/article/`;
