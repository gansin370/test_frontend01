import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterAddressView() {
  return <div css={containerCSS}>EnterAddressView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
