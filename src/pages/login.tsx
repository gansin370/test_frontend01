import Image from "@/components/Image";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import KakaoButton from "public/images/kakao-button.png";
import GoogleButton from "public/images/google-button.png";

export default function LoginPage() {
  const handleSocialLogin = (socialType: "kakao" | "google") => () => {
    switch (socialType) {
      case "kakao":
        window.location.href = `${process.env.NEXT_PUBLIC_OUR_APT_SERVER_ROOT_URL}/auth/kakao/login`;
        break;
      case "google":
        window.location.href = `${process.env.NEXT_PUBLIC_OUR_APT_SERVER_ROOT_URL}/auth/google/login`;
        break;
    }
  };
  return (
    <div css={containerCSS}>
      <h2>안녕하세요! 회원가입 할 방법을 선택해주세요.</h2>
      <div>
        <button onClick={handleSocialLogin("kakao")}>
          <Image src={KakaoButton} alt="카카오 로그인" width={250} />
        </button>
        <button onClick={handleSocialLogin("google")}>
          <Image src={GoogleButton} alt="구글 로그인" width={250} />
        </button>
      </div>
    </div>
  );
}

const containerCSS = css`
  max-width: ${getRem(500)};
  margin: 0 auto;
  width: 100%;
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  gap: ${getRem(60)};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${getRem(20)};
  }

  padding-top: ${getRem(80)};
`;
