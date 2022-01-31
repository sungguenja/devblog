import { useCallback } from "react";
import CopyClipBoardBtn from "./CopyClipBoardBtn";

const copyClipBoardBtnIndex = () => {
  const copyClipBoard = useCallback(() => {
    const textarea = document.createElement("textarea");
    textarea.textContent = window.location.href;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }, []);

  return <CopyClipBoardBtn copyClipBoard={copyClipBoard} />;
};

export default copyClipBoardBtnIndex;
