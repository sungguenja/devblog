import { Article, Hastag, Comment } from "Interfaces/writing";
import { IUser } from "store/slices/User/type";

import ArticleMain from "Components/ArticleMain/ArticleMain";
import HashTag from "Components/HashTag/HashTag";
import CommentComponent from "Components/Comment";
import CopyClipBoardBtn from "Components/CopyClipBoardBtn";
import CommentForm from "Components/CommentForm";
import LikeButton from "@components/LikeButton/LikeButton";
import BookmarkButton from "@components/BookmarkButton/Bookmark";

interface ArticleDetailProps {
  nowArticle: Article;
  hashTagList: Hastag[];
  commentList: Comment[];
  putCommentFunctionList: VoidFunction[];
  pk: number;
  userData: IUser;
  isLike: boolean;
  likeFunction: VoidFunction;
  isBookmark: boolean;
  bookmarkFunction: VoidFunction;
}

const articleDetail = ({
  nowArticle,
  hashTagList,
  commentList,
  putCommentFunctionList,
  pk,
  userData,
  isLike,
  likeFunction,
  isBookmark,
  bookmarkFunction,
}: ArticleDetailProps) => {
  return (
    <article className="md:mx-[16vw] mx-auto">
      <ArticleMain nowArticle={nowArticle} />
      <div className="my-2 grid grid-cols-8">
        <div className="col-span-5">
          {hashTagList.map((item) => (
            <HashTag
              hashTagObj={item}
              key={item.pk.toString() + item.fields.title}
            />
          ))}
        </div>
        <LikeButton isLike={isLike} likeFunction={likeFunction} />
        <BookmarkButton
          isBookmark={isBookmark}
          bookmarkFunction={bookmarkFunction}
        />
        <CopyClipBoardBtn />
      </div>
      <div className="my-1">
        {commentList.map((item, index) => (
          <CommentComponent
            comment={item}
            key={item.pk.toString() + item.content}
            isLogin={userData.isLogin}
            nodeId={userData.nodeId}
            putCommentFunction={putCommentFunctionList[index]}
          />
        ))}
      </div>
      <CommentForm pk={pk} isLogin={userData.isLogin} />
    </article>
  );
};

export default articleDetail;
