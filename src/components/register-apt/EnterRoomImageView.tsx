import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterRoomImageView() {
  return <div css={containerCSS}>EnterRoomImageView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
