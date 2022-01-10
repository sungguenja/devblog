import { article } from "Interfaces/writing";

interface articleMainProps {
  nowArticle: article;
}

const articleMain = ({ nowArticle }: articleMainProps) => {
  return (
    <>
      <h1>{nowArticle.fields.title}</h1>
      <h1>{nowArticle.fields.content}</h1>
    </>
  );
};

export default articleMain;
