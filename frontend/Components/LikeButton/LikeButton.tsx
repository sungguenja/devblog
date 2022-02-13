interface LikeButtonProps {
  likeFunction: VoidFunction;
  isLike: boolean;
}

const LikeButton = ({ likeFunction, isLike }: LikeButtonProps) => {
  return <button onClick={likeFunction}>{String(isLike)}</button>;
};

export default LikeButton;
