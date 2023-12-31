import "@emotion/react";
import theme from "../styles/theme";

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}

declare module "react" {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
