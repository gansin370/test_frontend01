import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterTransactionTypeView() {
  return <div css={containerCSS}>EnterTransactionTypeView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
