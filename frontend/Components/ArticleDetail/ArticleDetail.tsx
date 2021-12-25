import { article, hastag } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
}

const articleDetail = ({ nowArticle, hashTagList }: articleDetailProps) => {
  return (
    <article>
      <ArticleMain nowArticle={nowArticle} />
      {hashTagList.map((item) => (
        <HashTag hashTagObj={item} />
      ))}
    </article>
  );
};

export default articleDetail;
