import { SyntheticEvent } from "react";

import { WrittenComment } from "Interfaces/writing";
import { useCreateComment } from "hooks/useArticleUserActions";

import CommentForm from "./CommentForm";

interface CommentFormProps {
  pk: number;
  isLogin: boolean;
}

const CommentFormIndex = ({ pk, isLogin }: CommentFormProps) => {
  const postCommentWithValue = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & WrittenComment;
    // todo: 상태관리를 통한 로그인 유저만 푸쉬할 수 있음
    console.log(
      target.comment.value,
      target.nickname.value,
      target.password.value,
    );

    useCreateComment({
      comment: target.comment.value,
      nickname: target.nickname.value,
      password: target.password.value,
      pk: pk,
      isLogin: isLogin,
    })
      .then((res) => {
        console.log(res);
        alert("댓글이 입력되었습니다.");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <CommentForm
      postCommentWithValue={postCommentWithValue}
      isLogin={isLogin}
    />
  );
};

export default CommentFormIndex;
