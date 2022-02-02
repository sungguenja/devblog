import { POST_COMMENT } from "@constants/Url";

import { useDeleteAsync, usePostAsync } from "./useOauth";
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

export const useCreateComment = async ({
  comment,
  nickname,
  password,
  pk,
  isLogin,
}: ICreateCommentData) => {
  const csrfToken = await useGetCSRF();
  let token = "";

  if (csrfToken.data.csrfToken === "success") {
    token = useGetCookie("csrftoken");
  }

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
  const csrfToken = await useGetCSRF();
  let token = "";

  if (csrfToken.data.csrfToken === "success") {
    token = useGetCookie("csrftoken");
  }

  return await useDeleteAsync(
    POST_COMMENT,
    {
      pk,
      password,
    },
    { "X-CSRFToken": token, "Content-Type": "application/json" },
  );
};
