import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useGetAsync } from "hooks/useAsync";
import {
  GET_ARTICLE_DETAIL_URL,
  GET_ARTICLE_PK_LIST,
  GET_COMMENT_LIST,
} from "@constants/Url";
import {
  comment,
  writtenComment,
  ArticlePageProps,
  commentListResponse,
  articlePkTitleList,
  pathParams,
  response,
} from "Interfaces/writing";

import ArticleDetail from "Components/ArticleDetail/ArticleDetail";

const articleDetail = ({ nowArticle, hashTagList }: ArticlePageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentList, setCommentList] = useState<comment[]>([]);
  const isAlreadyCallCommentList = useRef<boolean>(false);
  const pk = nowArticle.pk;

  const getCommentListWithArticlePkWhenScrollMiddle = useCallback(async () => {
    const isMiddle =
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) *
        100 >
      50;
    if (isMiddle && !isAlreadyCallCommentList.current) {
      isAlreadyCallCommentList.current = true;
      const result: commentListResponse = await useGetAsync(
        GET_COMMENT_LIST + pk,
      );
      setCommentList(result.data.commentListJson);
    }
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
    !pk ? null : setIsLoading(false);

    document.addEventListener(
      "scroll",
      getCommentListWithArticlePkWhenScrollMiddle,
    );
    return () =>
      document.removeEventListener(
        "scroll",
        getCommentListWithArticlePkWhenScrollMiddle,
      );
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

export async function getStaticPaths() {
  const response: articlePkTitleList = await useGetAsync(GET_ARTICLE_PK_LIST);
  const paths = response.data.articleList.map((item) => ({
    params: { pk: `${item.id}^${item.title}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: pathParams) {
  const pk = params.pk.split("^")[0];
  const result: response = await useGetAsync(GET_ARTICLE_DETAIL_URL + pk);
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
