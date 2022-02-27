interface CommentProps {
  nickname: string;
  comment: string;
  deleteFunction: VoidFunction;
  modifyFunction: VoidFunction;
}

const Comment = ({
  nickname,
  comment,
  deleteFunction,
  modifyFunction,
}: CommentProps) => {
  return (
    <div className="grid grid-cols-8 my-1">
      <a className="col-span-1" href="#!">
        {nickname}
      </a>
      <a className="col-span-6" href="#!">
        {comment}
      </a>
      <div className="col-span-1 flex justify-end">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold mx-1 px-1 rounded"
          onClick={modifyFunction}
        >
          수정
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-1 rounded"
          onClick={deleteFunction}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default Comment;
