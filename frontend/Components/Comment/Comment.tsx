import { comment } from "Interfaces/writing";

interface CommentProps {
  comment: comment;
}

const Comment = ({ comment }: CommentProps) => {
  return <h1>{comment.content}</h1>;
};

export default Comment;
