import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import { GET_ARTICLE_LIST_OR_MENU_LIST_URL } from "@constants/Url";
import { article } from "Interfaces/writing";

const articleListWithMenuPk = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articleList, setArticleList] = useState<article[]>([]);
  const router = useRouter();
  const { pk } = router.query;

  const getArticleData = useCallback(async () => {
    const result = await useGetAsync(GET_ARTICLE_LIST_OR_MENU_LIST_URL + pk);
    console.log(result);
    // todo: 가라데이터 넣고 데이터 형태 제대로 따져서 상태 변경
    // setArticleList(result)
  }, []);

  useEffect(() => {
    getArticleData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // todo: 디자인....
    return <h1>Loding...</h1>;
  }

  return <h1>{pk}</h1>;
};

export default articleListWithMenuPk;
