import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

interface EnterExtraInfoViewProps {
  loan: ExtraInfoSelectOption;
  onChangeLoan: (loan: ExtraInfoSelectOption) => void;
  pet: ExtraInfoSelectOption;
  onChangePet: (pet: ExtraInfoSelectOption) => void;
  parking: ExtraInfoSelectOption;
  onChangeParking: (parking: ExtraInfoSelectOption) => void;
}

export default function EnterExtraInfoView({
  loan,
  onChangeLoan,
  pet,
  onChangePet,
  parking,
  onChangeParking,
}: EnterExtraInfoViewProps) {
  return (
    <div css={containerCSS}>
      <h2>다음 항목이 가능한지 알려주세요</h2>
      <h4 css={labelCSS}>대출</h4>
      <ExtraInfoSelectBox selectedOption={loan} onChangeOption={onChangeLoan} />
      <h4 css={labelCSS}>반려동물</h4>
      <ExtraInfoSelectBox selectedOption={pet} onChangeOption={onChangePet} />
      <h4 css={labelCSS}>주차</h4>
      <ExtraInfoSelectBox
        selectedOption={parking}
        onChangeOption={onChangeParking}
      />
    </div>
  );
}

export enum ExtraInfoSelectOption {
  AVAILABLE = "가능",
  UNAVAILABLE = "불가능",
  CHECK_REQUIRED = "확인필요",
}

interface ExtraInfoSelectBoxProps {
  selectedOption: ExtraInfoSelectOption;
  onChangeOption: (option: ExtraInfoSelectOption) => void;
}

function ExtraInfoSelectBox({
  selectedOption,
  onChangeOption,
}: ExtraInfoSelectBoxProps) {
  return (
    <div css={selectBoxCSS}>
      {Object.values(ExtraInfoSelectOption).map((option) => {
        return (
          <div
            key={option}
            css={selectButtonCSS(option === selectedOption)}
            onClick={() => onChangeOption(option)}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const labelCSS = css`
  margin-top: ${getRem(24)};
  margin-bottom: ${getRem(8)};
`;

const selectBoxCSS = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: ${getRem(4)};
  overflow: hidden;
  border: 1px solid #e5e5e5;
`;

const selectButtonCSS = (isSelected: boolean) => () =>
  css`
    background-color: ${isSelected ? "#222" : "#fff"};
    color: ${isSelected ? "#fff" : "#222"};
    padding: ${getRem(8)} ${getRem(16)};
    text-align: center;
    cursor: pointer;
  `;
