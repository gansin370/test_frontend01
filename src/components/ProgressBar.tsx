import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

interface ProgressBarProps {
  progress: number;
  currentProgress: number;
}

export default function ProgressBar({
  progress,
  currentProgress,
}: ProgressBarProps) {
  return (
    <div css={containerCSS}>
      <div css={progressCSS((currentProgress / progress) * 100)}></div>
    </div>
  );
}

const containerCSS = css`
  height: ${getRem(10)};
  width: 100%;
  background-color: #00baf250;
`;

const progressCSS = (percentage: number) => () =>
  css`
    height: 100%;
    width: ${percentage}%;
    background-color: #00baf2;
    border-top-right-radius: ${getRem(10)};
    border-bottom-right-radius: ${getRem(10)};
  `;
