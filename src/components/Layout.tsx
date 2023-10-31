import { PropsWithChildren } from "react";
import NavigationBar from "./NavigationBar";
import { css } from "@emotion/react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div css={containerCSS}>
      <NavigationBar />
      {children}
    </div>
  );
}

const containerCSS = css`
  height: 100%;
  display: flex;

  flex-direction: column;
`;
