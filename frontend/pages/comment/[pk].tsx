import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { WrittenComment, Comment } from "Interfaces/writing";
import {
  useCheckCommentUser,
  useGetCommentData,
  usePutComment,
} from "hooks/useArticleUserActions";
import userSelector from "store/selectors/userSelector";
import CommentFormIndex from "@components/CommentForm";

const commentModify = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentState, setCommentState] = useState<Comment>({
    pk: 0,
    content: "",
    node: "",
    isAnonymous: true,
    nickname: "",
    articlePk: "",
  });
  const [nicknameState, setNicknameState] = useState<string>("");
  const [contentState, setContentState] = useState<string>("");
  const userData = useSelector(userSelector);
  const router = useRouter();
  const { pk } = router.query;

  const getCommentData = useCallback(async () => {
    const result = await useGetCommentData(Number(pk));
    if (result.data.success) {
      if (
        !result.data.nowComment.isAnonymous &&
        (!userData.isLogin || userData.nodeId !== result.data.nowComment.node)
      ) {
        alert("당신의 댓글이 아닙니다");
        router.push({ pathname: "/article/[pk]", query: { pk } });
        return;
      }
      setCommentState(result.data.nowComment);
      setNicknameState(result.data.nowComment.nickname);
      setContentState(result.data.nowComment.content);
      setIsLoading(false);
    }
  }, [pk]);

  const checkAndModifyComment = useCallback(
    async (target: WrittenComment) => {
      try {
        const checkResult = await useCheckCommentUser({
          password: target.password.value,
          pk: Number(pk),
        });
        if (!checkResult.data.success) {
          alert("비밀번호가 틀렸거나 댓글의 유저가 아닙니다");
          return;
        }
        const modifyResult = await usePutComment({
          pk: Number(pk),
          comment: target.comment.value,
          nickname: target.nickname.value,
        });
        if (modifyResult.data.success) {
          alert(modifyResult.data.message);
          const { articlePk } = commentState;
          router.push({ pathname: "/article/[pk]", query: { pk: articlePk } });
        }
      } catch (err: any) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
    [pk, commentState],
  );

  const putComment = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & WrittenComment;
    checkAndModifyComment(target);
  };

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameState(e.target.value);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentState(e.target.value);
  };

  useEffect(() => {
    !pk ? null : getCommentData();
  }, [pk]);

  if (isLoading) {
    // todo: 디자인....
    return <h1>Loding...</h1>;
  }

  return (
    <div className="md:mx-[16vw] mx-auto">
      <CommentFormIndex
        pk={0}
        isLogin={userData.isLogin}
        formFunction={putComment}
        defaultNickname={nicknameState}
        defaultContent={contentState}
        handleChangeNickname={handleChangeNickname}
        handleChangeContent={handleChangeContent}
      />
    </div>
  );
};

export default commentModify;
