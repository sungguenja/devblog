import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";

import { writtenComment } from "Interfaces/writing";
import userSelector from "store/selectors/userSelector";
import { useCreateComment } from "hooks/useArticleUserActions";

import CommentForm from "./CommentForm";

interface CommentFormProps {
  pk: number;
}

const CommentFormIndex = ({ pk }: CommentFormProps) => {
  const userData = useSelector(userSelector);
  console.log(userData);

  const postCommentWithValue = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & writtenComment;
    // todo: 상태관리를 통한 로그인 유저만 푸쉬할 수 있음
    console.log(
      target.comment.value,
      target.nickname.value,
      target.password.value,
    );

    const response = await useCreateComment({
      comment: target.comment.value,
      nickname: target.nickname.value,
      password: target.password.value,
      pk: pk,
      isLogin: userData.isLogin,
    });
  };

  return (
    <CommentForm
      postCommentWithValue={postCommentWithValue}
      isLogin={userData.isLogin}
    />
  );
};

export default CommentFormIndex;
