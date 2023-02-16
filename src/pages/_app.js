import "../styles/globals.css";
import UserDetails from "../contexts/UserContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <UserDetails>
      <Toaster/>
      <Component {...pageProps} />
    </UserDetails>
  );
}
