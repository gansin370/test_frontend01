import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function SelectVideoView() {
  return <div css={containerCSS}>SelectVideoView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
