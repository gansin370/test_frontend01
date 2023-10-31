import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function ConfirmInfoView() {
  return <div css={containerCSS}>ConfirmInfoView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
