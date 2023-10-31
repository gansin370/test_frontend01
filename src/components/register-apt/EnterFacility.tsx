import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterFacilityView() {
  return <div css={containerCSS}>EnterFacilityView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
