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
}

export interface writtenComment {
  comment: { value: string };
}
