import { article, hastag } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
  copyClipBoard: VoidFunction;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  copyClipBoard,
}: articleDetailProps) => {
  return (
    <article>
      <ArticleMain nowArticle={nowArticle} />
      {hashTagList.map((item) => (
        <HashTag
          hashTagObj={item}
          key={item.pk.toString() + item.fields.title}
        />
      ))}
      <button onClick={copyClipBoard}>click</button>
    </article>
  );
};

export default articleDetail;
