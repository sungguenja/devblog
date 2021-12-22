import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import { GET_ARTICLE_DETAIL_URL } from "@constants/Url";
import { article, hastag } from "Interfaces/writing";

interface response {
  data: {
    article: article;
    hashTagList: hastag[];
  };
}

const articleListWithMenuPk = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowArticle, setNowArticle] = useState<article>();
  const [hashTagList, setHashTagList] = useState<hastag[]>([]);
  const router = useRouter();
  const { pk } = router.query;

  const getArticleListData = useCallback(async () => {
    const result: response = await useGetAsync(GET_ARTICLE_DETAIL_URL + pk);
    console.log(result);
    // todo: 가라데이터 넣고 데이터 형태 제대로 따져서 상태 변경
    setNowArticle(result.data.article);
    setHashTagList(result.data.hashTagList);
    setIsLoading(false);
  }, [pk]);

  useEffect(() => {
    !pk ? null : getArticleListData();
  }, [pk]);

  if (isLoading) {
    // todo: 디자인....
    return <h1>Loding...</h1>;
  }

  return nowArticle ? (
    <article>
      <h1>{nowArticle.fields.title}</h1>
      <h1>{hashTagList[0].fields.title}</h1>
    </article>
  ) : (
    <h1>null</h1>
  );
};

export default articleListWithMenuPk;
