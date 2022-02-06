import { POST_COMMENT } from "@constants/Url";

import {
  useDeleteAsync,
  useGetAsync,
  usePostAsync,
  usePutAsync,
} from "./useOauth";
import { useGetCookie, useGetCSRF } from "./useOauth";

interface ICreateCommentData {
  comment: string;
  nickname: string;
  password: string;
  pk: number;
  isLogin: boolean;
}

interface IDeleteCommentData {
  pk: number;
  password: string;
}

interface IPutCommentData {
  pk: number;
  comment: string;
  nickname?: string;
}

const getToken = async () => {
  const csrfToken = await useGetCSRF();
  let token = "";

  if (csrfToken.data.csrfToken === "success") {
    token = useGetCookie("csrftoken");
  }

  return token;
};

export const useCreateComment = async ({
  comment,
  nickname,
  password,
  pk,
  isLogin,
}: ICreateCommentData) => {
  const token = await getToken();

  return await usePostAsync(
    POST_COMMENT,
    {
      comment,
      nickname,
      password,
      pk,
      isLogin,
    },
    {
      "X-CSRFToken": token,
      "Content-Type": "application/json",
    },
  );
};

export const useDeleteComment = async ({
  pk,
  password,
}: IDeleteCommentData) => {
  const token = await getToken();

  return await useDeleteAsync(
    POST_COMMENT,
    {
      pk,
      password,
    },
    { "X-CSRFToken": token, "Content-Type": "application/json" },
  );
};

export const useGetCommentData = async (pk: number) => {
  const token = await getToken();

  return await useGetAsync(
    POST_COMMENT,
    { pk: pk },
    { "X-CSRFToken": token, "Content-Type": "application/json" },
  );
};

export const useCheckCommentUser = async ({
  password,
  pk,
}: IDeleteCommentData) => {
  const token = await getToken();

  return await usePutAsync(
    POST_COMMENT,
    {
      isChecker: true,
      password: password,
      pk: pk,
    },
    { "X-CSRFToken": token, "Content-Type": "application/json" },
  );
};

export const usePutComment = async ({
  pk,
  comment,
  nickname,
}: IPutCommentData) => {
  const token = await getToken();

  return await usePutAsync(
    POST_COMMENT,
    {
      isChecker: false,
      comment: comment,
      pk: pk,
      nickname: nickname,
    },
    { "X-CSRFToken": token, "Content-Type": "application/json" },
  );
};
