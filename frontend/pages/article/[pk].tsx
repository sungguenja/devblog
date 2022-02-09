import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useGetAsync } from "hooks/useAsync";
import {
  GET_ARTICLE_DETAIL_URL,
  GET_ARTICLE_PK_LIST,
  GET_COMMENT_LIST,
} from "@constants/Url";
import {
  Comment,
  ArticlePageProps,
  CommentListResponse,
  ArticlePkTitleList,
  PathParams,
  Response,
} from "Interfaces/writing";

import userSelector from "store/selectors/userSelector";

import ArticleDetail from "Components/ArticleDetail/ArticleDetail";
import {
  useDeleteLikeArticle,
  useGetIsLikeArticle,
  usePostLikeArticle,
} from "hooks/useArticleUserActions";

const articleDetail = ({ nowArticle, hashTagList }: ArticlePageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [putCommentFunctionList, setPutCommentFunctionList] = useState<
    VoidFunction[]
  >([]);
  const isAlreadyCallCommentList = useRef<boolean>(false);
  const router = useRouter();
  const userData = useSelector(userSelector);
  const pk = nowArticle.pk;

  const likeFunction = useCallback(async () => {
    if (userData.isLogin) {
      if (isLike) {
        const result = await useDeleteLikeArticle(pk);
        if (result.data.success) {
          setIsLike(false);
        }
      } else {
        const result = await usePostLikeArticle(pk);
        if (result.data.success) {
          setIsLike(true);
        }
      }
    } else {
      const likeList: Array<string> = JSON.parse(
        localStorage.getItem("articleLike") ?? "[]",
      );
      if (isLike) {
        const pkString = pk.toString();
        const result = likeList.filter((item) => item !== pkString);
        localStorage.setItem("articleLike", JSON.stringify(result));
        setIsLike(false);
      } else {
        likeList.push(pk.toString());
        localStorage.setItem("articleLike", JSON.stringify(likeList));
        setIsLike(true);
      }
    }
  }, [isLike, setIsLike, userData]);

  const getCommentListWithArticlePkWhenScrollMiddle = useCallback(async () => {
    const isMiddle =
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) *
        100 >
      50;
    if (isMiddle && !isAlreadyCallCommentList.current) {
      isAlreadyCallCommentList.current = true;
      const result: CommentListResponse = await useGetAsync(
        GET_COMMENT_LIST + pk,
      );
      setCommentList(result.data.commentListJson);
      setPutCommentFunctionList(
        result.data.commentListJson.map((item) => {
          return () => router.push(`/comment/${item.pk}`);
        }),
      );
    }
  }, [pk, setCommentList]);

  const checkUserLikeArticle = useCallback(async () => {
    if (userData.isLogin) {
      const result = await useGetIsLikeArticle(pk);
      console.log(result.data);
      if (result.data.success && result.data.isLike) {
        setIsLike(true);
      }
    } else {
      const likeList: Array<string> = JSON.parse(
        localStorage.getItem("articleLike") ?? "[]",
      );
      if (likeList.length == 0) {
        return;
      }
      const pkString = pk.toString();
      likeList.forEach((item) => {
        if (item === pkString) {
          setIsLike(true);
        }
      });
    }
  }, [pk]);

  useEffect(() => {
    !pk ? null : setIsLoading(false);

    checkUserLikeArticle();
    // todo: scroll => intersection observer
    document.addEventListener(
      "scroll",
      getCommentListWithArticlePkWhenScrollMiddle,
    );
    return () =>
      document.removeEventListener(
        "scroll",
        getCommentListWithArticlePkWhenScrollMiddle,
      );
  }, [pk, setIsLoading, getCommentListWithArticlePkWhenScrollMiddle]);

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
      pk={pk}
      userData={userData}
      putCommentFunctionList={putCommentFunctionList}
      isLike={isLike}
      likeFunction={likeFunction}
    />
  ) : (
    <h1>null</h1>
  );
};

export async function getStaticPaths() {
  const response: ArticlePkTitleList = await useGetAsync(GET_ARTICLE_PK_LIST);
  const paths = response.data.articleList.map((item) => ({
    params: { pk: `${item.id}^${item.title}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: PathParams) {
  const pk = params.pk.split("^")[0];
  const result: Response = await useGetAsync(GET_ARTICLE_DETAIL_URL + pk);
  const nowArticle = result.data.nowArticle;
  const hashTagList = result.data.hashTagList;

  return {
    props: {
      nowArticle,
      hashTagList,
    },
  };
}

export default articleDetail;
