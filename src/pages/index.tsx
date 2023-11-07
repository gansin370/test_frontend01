import { getRem } from "@/styles/commonStyle";
import { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import Interior1 from "public/images/interior1.jpg";
import Interior2 from "public/images/interior2.jpg";

import Intro1 from "public/images/intro1.png";
import Intro2 from "public/images/intro2.png";
import Intro3 from "public/images/intro3.png";
import Intro4 from "public/images/intro4.png";

import Image from "../components/Image";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <div css={containerCSS}>
      <Head>
        <title>우리의 아파트</title>
      </Head>
      <main>
        <div css={titleWrapCSS}>
          <h1 css={titleCSS}>
            아파트 직거래
            <br />
            플랫폼 서비스!
          </h1>
        </div>

        <div css={mobileAndTabletCSS}>
          <div css={mediaContainerCSS}>
            <video css={videoCSS} autoPlay loop muted>
              <source
                src="https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4"
                type="video/mp4"
              />
            </video>
            <div css={descCSS}>PC에서 이용하실 길 추천합니다.</div>
            <div css={imageContainerCSS}>
              <div css={imageWrapCSS(1 / 1)}>
                <Image src={Intro1} alt="사진" fill />
              </div>
              <div css={imageWrapCSS(1 / 0.8)}>
                <Image src={Intro2} alt="사진" fill />
              </div>
              <div
                css={imageWrapCSS(1 / 1.2, 67)}
                style={{ marginLeft: getRem(16) }}
              >
                <Image src={Intro3} alt="사진" fill />
              </div>
              <div css={imageWrapCSS(1 / 0.78)}>
                <Image src={Intro4} alt="사진" fill />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div css={desktopCSS}>
            <div css={mediaContainerCSS}>
              {/* <Image src={Interior1} alt="사진" css={videoCSS} /> */}
              <video css={videoCSS} autoPlay loop muted>
                <source
                  src="https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4"
                  type="video/mp4"
                />
              </video>
              <div css={imageContainerCSS}>
                <div css={imageWrapCSS}>
                  <Image src={Interior1} alt="인테리어 사진" fill />
                </div>
                <div css={imageWrapCSS}>
                  <Image src={Interior2} alt="인테리어 사진" fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const containerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90vh;
`;

const titleWrapCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const titleCSS = (theme: Theme) => css`
  text-align: center;

  br {
    ${theme.media.desktopAndTablet} {
      display: none;
    }
  }
`;

const descCSS = (theme: Theme) => css`
  display: none;
  ${theme.media.mobileAndTablet} {
    display: block;
  }
`;

const mediaContainerCSS = (theme: Theme) => css`
  display: flex;
  gap: ${getRem(24)};
  justify-content: center;

  ${theme.media.mobileAndTablet} {
    flex-direction: column;
  }
`;

const videoCSS = (theme: Theme) => css`
  width: 100vw;

  /* ${theme.media.tablet} {
    width: ${getRem(600)};
  }

  ${theme.media.desktop} {
    width: ${getRem(900)};
  } */

  ${theme.media.desktopAndTablet} {
    width: 60vw;
  }
`;

const imageContainerCSS = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  ${theme.media.desktop} {
    width: 30vw;
  }
`;

const imageWrapCSS =
  (aspectRatio: number, maxWidth?: number) => (theme: Theme) =>
    css`
      position: relative;
      max-width: ${maxWidth ? `${maxWidth}%` : "100%"};
      width: 100%;
      aspect-ratio: ${aspectRatio};

      ${theme.media.desktop} {
        width: 30vw;

        aspect-ratio: 40/25;
      }
    `;

const mobileAndTabletCSS = (theme: Theme) => css`
  display: none;
  ${theme.media.mobileAndTablet} {
    display: block;
  }
`;

const desktopCSS = (theme: Theme) => css`
  display: none;
  ${theme.media.desktop} {
    display: block;
  }
`;
