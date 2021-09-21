import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// component
import Login from '../../Components/LoginComponent/Login';

const secret = null;
const client_id = null;

const getAccessToken = (code:string) => {
  axios({
    url: `http://localhost:8000/users/oauth/${code}`,
    method: 'POST',
    data: {
      client_id:client_id,
      client_secret: secret,
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
    console.log(code.split('&')[0])
    getAccessToken(code.split('&')[0]);
  },[]);

  return (
    <Login loginPropsList={loginPropsList}/>
  );

};

export default index;