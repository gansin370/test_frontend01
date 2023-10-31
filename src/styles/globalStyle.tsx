import { Global, css } from "@emotion/react";

const globalCSS = css`
  html {
    -webkit-touch-callout: none;
    /* -webkit-user-select: none; */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  #__next {
    height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @font-face {
    font-family: Pretendard;
    src: url("/fonts/Pretendard-Bold.otf");
    font-weight: 700;
  }

  @font-face {
    font-family: Pretendard;
    src: url("/fonts/Pretendard-SemiBold.otf");
    font-weight: 600;
  }

  @font-face {
    font-family: Pretendard;
    src: url("/fonts/Pretendard-Regular.otf");
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: NotoSansCJK-KR, -apple-system, BlinkMacSystemFont, Segoe UI,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
    border: none;
    box-sizing: border-box;
    background-color: transparent;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalCSS} />;
}
