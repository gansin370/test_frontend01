import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRegisterAptStore } from "@/store/register-apt";
import CLOUD_FRONT_URL from "@/store/cloudfront";

export interface Video {
  title: string;
  url: string;
}

export default function SelectVideoView() {
  const { video, setVideo } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <div css={titleWrapCSS}>
        <h2>메타버스 비디오를 선택해주세요.</h2>
      </div>
      {videoList.map((_video, index) => {
        const isSelected = video?.title === _video.title;
        return (
          <div key={_video.title}>
            <div
              css={videoTitleCSS(index === videoList.length - 1 && !isSelected)}
              onClick={() => {
                if (isSelected) {
                  setVideo(null);
                } else {
                  setVideo(_video);
                }
              }}
            >
              <div>
                <input
                  type="checkbox"
                  css={checkboxCSS}
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setVideo(_video);
                    } else {
                      setVideo(null);
                    }
                  }}
                />
                <span>{_video.title}</span>
              </div>
              <FontAwesomeIcon
                icon={isSelected ? faChevronUp : faChevronDown}
              />
            </div>
            {isSelected && (
              <video
                css={videoCSS}
                autoPlay
                loop
                muted
                src={CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4"} // 비디오 파일의 경로
                playsInline // iOS에서 전체 화면으로 자동 재생을 방지
                preload="auto"
              >
                동영상을 지원하지 않는 브라우저입니다.
              </video>
            )}
          </div>
        );
      })}
    </div>
  );
}

const containerCSS = css`
  overflow-y: scroll;
`;

const titleWrapCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const videoTitleCSS = (isLast: boolean) => () =>
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${getRem(12)} ${getRem(24)};
    border-top: 1px solid #ddd;
    ${isLast ? "border-bottom: 1px solid #ddd;" : ""}

    cursor: pointer;
  `;

const videoCSS = css`
  width: 100%;
  object-fit: cover;
`;

const checkboxCSS = css`
  margin-right: ${getRem(8)};
`;

const videoList: Video[] = [
  {
    title: "A",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
  {
    title: "B",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
  {
    title: "C",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
  {
    title: "D",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
  {
    title: "E",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
  {
    title: "F",
    url: CLOUD_FRONT_URL + "videos/ua_metaverse_spacevideo.mp4",
  },
];
