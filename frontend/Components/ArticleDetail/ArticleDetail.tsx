import { SyntheticEvent } from "react";

import { article, hastag, comment } from "Interfaces/writing";
import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import Comment from "Components/Comment/Comment";
import CopyClipBoardBtn from "Components/CopyClipBoardBtn/CopyClipBoardBtn";
import CommentForm from "Components/CommentForm/CommentForm";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
  commentList: comment[];
  copyClipBoard: VoidFunction;
  postCommentWithValue: (event: SyntheticEvent) => void;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  commentList,
  copyClipBoard,
  postCommentWithValue,
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
      <CommentForm postCommentWithValue={postCommentWithValue} />
      <CopyClipBoardBtn copyClipBoard={copyClipBoard} />
    </article>
  );
};

export default articleDetail;
