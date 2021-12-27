import { article, hastag, comment } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import Comment from "Components/Comment/Comment";

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
  console.log(commentList);
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
      <button onClick={copyClipBoard}>click</button>
    </article>
  );
};

export default articleDetail;
