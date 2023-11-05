//
import Layout from "@/components/Layout";
import useInitialize from "@/hook/useInitialize";
import useToken from "@/hook/useToken";
import AxiosProvider from "@/network/AxiosProvider";
import GlobalStyle from "@/styles/globalStyle";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
// CSS 파일들을 추가합니다.

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=2e2b2788f655c9971cf6e4dfd4fbf106&autoload=false`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const { setToken } = useToken();
  useEffect(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJleHAiOjE3MzA3MDk5NDYuMjM3LCJpYXQiOjE2OTkxNzM5NDYuMjM3fQ.-DgWTCQB1Sa7nEz60Ts0gxFGcwfaDcZyEJSLTYSQh2U"
    );
  }, []);
  useInitialize();
  return (
    <AxiosProvider>
      <ThemeProvider theme={theme}>
        <KakaoMap />
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <div id="side-bar" />
        <div id="spinner" />
      </ThemeProvider>
    </AxiosProvider>
  );
}
