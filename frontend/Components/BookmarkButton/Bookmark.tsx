interface BookmarkButtonProps {
  bookmarkFunction: VoidFunction;
  isBookmark: boolean;
}

const LikeButton = ({ bookmarkFunction, isBookmark }: BookmarkButtonProps) => {
  return (
    <button
      className={`inline-flex items-center h-7 mx-1 px-3 text-indigo-100 transition-colors duration-150 ${
        isBookmark ? "bg-indigo-600" : ""
      } rounded-lg focus:shadow-outline hover:bg-indigo-400`}
      onClick={bookmarkFunction}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-3 fill-current"
        viewBox="0 0 20 20"
      >
        <path
          d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        />
      </svg>
      <span>북마크</span>
    </button>
  );
};

export default LikeButton;
