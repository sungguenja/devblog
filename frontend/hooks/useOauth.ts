import axios, { AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

import { BACKEND_URL } from "@constants/Url";

interface LooseObject {
  [key: string]: any;
}

export const changeCamelCase = (response: AxiosResponse) => {
  let data: LooseObject = {};
  try {
    data = camelcaseKeys(response.data, { deep: true });
  } catch (err) {
    console.log(err);
    data = response.data;
  }
  return {
    ...response,
    data,
  };
};

const oauthAxios = axios.create();
oauthAxios.defaults.withCredentials = true;
oauthAxios.interceptors.response.use(changeCamelCase);

export const useGetCookie = (name: string) => {
  var cookieValue = "test";
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    cookies.forEach((item, index) => {
      var cookie = item.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        return false;
      }
    });
  }

  return cookieValue;
};

// todo protectcode 환경변수화 시키기
export const useGetCSRF = async () => {
  const csrfToken = await oauthAxios({
    url: `${BACKEND_URL}/users/csrftoken/asdf`, // asdf 가 protectcode
    method: "GET",
  });

  return csrfToken;
};

const useGetAccessToken = async (code: string) => {
  const csrfToken = await useGetCSRF();
  let token = "z";

  if (csrfToken.data.csrfToken === "success") {
    token = useGetCookie("csrftoken");
  }

  return await oauthAxios({
    url: `${BACKEND_URL}/users/oauth/`,
    method: "POST",
    headers: {
      "X-CSRFToken": token,
      "Content-Type": "application/json",
    },
    data: {
      code: code,
    },
  });
};

export const useLogout = async () => {
  const csrfToken = await useGetCSRF();
  let token = "z";

  if (csrfToken.data.csrfToken === "success") {
    token = useGetCookie("csrftoken");
  }

  return await oauthAxios({
    url: `${BACKEND_URL}/users/logout`,
    headers: {
      "X-CSRFToken": token,
      "Content-Type": "application/json",
    },
  });
};

// 인증관련이 필요한 요청들
export const usePostAsync = async (
  url: string,
  data: object,
  headers?: object,
) => {
  return await oauthAxios({
    url: url,
    data: data,
    headers: headers,
    method: "POST",
  });
};

export const useDeleteAsync = async (
  url: string,
  data: object,
  headers?: object,
) => {
  return await oauthAxios({
    url: url,
    data: data,
    headers: headers,
    method: "DELETE",
  });
};

export default useGetAccessToken;
