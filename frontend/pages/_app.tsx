import { useEffect, useRef, useState } from "react";
import type { AppProps } from "next/app";

// wrapper
import wrapper from "store";

// component
import NavBar from "@components/NavBar/NavBar";
import MenuBar from "@components/MenuBar/MenuBar";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <div id="page">
        <MenuBar />
        <div className="bg-amber-400 mx-[16vw]">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
export default wrapper.withRedux(MyApp);
