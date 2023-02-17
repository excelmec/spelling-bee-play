import "../styles/globals.css";
import UserDetails from "../contexts/UserContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-TERD0ELCVE"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TERD0ELCVE', {
page_path: window.location.pathname,
});`,
        }}
      />
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
