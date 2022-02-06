export interface ArticleField {
  menuPk: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  github: string;
}

export interface Article {
  pk: number;
  fields: ArticleField;
}

export interface HastagField {
  pk: number;
  title: string;
}

export interface Hastag {
  pk: number;
  fields: HastagField;
}

export interface Comment {
  pk: number;
  content: string;
  node: string;
  isAnonymous: boolean;
  nickname: string;
  articlePk: string;
}

export interface WrittenComment {
  comment: { value: string };
  nickname: { value: string };
  password: { value: string };
}

export interface ArticlePageProps {
  nowArticle: Article;
  hashTagList: Hastag[];
}

export interface Response {
  data: ArticlePageProps;
}

export interface CommentListResponse {
  data: {
    commentListJson: Comment[];
  };
}

export interface ArticlePkTitleList {
  data: {
    articleList: ArticlePk[];
  };
}

export interface ArticlePk {
  id: number;
  title: string;
}

export interface PathParams {
  params: {
    pk: string;
  };
}

export interface ResponseMenuItem {
  pk: number;
  fields: {
    title: string;
    categoryId: number;
  };
}

export interface MenuItem {
  title: string;
  pk: number;
  categoryId: number;
}

export interface ResponseCategoryItem {
  pk: number;
  fields: {
    name: string;
  };
}

export interface CategoryItem {
  name: string;
  pk: number;
}

export interface CategoryAndMenu {
  categoryId: number;
  name: string;
  menu: MenuItem[];
}
