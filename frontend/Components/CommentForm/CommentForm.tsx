import { ChangeEvent, SyntheticEvent } from "react";

import style from "./CommentForm.module.css";

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
      <div className="grid grid-cols-4 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className={`form-control 
            block 
            w-full 
            px-3 
            py-1.5 
            text-base 
            font-normal 
            text-gray-700 
            bg-white bg-clip-padding 
            border border-solid border-gray-300 
            rounded 
            transition 
            ease-in-out 
            m-0 
            focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none ${
              isLogin ? "hidden" : ""
            }`}
            name="nickname"
            id="nickname"
            value={defaultNickname}
            onChange={handleChangeNickname}
            aria-describedby="nickname"
            placeholder="닉네임"
          />
        </div>
        <div className="form-group mb-6">
          <input
            className={`form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none ${
            isLogin ? "hidden" : ""
          } `}
            type="password"
            name="password"
            id="password"
            aria-describedby="password"
            placeholder="비밀번호"
          />
        </div>
      </div>
      <div className="form-group mb-6">
        <textarea
          className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
          cols={20}
          name="comment"
          id="comment"
          value={defaultContent}
          onChange={handleChangeContent}
          placeholder="댓글을 입력해주세요"
        />
      </div>
      <button
        type="submit"
        className={`
      w-full
      px-6
      py-2.5
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-mdactive:shadow-lg
      transition
      duration-150
      ease-in-out ${style.submitButton}`}
      >
        댓글 작성
      </button>
    </form>
  );
};

export default CommentForm;
