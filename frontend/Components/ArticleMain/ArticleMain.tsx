import { Article } from "Interfaces/writing";

interface ArticleMainProps {
  nowArticle: Article;
}

const articleMain = ({ nowArticle }: ArticleMainProps) => {
  return (
    <>
      <h1>{nowArticle.fields.title}</h1>
      <h1>{nowArticle.fields.content}</h1>
    </>
  );
};

export default articleMain;
