import { getRem } from "@/styles/commonStyle";
import { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import Interior1 from "public/images/interior1.jpg";
import Interior2 from "public/images/interior2.jpg";
import Image from "../components/Image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div css={containerCSS}>
      <main>
        <div css={titleWrapCSS}>
          <h1 css={titleCSS}>
            아파트 직거래
            <br />
            플랫폼 서비스!
          </h1>
        </div>

        <div css={mediaContainerCSS}>
          <video css={videoCSS} autoPlay loop muted>
            <source
              src="https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4"
              type="video/mp4"
            />
          </video>
          <div css={descCSS}>PC에서 이용하실 길 추천합니다.</div>
          <div css={imageContainerCSS}>
            <div css={imageWrapCSS}>
              <Image src={Interior1} alt="인테리어 사진" fill />
            </div>
            <div css={imageWrapCSS}>
              <Image src={Interior2} alt="인테리어 사진" fill />
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

const descCSS = css`
  margin-top: ${getRem(20)};
  font-size: ${getRem(12)};
  color: #3d3d3d;
  text-align: center;
`;

const mediaContainerCSS = (theme: Theme) => css`
  display: flex;
  gap: ${getRem(24)};
  justify-content: center;

  ${theme.media.mobile} {
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

const imageContainerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const imageWrapCSS = (theme: Theme) => css`
  width: 100vw;
  position: relative;
  aspect-ratio: 40/25;

  margin: ${getRem(20)} 0;

  ${theme.media.desktopAndTablet} {
    width: 25vw;
    margin: 0;
  }
`;
