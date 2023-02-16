import "../styles/globals.css";
import UserDetails from "../contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserDetails>
      <Component {...pageProps} />
    </UserDetails>
  );
}
