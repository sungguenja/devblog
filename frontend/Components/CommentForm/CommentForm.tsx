import { SyntheticEvent } from "react";

interface CommentFormProps {
  postCommentWithValue: (event: SyntheticEvent) => void;
}

const CommentForm = ({ postCommentWithValue }: CommentFormProps) => {
  return (
    <form onSubmit={postCommentWithValue}>
      <input name="comment" id="comment"></input>
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
