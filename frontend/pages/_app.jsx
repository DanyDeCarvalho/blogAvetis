import { AppContextProvider } from "../src/components/AppContext";
import "../styles/globals.css";

function App({ Component, pageProps, ...otherProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
