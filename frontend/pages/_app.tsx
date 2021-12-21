import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";

// component
import NavBar from "../Components/NavBar/NavBar";
import MenuBar from "@components/MenuBar/MenuBar";

const DELTA = 15;

function MyApp({ Component, pageProps }: AppProps) {
  const [navBarState, setNavBarState] = useState<boolean>(true);
  const [menuBarState, setMenuBarState] = useState<boolean>(false);

  const lastScroll = useRef<number>(0);

  const scrollEvent = () => {
    const nowScrollTop = document.documentElement.scrollTop;

    if (Math.abs(nowScrollTop - lastScroll.current) < DELTA) return;

    if (nowScrollTop > lastScroll.current) {
      setNavBarState(false);
    } else {
      setNavBarState(true);
    }
    lastScroll.current = nowScrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
  }, []);

  return (
    <>
      <NavBar navBarState={navBarState} setNavBarState={setNavBarState} />
      <div id="page">
        <MenuBar
          menuBarState={menuBarState}
          setMenuBarState={setMenuBarState}
          menuList={[]}
        />
        <div className="flex justify-center">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
export default MyApp;
