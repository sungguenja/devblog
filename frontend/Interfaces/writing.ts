export interface articleField {
  menuPk: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  github: string;
}

export interface article {
  pk: number;
  fields: articleField;
}

export interface hastagField {
  pk: number;
  title: string;
}

export interface hastag {
  pk: number;
  fields: hastagField;
}

export interface commentField {
  pk: number;
  content: string;
}

export interface comment {
  pk: number;
  fields: commentField;
  node: string;
}

export interface writtenComment {
  comment: { value: string };
}

export interface ArticlePageProps {
  nowArticle: article;
  hashTagList: hastag[];
}

export interface response {
  data: ArticlePageProps;
}

export interface commentListResponse {
  data: {
    commentListJson: comment[];
  };
}

export interface articlePkTitleList {
  data: {
    articleList: articlePk[];
  };
}

export interface articlePk {
  id: number;
  title: string;
}

export interface pathParams {
  params: {
    pk: string;
  };
}

export interface responseMenuItem {
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

export interface responseCategoryItem {
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
