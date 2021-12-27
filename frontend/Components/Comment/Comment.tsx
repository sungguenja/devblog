import { comment } from "Interfaces/writing";

interface CommentProps {
  comment: comment;
}

const Comment = ({ comment }: CommentProps) => {
  console.log(comment);
  return <h1>{comment.fields.content}</h1>;
};

export default Comment;
