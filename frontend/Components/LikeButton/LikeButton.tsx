interface LikeButtonProps {
  likeFunction: VoidFunction;
  isLike: boolean;
}

const LikeButton = ({ likeFunction, isLike }: LikeButtonProps) => {
  console.log(isLike);
  return <button onClick={likeFunction}>{String(isLike)}</button>;
};

export default LikeButton;
