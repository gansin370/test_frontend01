import Layout from "@/components/Layout";
import useInitialize from "@/hook/useInitialize";
import GlobalStyle from "@/styles/globalStyle";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=2e2b2788f655c9971cf6e4dfd4fbf106&autoload=false`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  useInitialize();
  return (
    <ThemeProvider theme={theme}>
      <KakaoMap />
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="side-bar" />
      <div id="spinner" />
    </ThemeProvider>
  );
}
