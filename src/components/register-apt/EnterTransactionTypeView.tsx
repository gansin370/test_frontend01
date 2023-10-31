import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export enum TransactionType {
  전세 = "전세",
  매매 = "매매",
  월세 = "월세",
  단기 = "단기",
}

interface EnterTransactionTypeViewProps {
  transactionType: TransactionType | undefined;
  onChangeTransactionType: (transactionType: TransactionType) => void;
}

export default function EnterTransactionTypeView({
  transactionType,
  onChangeTransactionType,
}: EnterTransactionTypeViewProps) {
  return (
    <div css={containerCSS}>
      <h2>거래 방식을 선택해주세요.</h2>
      <button
        css={buttonCSS(transactionType === TransactionType.전세)}
        onClick={() => onChangeTransactionType(TransactionType.전세)}
      >
        전세
      </button>
      <button
        css={buttonCSS(transactionType === TransactionType.매매)}
        onClick={() => onChangeTransactionType(TransactionType.매매)}
      >
        매매
      </button>
      <button
        css={buttonCSS(transactionType === TransactionType.월세)}
        onClick={() => onChangeTransactionType(TransactionType.월세)}
      >
        월세
      </button>
      <button
        css={buttonCSS(transactionType === TransactionType.단기)}
        onClick={() => onChangeTransactionType(TransactionType.단기)}
      >
        단기
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
