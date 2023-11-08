import { Z_INDEX } from "@/constants/zIndex";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BeatLoader } from "react-spinners";

export default function LoadingSpinner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div css={background}>
      <BeatLoader color="#00baf2" size={25} />
    </div>,
    document.getElementById("spinner") as HTMLElement
  );
}

const background = css`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: ${Z_INDEX.SPINNER};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
