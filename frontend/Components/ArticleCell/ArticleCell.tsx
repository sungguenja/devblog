interface ArticleCellProps {
  pk: number;
  title: string;
  content: string;
  menuPk: number;
  githubUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleCell = ({
  pk,
  title,
  content,
  menuPk,
  githubUrl,
  createdAt,
  updatedAt,
}: ArticleCellProps) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
    </>
  );
};

export default ArticleCell;
