import { useEffect, useRef, useState } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

// component
import NavBar from "@components/NavBar/NavBar";
import MenuBar from "@components/MenuBar/MenuBar";

import "../styles/globals.css";

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
    <RecoilRoot>
      <NavBar navBarState={navBarState} setNavBarState={setNavBarState} />
      <div id="page">
        <MenuBar
          menuBarState={menuBarState}
          setMenuBarState={setMenuBarState}
          menuList={[]}
        />
        <div className="bg-amber-400 mx-[16vw]">
          <Component {...pageProps} />
        </div>
      </div>
    </RecoilRoot>
  );
}
export default MyApp;
