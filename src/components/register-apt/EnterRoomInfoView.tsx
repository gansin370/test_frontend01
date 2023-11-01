import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Input from "../Input";
import Select from "../Select";
import { useRegisterAptStore } from "@/store/register-apt";

export default function EnterRoomInfoView() {
  const {
    roomSize,
    setRoomCount,
    setBathroomCount,
    floor,
    setFloor,
    totalFloor,
    setTotalFloor,
  } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>매물 정보를 입력해주세요.</h2>

      <p css={roomSizeCSS}>
        <label>방 크기 </label>
        <br />
        {`${roomSize}평`}
      </p>

      <div css={rowCSS}>
        <div css={inputWrapperCSS}>
          <label>
            <span>방 개수</span>
            <br />
            <Select
              options={countOptions}
              onChange={(e) => setRoomCount(Number(e.target.value))}
            />
          </label>
        </div>
        <div css={inputWrapperCSS}>
          <label>
            <span>욕실 수</span>
            <br />
            <Select
              options={countOptions}
              onChange={(e) => setBathroomCount(Number(e.target.value))}
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
              value={totalFloor ?? ""}
              onChange={(e) =>
                setTotalFloor(e.target.value ? Number(e.target.value) : null)
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
              value={floor ?? ""}
              onChange={(e) =>
                setFloor(e.target.value ? Number(e.target.value) : null)
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
