import { ChangeEvent, SyntheticEvent } from "react";

import { Comment } from "Interfaces/writing";

interface CommentFormProps {
  postCommentWithValue: (event: SyntheticEvent) => void;
  isLogin: boolean;
  defaultContent?: string;
  defaultNickname?: string;
  handleChangeNickname?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentForm = ({
  postCommentWithValue,
  isLogin,
  defaultContent,
  defaultNickname,
  handleChangeNickname,
  handleChangeContent,
}: CommentFormProps) => {
  return (
    <form onSubmit={postCommentWithValue}>
      <input
        type="text"
        name="nickname"
        id="nickname"
        value={defaultNickname}
        onChange={handleChangeNickname}
        className={isLogin ? "hidden" : ""}
      />
      <input
        type="password"
        name="password"
        id="password"
        className={isLogin ? "hidden" : ""}
      />
      <br className={isLogin ? "hidden" : ""} />
      <textarea
        cols={30}
        name="comment"
        id="comment"
        value={defaultContent}
        onChange={handleChangeContent}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
