import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function MyPage() {
  return <div css={containerCSS}>마이페이지</div>;
}

const containerCSS = css`
  max-width: ${getRem(500)};
  margin: 0 auto;
  width: 100%;
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: ${getRem(20)};
  overflow: hidden;

  padding: ${getRem(20)} ${getRem(24)};
`;
