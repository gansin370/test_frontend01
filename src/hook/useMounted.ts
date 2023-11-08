import { useEffect, useState } from "react";

/**
 * next js 에서는 서버사이드 렌더링을 하기 때문에 클라이언트 사이드인지 구분하기 위해 사용
 * mounted가 true면 클라이언트 사이드라는 뜻
 */
export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
