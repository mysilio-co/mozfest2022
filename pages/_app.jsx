import '../styles/globals.css'
import { AuthenticationProvider } from 'swrlit'
import { WebMonetizationProvider } from "../model/utils";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthenticationProvider>
        <WebMonetizationProvider>
          <Component {...pageProps} />
        </WebMonetizationProvider>
      </AuthenticationProvider>
    </>
  );
}

export default MyApp