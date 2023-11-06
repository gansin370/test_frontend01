import { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="naver-site-verification"
          content="b9c04ab4ed53909c668f340bf02c7774dd4cc12e"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="description" content="우리의 아파트" />
        <meta
          name="keywords"
          content="우리의 아파트, 아파트 직거래, 아파트 매물"
        />
        <meta property="og:title" content="우리의 아파트" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ua-apt.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content="아파트 직거래 플랫폼" />
        <meta
          property="og:image"
          content="https://www.ua-apt.com/_next/static/media/interior1.95a3f50a.jpg?d=960&q=75&f=webp"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
