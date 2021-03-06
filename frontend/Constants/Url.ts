import { PYTHON_BACKEND_URL } from "Helpers/environment";

export const BACKEND_URL = PYTHON_BACKEND_URL;

export const GET_ARTICLE_LIST_OR_MENU_LIST_URL = `${BACKEND_URL}/writing/menus/`;
export const GET_ARTICLE_DETAIL_URL = `${BACKEND_URL}/writing/article/`;
export const GET_ARTICLE_PK_LIST = `${BACKEND_URL}/writing/all-article-pk/`;
export const GET_COMMENT_LIST = `${BACKEND_URL}/writing/comment/`;
export const GET_MENU_LIST = `${BACKEND_URL}/writing/menus/`;
export const POST_COMMENT = `${BACKEND_URL}/writing/comment/`;
export const LIKE_CRUD_URL = `${BACKEND_URL}/writing/like/`;
export const BOOKMARK_CRUD_URL = `${BACKEND_URL}/writing/bookmark/`;
export const CHECK_LIKE_AND_BOOKMARK = `${BACKEND_URL}/writing/likebookmark/`;
export const GET_MAINMENU_PROPS = `${BACKEND_URL}/writing/mainmenu/`;
