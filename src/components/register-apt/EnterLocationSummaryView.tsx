import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterLocationSummaryView() {
  return <div css={containerCSS}>EnterLocationSummaryView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
