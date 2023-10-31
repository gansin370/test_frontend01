import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Input from "../Input";

interface EnterLocationSummaryViewProps {
  locationSummary: string;
  onChangeLocationSummary: (locationSummary: string) => void;
}

export default function EnterLocationSummaryView({
  locationSummary,
  onChangeLocationSummary,
}: EnterLocationSummaryViewProps) {
  return (
    <div css={containerCSS}>
      <h2>위치정보를 한줄로 요약해주세요.</h2>
      <Input
        value={locationSummary}
        onChange={(e) => onChangeLocationSummary(e.target.value)}
        placeholder="강남역 도보 5분"
        css={inputCSS}
      />
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const inputCSS = css`
  margin-top: ${getRem(24)};
  height: ${getRem(41)};
`;
