import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "@/styles/globalStyle";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavigationBar />
      <Component {...pageProps} />
      <div id="side-bar" />
    </ThemeProvider>
  );
}
