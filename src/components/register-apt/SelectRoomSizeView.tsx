import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

interface SelectRoomSizeViewProps {
  selectedRoomSize: number | undefined;
  onSelectRoomSize: (roomSize: number) => void;
}

export default function SelectRoomSizeView({
  selectedRoomSize,
  onSelectRoomSize,
}: SelectRoomSizeViewProps) {
  return (
    <div css={containerCSS}>
      <h2>매물은 몇 평인가요?</h2>
      <button
        css={buttonCSS(selectedRoomSize === 10)}
        onClick={() => onSelectRoomSize(10)}
      >
        10평대
      </button>
      <button
        css={buttonCSS(selectedRoomSize === 20)}
        onClick={() => onSelectRoomSize(20)}
      >
        20평대
      </button>
      <button
        css={buttonCSS(selectedRoomSize === 30)}
        onClick={() => onSelectRoomSize(30)}
      >
        30평대
      </button>
      <button
        css={buttonCSS(selectedRoomSize === 40)}
        onClick={() => onSelectRoomSize(40)}
      >
        40평대
      </button>
      <button
        css={buttonCSS(selectedRoomSize === 50)}
        onClick={() => onSelectRoomSize(50)}
      >
        50평 이상
      </button>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const buttonCSS = (selected: boolean) => () =>
  css`
    width: 100%;
    height: ${getRem(50)};
    border: 1px solid #e5e5e5;
    border-radius: ${getRem(10)};
    background-color: ${selected ? "#00BAF2" : "white"};
    color: ${selected ? "white" : "black"};
    font-size: ${getRem(16)};
    font-weight: 700;
    margin-top: ${getRem(20)};
  `;
