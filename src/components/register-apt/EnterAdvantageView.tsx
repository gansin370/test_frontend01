import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

const advantageList = [
  { icon: "😎", text: "햇빛이 잘 들어요." },
  { icon: "🚌", text: "교통이 편리해요." },
  { icon: "🏪", text: "주변에 편의시설이 많아요." },
  { icon: "🅿️", text: "주차하기 편해요." },
  { icon: "💸", text: "주변보다 저렴해요." },
  { icon: "🔕", text: "방음이 잘돼요." },
  { icon: "👮‍♀️", text: "혼자 살아도 안전해요." },
  { icon: "🖼️", text: "전망이 좋아요." },
  { icon: "💸", text: "관리비가 저렴해요." },
  { icon: "🧹", text: "집 상태가 깨끗해요." },
  { icon: "🪲", text: "벌레가 없어요." },
];

export default function EnterAdvantageView() {
  const { advantage, setAdvantage } = useRegisterAptStore();
  const handleClickAdvantage = (text: string) => {
    if (!advantage) {
      setAdvantage([text]);
      return;
    }
    if (advantage.length === 3 && !advantage.includes(text)) {
      alert("최대 3개까지 선택 가능합니다.");
      return;
    }
    if (advantage.includes(text)) {
      setAdvantage(advantage.filter((item) => item !== text));
    } else {
      setAdvantage([...advantage, text]);
    }
  };
  return (
    <div css={containerCSS}>
      <h2>이 매물의 장점은 무엇인가요?</h2>
      <p css={descriptionCSS}>최대 3개까지 선택 가능합니다.</p>
      <div css={listWrapCSS}>
        {advantageList.map((_advantage) => (
          <button
            key={_advantage.text}
            css={advantageButtonCSS(!!advantage?.includes(_advantage.text))}
            onClick={() => handleClickAdvantage(_advantage.text)}
          >
            <span>{_advantage.icon}</span>
            <span>{_advantage.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const descriptionCSS = css`
  margin-top: ${getRem(8)};
  margin-bottom: ${getRem(16)};
  font-size: ${getRem(14)};
  color: #828282;
`;

const listWrapCSS = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${getRem(8)};
`;

const advantageButtonCSS = (isSelected: boolean) => () =>
  css`
    display: flex;
    align-items: center;
    width: fit-content;
    padding: ${getRem(8)} ${getRem(16)};
    border: 1px solid #e5e5e5;
    border-radius: ${getRem(20)};
    background-color: ${isSelected ? "#000" : "#fff"};
    font-size: ${getRem(16)};
    color: ${isSelected ? "#fff" : "#4f4f4f"};

    &:not(:last-of-type) {
      margin-bottom: ${getRem(8)};
    }

    span:first-of-type {
      margin-right: ${getRem(8)};
    }
  `;
