import { POST_COMMENT } from "@constants/Url";

import { usePostAsync } from "./useOauth";
import { useGetCookie, useGetCSRF } from "./useOauth";

interface ICreateCommentData {
  comment: string;
  nickname: string;
  password: string;
  pk: number;
  isLogin: boolean;
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

  const response = await usePostAsync(
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
  )
    .then((res) => res)
    .catch((err) => err);

  console.log(response);
};
