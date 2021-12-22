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
