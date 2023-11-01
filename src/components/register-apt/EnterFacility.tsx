import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export enum Facility {
  엘리베이터 = "엘리베이터",
  복층 = "복층",
  옥탑 = "옥탑",
  세탁기 = "세탁기",
  냉장고 = "냉장고",
  에어컨 = "에어컨",
  인덕션 = "인덕션",
  가스레인지 = "가스레인지",
  식기세척기 = "식기세척기",
  전자레인지 = "전자레인지",
}

export default function EnterFacilityView() {
  const { facility, setFacility } = useRegisterAptStore();
  const onClickFacility = (_facility: Facility) => {
    if (!facility) {
      setFacility([_facility]);
      return;
    }
    if (facility.includes(_facility)) {
      setFacility(facility.filter((f) => f !== _facility));
    } else {
      setFacility([...facility, _facility]);
    }
  };
  return (
    <div css={containerCSS}>
      {Object.values(Facility).map((_facility) => {
        return (
          <button
            key={_facility}
            css={buttonCSS(!!facility?.includes(_facility))}
            onClick={() => onClickFacility(_facility)}
          >
            {_facility}
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
