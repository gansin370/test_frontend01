import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { Fragment } from "react";
import Input from "../Input";

export enum TransactionType {
  전세 = "전세",
  매매 = "매매",
  월세 = "월세",
}

export default function EnterTransactionTypeView() {
  const {
    transactionType,
    setTransactionType,
    tradingPrice,
    setTradingPrice,
    jeonseDeposit,
    setJeonseDeposit,
    monthlyDeposit,
    setMonthlyDeposit,
    monthlyRent,
    setMonthlyRent,
    monthlyRentDepositAdjustable,
    setMonthlyRentDepositAdjustable,
    depositAdjustableDescription,
    setDepositAdjustableDescription,
  } = useRegisterAptStore();

  const onChangeTransactionType = (type: TransactionType) => {
    if (!transactionType) {
      setTransactionType([type]);
      return;
    }

    if (transactionType.includes(type)) {
      setTransactionType(transactionType.filter((item) => item !== type));
    } else {
      setTransactionType([...transactionType, type]);
    }
  };
  return (
    <div css={containerCSS}>
      <h2>거래 방식을 선택해주세요.</h2>

      <div css={buttonWrapperCSS}>
        <button
          css={buttonCSS(!!transactionType?.includes(TransactionType.매매))}
          onClick={() => onChangeTransactionType(TransactionType.매매)}
        >
          {TransactionType.매매}
        </button>
        {transactionType?.includes(TransactionType.매매) && (
          <div css={inputAreaCSS}>
            <label>
              <span>거래금액</span>
              <div>
                <Input
                  type="number"
                  placeholder="거래금액을 입력해주세요."
                  value={tradingPrice ?? ""}
                  onChange={(e) => {
                    if (e.target.value && Number(e.target.value) > 10000000) {
                      return alert("거래금액은 1000억원 이하로 입력해주세요.");
                    }
                    setTradingPrice(
                      e.target.value ? Number(e.target.value) : null
                    );
                  }}
                />
                <div>만원</div>
              </div>
            </label>
          </div>
        )}

        <div css={buttonWrapperCSS}>
          <button
            css={buttonCSS(!!transactionType?.includes(TransactionType.전세))}
            onClick={() => onChangeTransactionType(TransactionType.전세)}
          >
            {TransactionType.전세}
          </button>
          {transactionType?.includes(TransactionType.전세) && (
            <div css={inputAreaCSS}>
              <label>
                <span>전세 보증금</span>
                <div>
                  <Input
                    type="number"
                    placeholder="전세 보증금을 입력해주세요."
                    value={jeonseDeposit ?? ""}
                    onChange={(e) => {
                      if (e.target.value && Number(e.target.value) > 10000000) {
                        return alert("보증금은 1000억원 이하로 입력해주세요.");
                      }
                      setJeonseDeposit(
                        e.target.value ? Number(e.target.value) : null
                      );
                    }}
                  />
                  <div>만원</div>
                </div>
              </label>
            </div>
          )}
        </div>

        <div css={buttonWrapperCSS}>
          <button
            css={buttonCSS(!!transactionType?.includes(TransactionType.월세))}
            onClick={() => onChangeTransactionType(TransactionType.월세)}
          >
            {TransactionType.월세}
          </button>
          {transactionType?.includes(TransactionType.월세) && (
            <div css={inputAreaCSS}>
              <label>
                <span>보증금</span>
                <div>
                  <Input
                    type="number"
                    placeholder="보증금을 입력해주세요."
                    value={monthlyDeposit ?? ""}
                    onChange={(e) => {
                      if (e.target.value && Number(e.target.value) > 10000000) {
                        return alert("보증금은 1000억원 이하로 입력해주세요.");
                      }
                      setMonthlyDeposit(
                        e.target.value ? Number(e.target.value) : null
                      );
                    }}
                  />
                  <div>만원</div>
                </div>
              </label>
              <label>
                <span>월세</span>
                <div>
                  <Input
                    type="number"
                    placeholder="월세를 입력해주세요."
                    value={monthlyRent ?? ""}
                    onChange={(e) => {
                      if (e.target.value && Number(e.target.value) > 10000) {
                        return alert("월세는 1억원 이하로 입력해주세요.");
                      }
                      setMonthlyRent(
                        e.target.value ? Number(e.target.value) : null
                      );
                    }}
                  />
                  <div>만원</div>
                </div>
              </label>
              <div
                css={adjustableButtonCSS(monthlyRentDepositAdjustable)}
                onClick={() =>
                  setMonthlyRentDepositAdjustable(!monthlyRentDepositAdjustable)
                }
              >
                <span>
                  <span />
                </span>
                월세 보증금 조정 가능 여부
              </div>

              {monthlyRentDepositAdjustable && (
                <label>
                  <span>월세 보증금 조정 설명</span>
                  <Input
                    placeholder="월세 보증금 조정 관련 설명을 입력해주세요."
                    value={depositAdjustableDescription ?? ""}
                    onChange={(e) =>
                      setDepositAdjustableDescription(e.target.value ?? null)
                    }
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
  overflow-y: scroll;
`;

const buttonWrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const buttonCSS = (selected: boolean) => () =>
  css`
    width: 100%;
    height: ${getRem(50)};
    border: 1px solid #e5e5e5;
    border-radius: ${getRem(10)};

    ${selected &&
    "border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none;"}
    background-color: ${selected ? "#00BAF2" : "white"};
    color: ${selected ? "white" : "black"};
    font-size: ${getRem(16)};
    font-weight: 700;
    margin-top: ${getRem(20)};
  `;

const inputAreaCSS = css`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-bottom-left-radius: ${getRem(10)};
  border-bottom-right-radius: ${getRem(10)};
  padding: ${getRem(16)};

  > label {
    span {
      display: block;
      font-size: ${getRem(14)};
      margin-top: ${getRem(16)};
      margin-bottom: ${getRem(8)};
    }

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

const adjustableButtonCSS = (isSelected: boolean) => () =>
  css`
    display: flex;
    align-items: center;
    gap: ${getRem(8)};
    width: 100%;
    margin: ${getRem(20)} 0;
    > span {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${getRem(24)};
      height: ${getRem(24)};
      border-radius: 50%;
      border: 1px solid #e1e1e1;
      background-color: white;
      > span {
        margin: 0;
        width: ${getRem(16)};
        height: ${getRem(16)};
        border-radius: 50%;
        background-color: ${isSelected ? "#00baf2" : "white"};
      }
    }
  `;
