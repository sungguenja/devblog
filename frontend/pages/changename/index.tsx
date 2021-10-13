import { FormEvent, useEffect, useRef, useState } from "react";
import router from "next/router";

import axios from "axios";

import useGetCookie from "../../hooks/useGetCookie";

import ChangeName from "../../Components/ChangeName/ChangeName";

const index = () => {
  // 밑에 회원정보 수정을 위한 상태 정보 제공
  const [nickname, setNickname] = useState<string>("");
  const csrf_token = useRef<string>("");

  const submitNickname = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    axios({
      url: `http://localhost:8000/users/changename/`,
      method: "PUT",
      headers: {
        "X-CSRFToken": csrf_token.current,
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        nickname: nickname,
      },
    })
      .then((response) => {
        alert("닉네임을 바꿨습니다");
        router.push("/");
      })
      .catch((error) => {
        alert("알 수 없는 이유로 실패했습니다. \n 다시 시도해주세요");
      });
  };

  useEffect(() => {
    csrf_token.current = useGetCookie("csrftoken");
    if (csrf_token.current === "test") {
      alert("로그인 하지 않았습니다");
      router.push("/");
    }
  }, []);

  return (
    <ChangeName
      name={nickname}
      changeNameFunction={setNickname}
      submitNameFunction={submitNickname}
    />
  );
};

export default index;