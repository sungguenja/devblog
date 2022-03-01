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
  useDeleteBookmarkArticle,
  useDeleteLikeArticle,
  useGetIsLikeArticle,
  usePostBookmarkArticle,
  usePostLikeArticle,
} from "hooks/useArticleUserActions";

const articleDetail = ({ nowArticle, hashTagList }: ArticlePageProps) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [putCommentFunctionList, setPutCommentFunctionList] = useState<
    VoidFunction[]
  >([]);
  const isAlreadyCallCommentList = useRef<boolean>(false);
  const router = useRouter();
  const userData = useSelector(userSelector);
  const { pk } = nowArticle;

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

  const bookmarkFunction = useCallback(async () => {
    if (!userData.isLogin) {
      alert("로그인 시에 북마크 기능 이용 가능합니다");
      return;
    }

    if (isBookmark) {
      const result = await useDeleteBookmarkArticle(pk);
      if (result.data.success) {
        setIsBookmark(false);
      }
    } else {
      const result = await usePostBookmarkArticle(pk);
      if (result.data.success) {
        setIsBookmark(true);
      }
    }
  }, [userData, isBookmark, setIsBookmark]);

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

  const checkUserLikeAndBookmarkThisArticle = useCallback(async () => {
    if (userData.isLogin) {
      setIsLike(false);
      setIsBookmark(false);
      const result = await useGetIsLikeArticle(pk);
      console.log(result.data);
      if (result.data.success) {
        if (result.data.isLike) {
          setIsLike(true);
        }
        if (result.data.isBookmark) {
          setIsBookmark(true);
        }
      }
    } else {
      const likeList: Array<string> = JSON.parse(
        localStorage.getItem("articleLike") ?? "[]",
      );
      if (likeList.length === 0) {
        return;
      }
      const pkString = pk.toString();
      likeList.forEach((item) => {
        if (item === pkString) {
          setIsLike(true);
        }
      });
    }
  }, [pk, userData]);

  useEffect(() => {
    checkUserLikeAndBookmarkThisArticle();
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
  }, [pk, getCommentListWithArticlePkWhenScrollMiddle, userData]);

  return (
    <ArticleDetail
      nowArticle={nowArticle}
      hashTagList={hashTagList}
      commentList={commentList}
      pk={pk}
      userData={userData}
      putCommentFunctionList={putCommentFunctionList}
      isLike={isLike}
      isBookmark={isBookmark}
      likeFunction={likeFunction}
      bookmarkFunction={bookmarkFunction}
    />
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
  const { nowArticle, hashTagList } = result.data;

  return {
    props: {
      nowArticle,
      hashTagList,
    },
  };
}

export default articleDetail;
