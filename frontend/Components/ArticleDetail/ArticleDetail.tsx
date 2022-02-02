import { article, hastag, comment } from "Interfaces/writing";
import { IUser } from "store/slices/User/type";

import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import Comment from "Components/Comment";
import CopyClipBoardBtn from "Components/CopyClipBoardBtn";
import CommentForm from "Components/CommentForm";

interface articleDetailProps {
  nowArticle: article;
  hashTagList: hastag[];
  commentList: comment[];
  pk: number;
  userData: IUser;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  commentList,
  pk,
  userData,
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
        <Comment
          comment={item}
          key={item.pk.toString() + item.content}
          isLogin={userData.isLogin}
          nodeId={userData.nodeId}
        />
      ))}
      <CommentForm pk={pk} isLogin={userData.isLogin} />
      <CopyClipBoardBtn />
    </article>
  );
};

export default articleDetail;
