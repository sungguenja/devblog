interface CopyClipBoardProps {
  copyClipBoard: VoidFunction;
}

const CopyClipBoardBtn = ({ copyClipBoard }: CopyClipBoardProps) => {
  return <button onClick={copyClipBoard}>click</button>;
};

export default CopyClipBoardBtn;
