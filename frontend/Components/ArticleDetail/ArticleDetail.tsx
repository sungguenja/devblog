import { article, hastag, comment } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import Comment from "Components/Comment/Comment";
import CopyClipBoardBtn from "Components/CopyClipBoardBtn/CopyClipBoardBtn";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
  commentList: comment[];
  copyClipBoard: VoidFunction;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  commentList,
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
      {commentList.map((item) => (
        <Comment
          comment={item}
          key={item.pk.toString() + item.fields.content}
        />
      ))}
      <CopyClipBoardBtn copyClipBoard={copyClipBoard} />
    </article>
  );
};

export default articleDetail;
