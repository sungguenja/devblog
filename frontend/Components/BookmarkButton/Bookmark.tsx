interface BookmarkButtonProps {
  bookmarkFunction: VoidFunction;
  isBookmark: boolean;
}

const LikeButton = ({ bookmarkFunction, isBookmark }: BookmarkButtonProps) => {
  return <button onClick={bookmarkFunction}>{String(isBookmark)}</button>;
};

export default LikeButton;
