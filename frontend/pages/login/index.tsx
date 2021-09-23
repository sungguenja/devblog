import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    url: `http://localhost:8000/users/oauth/${code}`,
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
  .then(res => {console.log(res)})
  .catch(e => {console.log(e)})
};

const index = () => {
  const router = useRouter();
  
  const [ loginPropsList, setLoginPropsList ] = useState<Array<LoginProps>>([{
    oauthSite: 'github',
    loginFunction: () => {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    }
  }]);
  
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