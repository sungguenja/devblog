import { SyntheticEvent } from "react";

interface CommentFormProps {
  postCommentWithValue: (event: SyntheticEvent) => Promise<void>;
  isLogin: boolean;
}

const CommentForm = ({ postCommentWithValue, isLogin }: CommentFormProps) => {
  return (
    <form onSubmit={postCommentWithValue}>
      <input
        type="text"
        name="nickname"
        id="nickname"
        className={isLogin ? "hidden" : ""}
      />
      <input
        type="password"
        name="password"
        id="password"
        className={isLogin ? "hidden" : ""}
      />
      <br className={isLogin ? "hidden" : ""} />
      <input name="comment" id="comment" />
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
