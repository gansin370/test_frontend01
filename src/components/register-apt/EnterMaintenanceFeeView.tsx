import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Input from "../Input";
import { useRegisterAptStore } from "@/store/register-apt";

export default function EnterMaintenanceFeeView() {
  const {
    maintenanceFee,
    setMaintenanceFee,
    includeMaintenanceItem,
    setIncludeMaintenanceItem,
    excludeMaintenanceItem,
    setExcludeMaintenanceItem,
    maintenanceDescription,
    setMaintenanceDescription,
  } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>관리비를 입력해주세요.</h2>
      <div css={inputAreaCSS}>
        <label>
          <strong>관리비</strong>
          <div>
            <Input
              type="number"
              placeholder="관리비를 입력해주세요."
              value={maintenanceFee ?? ""}
              onChange={(e) => {
                if (e.target.value && Number(e.target.value) > 10000) {
                  return alert("관리비는 1억원 이하로 입력해주세요.");
                }
                setMaintenanceFee(
                  e.target.value ? Number(e.target.value) : null
                );
              }}
            />
            <div>만원</div>
          </div>
        </label>
      </div>

      <strong>관리비에 포함된 항목</strong>
      <div css={maintenanceListCSS}>
        {includeMaintenanceList.map((item) => (
          <button
            key={`${item}-include`}
            css={buttonCSS(includeMaintenanceItem?.includes(item) ?? false)}
            onClick={() => {
              if (!includeMaintenanceItem) {
                setIncludeMaintenanceItem([item]);
                return;
              }
              if (includeMaintenanceItem.includes(item)) {
                setIncludeMaintenanceItem(
                  includeMaintenanceItem.filter((i) => i !== item)
                );
              } else {
                setIncludeMaintenanceItem([...includeMaintenanceItem, item]);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <strong>관리비에 포함되지 않은 항목</strong>
      <div css={maintenanceListCSS}>
        {excludeMaintenanceList.map((item) => (
          <button
            key={`${item}-exclude`}
            css={buttonCSS(excludeMaintenanceItem?.includes(item) ?? false)}
            onClick={() => {
              if (!excludeMaintenanceItem) {
                setExcludeMaintenanceItem([item]);
                return;
              }
              if (excludeMaintenanceItem.includes(item)) {
                setExcludeMaintenanceItem(
                  excludeMaintenanceItem.filter((i) => i !== item)
                );
              } else {
                setExcludeMaintenanceItem([...excludeMaintenanceItem, item]);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div css={inputAreaCSS}>
        <label>
          <strong>관리비 설명</strong>
          <div>
            <Input
              placeholder="ex) 20만원 정도 나와요."
              value={maintenanceDescription ?? ""}
              onChange={(e) => {
                setMaintenanceDescription(e.target.value);
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
  overflow-y: scroll;

  strong {
    display: block;

    margin-top: ${getRem(16)};
    margin-bottom: ${getRem(8)};
  }
`;

const inputAreaCSS = css`
  margin-top: ${getRem(24)};
  width: 100%;

  > label {
    div {
      position: relative;
      > div {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: ${getRem(16)};
        top: 0;
        height: 100%;
      }
    }
  }
`;

const maintenanceListCSS = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${getRem(8)};
  margin-top: ${getRem(8)};
`;

const buttonCSS = (isSelected: boolean) => () =>
  css`
    border: 1px solid #ddd;
    border-radius: ${getRem(8)};
    padding: ${getRem(8)} ${getRem(12)};
    font-size: ${getRem(12)};
    background-color: white;
    cursor: pointer;
    color: ${isSelected ? "white" : "black"};
    background-color: ${isSelected ? "#00baf2" : "white"};
  `;

const includeMaintenanceList = [
  "수도료",
  "전기료",
  "가스비",
  "인터넷",
  "TV",
  "청소비",
  "주차비",
  "난방비",
  "승강기 유지비",
];

const excludeMaintenanceList = [
  "수도료",
  "전기료",
  "가스비",
  "인터넷",
  "TV",
  "청소비",
  "주차비",
  "난방비",
  "승강기 유지비",
];
