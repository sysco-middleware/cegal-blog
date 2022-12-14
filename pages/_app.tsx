import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { PageLayout } from "../components/layout/PageLayout";
import { useEffect } from "react";
import LogRocket from "logrocket";
import { config } from "../shared/config";
import "@cegal/ui-css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      LogRocket.init(config.logRocketProject);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon.png"
          type="image/x-icon"
        />
      </Head>
      <GoogleReCaptchaProvider
        reCaptchaKey={config.reCaptchaKey}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </GoogleReCaptchaProvider>
    </>
  );
}

export default MyApp;
