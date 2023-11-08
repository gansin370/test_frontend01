import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Input from "../Input";
import { useRegisterAptStore } from "@/store/register-apt";

export default function EnterLocationSummaryView() {
  const { locationSummary, setLocationSummary } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>위치정보를 한줄로 요약해주세요.</h2>
      <Input
        value={locationSummary ?? ""}
        onChange={(e) => setLocationSummary(e.target.value)}
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
