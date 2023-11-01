import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRegisterAptStore } from "@/store/register-apt";

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
              <video css={videoCSS} autoPlay loop muted>
                <source src={video.url} type="video/mp4" />
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
    title: "10평형",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
  {
    title: "20평형",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
  {
    title: "30평형",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
  {
    title: "40평형",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
  {
    title: "50평형",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
  {
    title: "쩌는 집",
    url: "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uaVideo_01.1.mp4",
  },
];
