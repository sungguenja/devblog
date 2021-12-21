export interface article {
  pk: number;
  menuPk: number;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  github: string;
}

export interface hastag {
  pk: number;
  name: string;
}
