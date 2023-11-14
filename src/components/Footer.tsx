import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";



export default function Footer() {
  return (
    <footer css={footerCSS}>
      <p>샤이닝패스</p>
      <p>서울특별시 강남구 언주로 703 논현동 90-2 </p>
      <p>dydwo6530@naver.com</p>
      <p>이용약관 | 개인정보처리 방침 | 위치기반 서비스 이용약관</p>
      <p>COPYRIGHT 우리의 아파트. ALLRIGHT RESERVED.</p>
    </footer>
  );
}

const footerCSS = css`
  border-top: 1px solid #e5e5e5;
  padding: ${getRem(24)} 0;
  margin-top: ${getRem(24)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${getRem(8)};
  p:nth-of-type(1) {
    font-size: ${getRem(16)};
    font-weight: 700;
  }

  font-size: ${getRem(14)};
`;
