interface LikeButtonProps {
  likeFunction: VoidFunction;
  isLike: boolean;
}

const LikeButton = ({ likeFunction, isLike }: LikeButtonProps) => {
  return (
    <button
      className={`inline-flex items-center h-7 mx-1 px-3 text-indigo-100 transition-colors duration-150 ${
        isLike ? "bg-pink-600" : ""
      } rounded-lg focus:shadow-outline hover:bg-pink-400`}
      onClick={likeFunction}
    >
      <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 20 20">
        <path
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
      <span>좋아요</span>
    </button>
  );
};

export default LikeButton;
