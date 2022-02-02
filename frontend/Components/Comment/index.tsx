import { comment } from "Interfaces/writing";

import { POST_COMMENT } from "@constants/Url";

import { useDeleteAsync } from "hooks/useOauth";

import Comment from "./Comment";
import Contactable from "./ContactableComment";
import { useDeleteComment } from "hooks/useArticleUserActions";

interface CommentProps {
  comment: comment;
  isLogin: boolean;
  nodeId: string;
}

const CommentIndex = ({ comment, isLogin, nodeId }: CommentProps) => {
  const deleteFunction = () => {
    if (comment.isAnonymous) {
      const inputCommentPassword = prompt(
        "해당 댓글의 비밀번호를 입력해주세요",
      );
      useDeleteComment({
        pk: comment.pk,
        password: String(inputCommentPassword),
      })
        .then((res) => {
          console.log(res);
          alert("댓글이 삭제되었습니다.");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      if (comment.node !== nodeId) {
        alert("당신의 댓글이 아닙니다!");
        return;
      } else {
        useDeleteComment({
          pk: comment.pk,
          password: comment.node,
        })
          .then((res) => {
            console.log(res);
            alert("댓글이 삭제되었습니다.");
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    }
  };

  const modifyFunction = () => {
    if (comment.isAnonymous) {
      const inputCommentPassword = prompt(
        "해당 댓글의 비밀번호를 입력해주세요",
      );
      // 수정 요청
    } else {
      if (comment.node !== nodeId) {
        alert("당신의 댓글이 아닙니다!");
        return;
      } else {
        // 수정 요청
      }
    }
  };

  if (comment.isAnonymous) {
    return (
      <Contactable
        comment={comment.content}
        deleteFunction={deleteFunction}
        modifyFunction={modifyFunction}
      />
    );
  } else {
    if (isLogin) {
      return comment.node === nodeId ? (
        <Contactable
          comment={comment.content}
          deleteFunction={deleteFunction}
          modifyFunction={modifyFunction}
        />
      ) : (
        <Comment comment={comment.content} />
      );
    } else {
      return <Comment comment={comment.content} />;
    }
  }
};

export default CommentIndex;
