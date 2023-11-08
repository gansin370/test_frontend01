import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Select from "../Select";
import Input from "../Input";
import { useRegisterAptStore } from "@/store/register-apt";

export default function SelectRoomSizeView() {
  const { setBay, roomSize, setRoomSize } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>매물은 몇 평인가요?</h2>

      <div css={selectWrapperCSS}>
        <label>
          <h4>베이</h4>
          <br />
          <Select
            options={bayOptions}
            onChange={(e) => setBay(Number(e.target.value))}
          />
        </label>
      </div>
      <div css={inputWrapperCSS}>
        <label>
          <h4>평수</h4>
          <br />
          <Input
            type="number"
            placeholder="평수를 입력해주세요."
            value={roomSize ?? ""}
            onChange={(e) =>
              setRoomSize(e.target.value ? Number(e.target.value) : null)
            }
          />
        </label>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const selectWrapperCSS = css`
  width: 100%;
  height: ${getRem(50)};
  margin-top: ${getRem(48)};
`;

const inputWrapperCSS = css`
  width: 100%;
  height: ${getRem(50)};
  margin-top: ${getRem(80)};

  input {
    height: ${getRem(50)};
  }
`;

const bayOptions = [
  {
    value: "1",
    label: "1베이",
  },
  {
    value: "2",
    label: "2베이",
  },
  {
    value: "3",
    label: "3베이",
  },
  {
    value: "4",
    label: "4베이",
  },
  {
    value: "5",
    label: "5베이",
  },
];
