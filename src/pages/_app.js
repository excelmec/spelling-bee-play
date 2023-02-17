import "../styles/globals.css";
import UserDetails from "../contexts/UserContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TERD0ELCVE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TERD0ELCVE');
        `}
      </Script>
      <UserDetails>
        <Toaster
          style={{
            fontFamily: "Mulish",
          }}
        />
        <Component {...pageProps} />
      </UserDetails>
    </>
  );
}
