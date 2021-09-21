import styles from './Login.module.css';
import Image from 'next/image';

interface props {
  loginPropsList: Array<LoginProps>
}

const Login = ({loginPropsList}:props) => {
  
  return (
    <article className={styles.container}>
      {loginPropsList.map((item,index) => {
        return (
          <button onClick={item.loginFunction} className={styles[item.oauthSite]} key={item.oauthSite + index.toString()}><Image src={`/image/${item.oauthSite}.png`} width={32} height={32} /> Sign in with {item.oauthSite}</button>
        );
      })}
    </article>
  );
};

export default Login;