import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { value: string; label: string }[];
}

export default function Select({ options, ...rest }: SelectProps) {
  return (
    <select {...rest} css={selectCSS}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const selectCSS = css`
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  padding: 0 ${getRem(12)};
  margin: 0;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: ${getRem(8)};
  font-size: ${getRem(16)};
`;
