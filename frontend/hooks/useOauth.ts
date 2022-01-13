import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// slices
import userSlice from "store/slices/User";

import { BACKEND_URL } from "@constants/Url";

const { actions } = userSlice;

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

export const useGetCSRF = async () => {
  const csrfToken = await axios({
    url: `${BACKEND_URL}/users/csrftoken/asdf`,
    method: "GET",
    withCredentials: true,
  })
    .then((res) => res)
    .catch((e) => e);

  return csrfToken;
};

const useGetAccessToken = async (code: string) => {
  const csrfToken = await useGetCSRF();
  let token = "z";

  if (csrfToken.data.csrf_token === "success") {
    token = useGetCookie("csrftoken");
  }

  return await axios({
    url: `${BACKEND_URL}/users/oauth/`,
    method: "POST",
    headers: {
      "X-CSRFToken": token,
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: {
      code: code,
    },
  })
    .then((res) => {
      console.log(res);
      return camelcaseKeys(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default useGetAccessToken;
