interface CommentProps {
  comment: string;
}

const Comment = ({ comment }: CommentProps) => {
  return <h1>{comment}</h1>;
};

export default Comment;
