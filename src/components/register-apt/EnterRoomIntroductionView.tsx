import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";

export default function EnterRoomIntroductionView() {
  const { roomIntroduction, setRoomIntroduction } = useRegisterAptStore();
  return (
    <div css={containerCSS}>
      <h2>매물에 대한 소개를 적어주세요.</h2>
      <textarea
        value={roomIntroduction ?? ""}
        onChange={(e) => setRoomIntroduction(e.target.value)}
        placeholder="매물의 특징과 장점에 대해 자세하게 적어주세요."
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
  display: block;
  width: 100%;

  min-height: ${getRem(300)};
  border: 1px solid #e5e5e5;
  padding: ${getRem(12)};
  border-radius: ${getRem(8)};
  font-size: ${getRem(16)};

  box-sizing: border-box;
  background-color: transparent;
`;
