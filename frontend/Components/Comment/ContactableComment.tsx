interface CommentProps {
  comment: string;
  deleteFunction: VoidFunction;
  modifyFunction: VoidFunction;
}

const Comment = ({ comment, deleteFunction, modifyFunction }: CommentProps) => {
  return (
    <div className="flex justify-between">
      <h1>{comment}</h1>{" "}
      <div>
        <button onClick={modifyFunction}>수정</button>
        <button onClick={deleteFunction}>삭제</button>
      </div>
    </div>
  );
};

export default Comment;
