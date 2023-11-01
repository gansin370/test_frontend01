import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export enum Structure {
  타워형 = "타워형",
  편상형 = "편상형",
  복합형 = "복합형",
}

export default function SelectRoomStructureView() {
  const { structure, setStructure } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>아파트 구조를 선택해주세요</h2>
      {Object.values(Structure).map((_structure) => {
        return (
          <button
            key={_structure}
            onClick={() => setStructure(_structure)}
            css={buttonCSS(structure === _structure)}
          >
            {_structure}
          </button>
        );
      })}
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
