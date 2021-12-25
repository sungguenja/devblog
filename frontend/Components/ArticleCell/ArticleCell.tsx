interface ArticleCellProps {
  pk: number;
  title: string;
  content: string;
  menuPk: number;
  githubUrl: string;
  createdAt: Date;
  updatedAt: Date;
  onClick: VoidFunction;
}

const ArticleCell = ({
  pk,
  title,
  content,
  menuPk,
  githubUrl,
  createdAt,
  updatedAt,
  onClick,
}: ArticleCellProps) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
    </div>
  );
};

export default ArticleCell;
