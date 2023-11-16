import { getRem } from "@/styles/commonStyle";
import { Theme } from "@emotion/react";
import { css } from "@emotion/react";

import MainApartment from "public/images/main.png";

import Intro1 from "public/images/intro1.png";
import Intro2 from "public/images/intro2.png";
import Intro3 from "public/images/intro3.png";
import Intro4 from "public/images/intro4.png";

import Image from "../components/Image";
import Footer from "@/components/Footer";
import Head from "next/head";
import CLOUD_FRONT_URL from "@/store/cloudfront";

export default function Home() {
  return (
    <div css={containerCSS}>
      <Head>
        <title>카카오 로그인 실험</title>
      </Head>
      <main>
        <div css={titleWrapCSS}>
          <h1 css={titleCSS}>
            아파트 직거래 <br />
            플랫폼 서비스!
          </h1>
        </div>

        <div css={mobileAndTabletCSS}>
          <div css={mediaContainerCSS}>
            <div style={{ aspectRatio: 1 / 0.5 }}>
              <video
                css={videoCSS}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source
                  src={
                    "https://d22mbkaaqujaqr.cloudfront.net/videos/pc_homepage_video_01.mp4"
                  }
                  type="video/mp4"
                />
              </video>
            </div>
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
              <div css={desktopImageWrapCSS}>
                <Image src={MainApartment} alt="사진" fill />
              </div>
              <div css={imageContainerCSS}>
                <div style={{ aspectRatio: 1 / 0.5 }}>
                  <video
                    css={videoCSS}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source
                      src={
                        "https://d22mbkaaqujaqr.cloudfront.net/videos/pc_homepage_video_01.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div style={{ aspectRatio: 1 / 0.5 }}>
                  <video
                    css={videoCSS}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source
                      src={
                        "https://d22mbkaaqujaqr.cloudfront.net/videos/pc_homepage_video_02_2bay.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div css={imageRowCSS}>
          <div css={rowImageItemCSS(1 / 1)}>
            <Image src={Intro1} alt="사진" fill />
          </div>
          <div css={rowImageItemCSS(1 / 0.8)}>
            <Image src={Intro2} alt="사진" fill />
          </div>
          <div
            css={rowImageItemCSS(1 / 1.2, 25 * 0.64)}
            style={{ marginLeft: getRem(16) }}
          >
            <Image src={Intro3} alt="사진" fill />
          </div>
          <div css={rowImageItemCSS(1 / 0.78)}>
            <Image src={Intro4} alt="사진" fill />
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
  width: 100%;
  aspect-ratio: 1 / 0.6 ${theme.media.desktop} {
    width: 60vw;
   
  }
`;

const imageContainerCSS = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  ${theme.media.desktop} {
    width: 25vw;
    gap: ${getRem(16)};
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

const imageRowCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${getRem(10)};
  margin-top: ${getRem(25)};
`;

const rowImageItemCSS = (aspectRatio: number, maxWidth?: number) => css`
  position: relative;
  width: ${maxWidth ? maxWidth : 25}%;
  aspect-ratio: ${aspectRatio};
`;

const desktopImageWrapCSS = (theme: Theme) =>
  css`
    position: relative;
    width: 70vw;
  `;

const desktopVideoCSS = (theme: Theme) =>
  css`
    position: relative;

    width: 25vw;
  `;
