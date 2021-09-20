import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Test from '../components/test';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp
