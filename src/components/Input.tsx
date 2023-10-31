import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Input({ ...rest }: InputProps) {
  return <input {...rest} css={inputCSS} />;
}

const inputCSS = css`
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  padding: 0 ${getRem(12)};
  border-radius: ${getRem(8)};
  font-size: ${getRem(16)};
  margin: 0;
  box-sizing: border-box;
  background-color: transparent;
`;
