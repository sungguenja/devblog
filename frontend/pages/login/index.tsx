import { useEffect, useState } from 'react';
import axios from 'axios';
import router from 'next/router';

// custom hook
import useGetCookie from '../../hooks/useGetCookie';

// component
import Login from '../../Components/LoginComponent/Login';
import useGetCSRF from '../../hooks/useGetCSRF';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;

const getAccessToken = async (code:string) => {
  const csrfToken = await useGetCSRF();
  let token = 'z';
  
  if (csrfToken.data.csrf_token === 'success') {
    token = useGetCookie('csrftoken');
  }
  
  axios({
    url: `http://localhost:8000/users/oauth/`,
    method: 'POST',
    headers:{
      "X-CSRFToken": token,
      "Content-Type": "application/json"
    },
    withCredentials: true,
    data: {
      code: code,
    }
  })
  .then(res => {
    if (res.data.success) {
      // context api를 통해서 전역변수로 유저 정보 가져야할듯
      if (res.data.is_login) {
        // 로그인 성공
        console.log(res.data)
        router.push("/");
      } else {
        // 회원가입
        router.push("/changename");
      }
    } else {
      alert('알 수 없는 이유로 로그인이 실패했습니다! 다시 시도해주세요!')
    }
  })
  .catch(e => {console.log(e)})
};

const loginPropsList = [{
  oauthSite: 'github',
  loginFunction: () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  }
}]

const index = () => {
  
  useEffect(()=>{
    if (router.asPath === "/login") {
      return ;
    }

    const code = router.asPath.split('=')[1];
    getAccessToken(code.split('&')[0]);
  },[]);

  return (
    <Login loginPropsList={loginPropsList}/>
  );

};

export default index;