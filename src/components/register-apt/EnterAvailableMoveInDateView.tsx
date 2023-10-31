import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterAvailableMoveInDateView() {
  return <div css={containerCSS}>EnterAvailableMoveInDateView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
