import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { useState } from "react";

export enum Direction {
  남향 = "남향",
  북향 = "북향",
  동향 = "동향",
  서향 = "서향",
  남동향 = "남동향",
  남서향 = "남서향",
  북동향 = "북동향",
  북서향 = "북서향",
}

export default function SelectRoomDirectionView() {
  const { roomDirection, setRoomDirection } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>매물의 방향을 선택해주세요.</h2>
      <p css={descriptionCSS}>
        거실 베란다 또는 큰 창문의 방향을 기준으로 선택해주세요.
      </p>
      <div css={rowCSS}>
        <button
          css={buttonCSS(roomDirection === Direction.남향)}
          onClick={() => setRoomDirection(Direction.남향)}
        >
          남향
        </button>
        <button
          css={buttonCSS(roomDirection === Direction.동향)}
          onClick={() => setRoomDirection(Direction.동향)}
        >
          동향
        </button>
      </div>
      <div css={rowCSS}>
        <button
          css={buttonCSS(roomDirection === Direction.서향)}
          onClick={() => setRoomDirection(Direction.서향)}
        >
          서향
        </button>
        <button
          css={buttonCSS(roomDirection === Direction.북향)}
          onClick={() => setRoomDirection(Direction.북향)}
        >
          북향
        </button>
      </div>
      <div css={rowCSS}>
        <button
          css={buttonCSS(roomDirection === Direction.남동향)}
          onClick={() => setRoomDirection(Direction.남동향)}
        >
          남동향
        </button>
        <button
          css={buttonCSS(roomDirection === Direction.남서향)}
          onClick={() => setRoomDirection(Direction.남서향)}
        >
          남서향
        </button>
      </div>
      <div css={rowCSS}>
        <button
          css={buttonCSS(roomDirection === Direction.북서향)}
          onClick={() => setRoomDirection(Direction.북서향)}
        >
          북서향
        </button>
        <button
          css={buttonCSS(roomDirection === Direction.북동향)}
          onClick={() => setRoomDirection(Direction.북동향)}
        >
          북동향
        </button>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const descriptionCSS = css`
  margin: ${getRem(20)} 0;
`;

const rowCSS = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const buttonCSS = (selected: boolean) => () =>
  css`
    width: 48%;
    height: ${getRem(50)};
    border: 1px solid #e5e5e5;
    border-radius: ${getRem(10)};
    background-color: ${selected ? "#00BAF2" : "white"};
    color: ${selected ? "white" : "black"};
    font-size: ${getRem(16)};
    font-weight: 700;
    margin-top: ${getRem(20)};
  `;
