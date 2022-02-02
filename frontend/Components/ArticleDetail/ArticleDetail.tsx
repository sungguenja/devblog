import { article, hastag, comment } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import Comment from "Components/Comment/Comment";
import CopyClipBoardBtn from "Components/CopyClipBoardBtn";
import CommentForm from "Components/CommentForm";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
  commentList: comment[];
  pk: number;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  commentList,
  pk,
}: articleDetailProps) => {
  return (
    <article className="md:mx-[16vw] mx-auto">
      <ArticleMain nowArticle={nowArticle} />
      {hashTagList.map((item) => (
        <HashTag
          hashTagObj={item}
          key={item.pk.toString() + item.fields.title}
        />
      ))}
      {commentList.map((item) => (
        <Comment comment={item} key={item.pk.toString() + item.content} />
      ))}
      <CommentForm pk={pk} />
      <CopyClipBoardBtn />
    </article>
  );
};

export default articleDetail;
