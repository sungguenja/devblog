import { ChangeEvent, SyntheticEvent, useCallback } from "react";

import { WrittenComment, Comment } from "Interfaces/writing";
import { useCreateComment } from "hooks/useArticleUserActions";

import CommentForm from "./CommentForm";

interface CommentFormProps {
  pk: number;
  isLogin: boolean;
  formFunction?: (event: SyntheticEvent) => void;
  defaultContent?: string;
  defaultNickname?: string;
  handleChangeNickname?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentFormIndex = ({
  pk,
  isLogin,
  formFunction,
  defaultContent,
  defaultNickname,
  handleChangeNickname,
  handleChangeContent,
}: CommentFormProps) => {
  const postCommentWithValue = useCallback(
    (event: SyntheticEvent) => {
      if (formFunction !== undefined) {
        return;
      }
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
    },
    [formFunction],
  );

  return (
    <CommentForm
      postCommentWithValue={formFunction ?? postCommentWithValue}
      isLogin={isLogin}
      defaultContent={defaultContent}
      defaultNickname={defaultNickname}
      handleChangeNickname={handleChangeNickname}
      handleChangeContent={handleChangeContent}
    />
  );
};

export default CommentFormIndex;
