import Layout from "@/components/Layout";
import useInitialize from "@/hook/useInitialize";
import GlobalStyle from "@/styles/globalStyle";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useInitialize();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="side-bar" />
      <div id="spinner" />
    </ThemeProvider>
  );
}
