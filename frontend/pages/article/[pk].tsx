import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import { GET_ARTICLE_DETAIL_URL } from "@constants/Url";
import { article, hastag, comment } from "Interfaces/writing";

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
    console.log(result);
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
    <ArticleDetail
      nowArticle={nowArticle}
      hashTagList={hashTagList}
      commentList={commentList}
      copyClipBoard={copyClipBoard}
    />
  ) : (
    <h1>null</h1>
  );
};

// todo static
export default articleDetail;
