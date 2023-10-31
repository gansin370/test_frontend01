import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Input from "../Input";
import Select from "../Select";

interface EnterRoomInfoViewProps {
  roomSize?: number;
  onChangeRoomCount: (roomCount: number) => void;
  onChangeBathroomCount: (bathroomCount: number) => void;
  totalFloor: number | undefined;
  onChangeTotalFloor: (totalFloor: number | undefined) => void;
  floor: number | undefined;
  onChangeFloor: (floor: number | undefined) => void;
}

export default function EnterRoomInfoView({
  roomSize,
  onChangeRoomCount,
  onChangeBathroomCount,
  totalFloor,
  onChangeTotalFloor,
  floor,
  onChangeFloor,
}: EnterRoomInfoViewProps) {
  return (
    <div css={containerCSS}>
      <h2>매물 정보를 입력해주세요.</h2>

      <p css={roomSizeCSS}>
        <label>방 크기 </label>
        <br />
        {roomSize === 50 ? "50평 이상" : `${roomSize}평대`}
      </p>

      <div css={rowCSS}>
        <div css={inputWrapperCSS}>
          <label>
            <span>방 개수</span>
            <br />
            <Select
              options={countOptions}
              onChange={(e) => onChangeRoomCount(Number(e.target.value))}
            />
          </label>
        </div>
        <div css={inputWrapperCSS}>
          <label>
            <span>욕실 수</span>
            <br />
            <Select
              options={countOptions}
              onChange={(e) => onChangeBathroomCount(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div css={rowCSS}>
        <div css={inputWrapperCSS}>
          <label>
            <span>건물 전체 층</span>
            <Input
              type="number"
              placeholder="건물 전체 층"
              value={totalFloor}
              onChange={(e) =>
                onChangeTotalFloor(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </label>
        </div>
        <div css={inputWrapperCSS}>
          <label>
            <span>층수</span>
            <Input
              type="number"
              placeholder="층수"
              value={floor}
              onChange={(e) =>
                onChangeFloor(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const rowCSS = css`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(48)};
`;

const inputWrapperCSS = css`
  width: 40%;

  span {
    display: inline-block;
    margin-bottom: ${getRem(8)};
    font-size: ${getRem(14)};
  }

  input {
    height: ${getRem(41)};
  }
`;

const roomSizeCSS = css`
  margin-top: ${getRem(24)};
  font-size: ${getRem(20)};

  label {
    font-size: ${getRem(16)};
  }
`;

const countOptions = [
  {
    value: "1",
    label: "1개",
  },
  {
    value: "2",
    label: "2개",
  },
  {
    value: "3",
    label: "3개",
  },
  {
    value: "4",
    label: "4개",
  },
  {
    value: "5",
    label: "5개 이상",
  },
];
