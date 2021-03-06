import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import { GET_ARTICLE_LIST_OR_MENU_LIST_URL } from "@constants/Url";
import { Article } from "Interfaces/writing";

import ArticleListIndex from "@components/ArticleList";

const articleListWithMenuPk = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const router = useRouter();
  const { pk } = router.query;

  const getArticleListData = useCallback(async () => {
    const result = await useGetAsync(GET_ARTICLE_LIST_OR_MENU_LIST_URL + pk);
    console.log(result);
    // todo: 가라데이터 넣고 데이터 형태 제대로 따져서 상태 변경
    setArticleList(result.data);
    setIsLoading(false);
  }, [pk]);

  useEffect(() => {
    !pk ? null : getArticleListData();
  }, [pk]);

  if (isLoading) {
    // todo: 디자인....
    return <h1>Loding...</h1>;
  }

  return <ArticleListIndex articleList={articleList} />;
};

export default articleListWithMenuPk;
