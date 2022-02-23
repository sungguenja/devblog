interface CopyClipBoardProps {
  copyClipBoard: VoidFunction;
}

const CopyClipBoardBtn = ({ copyClipBoard }: CopyClipBoardProps) => {
  return (
    <button
      className="inline-flex items-center h-7 mx-1 px-3 text-indigo-100 transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-800"
      onClick={copyClipBoard}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-3 fill-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
      <span className="hidden 2xl:block">공유</span>
    </button>
  );
};

export default CopyClipBoardBtn;
