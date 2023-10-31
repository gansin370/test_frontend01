import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function SelectRoomDirectionView() {
  return <div css={containerCSS}>SelectRoomDirectionView</div>;
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;
