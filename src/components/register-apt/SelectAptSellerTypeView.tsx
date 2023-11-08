import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export enum AptSellerType {
  TENANT = "세입자",
  HOUSE_OWNER = "집주인",
}

export default function SelectAptSellerTypeView() {
  const { aptSellerType, setAptSellerType } = useRegisterAptStore();

  return (
    <div css={containerCSS}>
      <h2>누가 글을 작성하나요?</h2>

      <button
        onClick={() => setAptSellerType(AptSellerType.TENANT)}
        css={buttonCSS(aptSellerType === AptSellerType.TENANT)}
      >
        세입자
      </button>
      <button
        onClick={() => setAptSellerType(AptSellerType.HOUSE_OWNER)}
        css={buttonCSS(aptSellerType === AptSellerType.HOUSE_OWNER)}
      >
        집주인
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

// #00BAF2
// #0099E6
// #0088D2
// #0077BD
// #0066A9
// #005599

// #7FD3FF
// #99E6FF
// #B3F0FF
// #CCFAFF
// #E6FFFF
// #F5FFFF
