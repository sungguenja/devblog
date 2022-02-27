import styles from "./Login.module.css";
import Image from "next/image";
import Head from "next/head";

export interface Props {
  loginPropsList: Array<LoginProps>;
}

const Login = ({ loginPropsList }: Props) => {
  return (
    <article className="flex justify-center items-center h-[100vh] align-center">
      <Head>
        <title>로그인</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loginPropsList.map((item, index) => {
        return (
          <button
            onClick={item.loginFunction}
            className={styles[item.oauthSite] + " my-3"}
            key={item.oauthSite + index.toString()}
          >
            <Image
              src={`/image/${item.oauthSite}.png`}
              width={32}
              height={32}
            />{" "}
            Sign in with {item.oauthSite}
          </button>
        );
      })}
    </article>
  );
};

export default Login;
