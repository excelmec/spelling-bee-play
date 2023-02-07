import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let index = window.location.href.indexOf("?");
    const searchString = window.location.href.slice(index);
    const urlParams = new URLSearchParams(searchString);
    const refreshToken = urlParams.get("refreshToken");
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (index >= 0) {
      window.open(window.location.href.slice(0, index), "_self");
    }
  }, []);
  return <Component {...pageProps} />;
}
