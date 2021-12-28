import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import { GET_ARTICLE_DETAIL_URL } from "@constants/Url";
import { article, hastag, comment, writtenComment } from "Interfaces/writing";

import ArticleDetail from "Components/ArticleDetail/ArticleDetail";

interface response {
  data: {
    article: article;
    hashTagList: hastag[];
    commentList: comment[];
  };
}

const articleDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowArticle, setNowArticle] = useState<article>();
  const [hashTagList, setHashTagList] = useState<hastag[]>([]);
  const [commentList, setCommentList] = useState<comment[]>([]);
  const router = useRouter();
  const { pk } = router.query;

  const setArticleData = (result: response) => {
    setNowArticle(result.data.article);
    setHashTagList(result.data.hashTagList);
    setCommentList(result.data.commentList);
  };

  const getArticleListData = useCallback(async () => {
    const result: response = await useGetAsync(GET_ARTICLE_DETAIL_URL + pk);
    // todo: 가라데이터 넣고 데이터 형태 제대로 따져서 상태 변경
    setArticleData(result);
  }, [pk]);

  const copyClipBoard = useCallback(() => {
    const textarea = document.createElement("textarea");
    textarea.textContent = window.location.href;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }, [pk]);

  const postCommentWithValue = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & writtenComment;
    // todo: 상태관리를 통한 로그인 유저만 푸쉬할 수 있음
    console.log(target.comment.value);
    console.log("????");
  };

  useEffect(() => {
    !pk
      ? null
      : getArticleListData().finally(() => {
          setIsLoading(false);
        });
  }, [pk]);

  if (isLoading) {
    // todo: 디자인....
    return <h1>Loding...</h1>;
  }

  return nowArticle ? (
    // todo: 상태와 해당 댓글 작성자일 경우 댓글 삭제 로직
    <ArticleDetail
      nowArticle={nowArticle}
      hashTagList={hashTagList}
      commentList={commentList}
      copyClipBoard={copyClipBoard}
      postCommentWithValue={postCommentWithValue}
    />
  ) : (
    <h1>null</h1>
  );
};

// todo static
export default articleDetail;
