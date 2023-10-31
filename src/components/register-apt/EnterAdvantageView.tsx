import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterAdvantageView() {
  return <div css={containerCSS}>EnterAdvantageView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
