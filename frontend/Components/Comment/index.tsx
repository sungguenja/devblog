import { Comment } from "Interfaces/writing";

import NotContactableComment from "./Comment";
import Contactable from "./ContactableComment";
import { useDeleteComment } from "hooks/useArticleUserActions";

interface CommentProps {
  comment: Comment;
  putCommentFunction: VoidFunction;
  isLogin: boolean;
  nodeId: string;
}

const CommentIndex = ({
  comment,
  isLogin,
  nodeId,
  putCommentFunction,
}: CommentProps) => {
  const requestDeleteComment = async (pk: number, password: string) => {
    try {
      const response = await useDeleteComment({ pk, password });
      if (response.data.success) {
        alert("댓글이 삭제되었습니다.");
      } else {
        alert(response.data.message);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const deleteFunction = () => {
    if (comment.isAnonymous) {
      const inputCommentPassword = prompt(
        "해당 댓글의 비밀번호를 입력해주세요",
      );
      requestDeleteComment(comment.pk, inputCommentPassword ?? "");
    } else {
      if (comment.node !== nodeId) {
        alert("당신의 댓글이 아닙니다!");
        return;
      } else {
        requestDeleteComment(comment.pk, comment.node);
      }
    }
  };

  if (comment.isAnonymous) {
    return (
      <Contactable
        comment={comment.content}
        deleteFunction={deleteFunction}
        modifyFunction={putCommentFunction}
      />
    );
  } else {
    if (isLogin) {
      return comment.node === nodeId ? (
        <Contactable
          comment={comment.content}
          deleteFunction={deleteFunction}
          modifyFunction={putCommentFunction}
        />
      ) : (
        <NotContactableComment comment={comment.content} />
      );
    } else {
      return <NotContactableComment comment={comment.content} />;
    }
  }
};

export default CommentIndex;
