interface CommentProps {
  comment: string;
  nickname: string;
}

const Comment = ({ comment, nickname }: CommentProps) => {
  return (
    <div className="grid grid-cols-8 my-1">
      <a className="col-span-1">{nickname}</a>
      <a className="col-span-6">{comment}</a>
    </div>
  );
};

export default Comment;
