import "../../styles/globals.css";
import "antd/dist/antd.css";
import "../components/i18n";
import UserProvider from "../contexts/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
