export const TABLET_MIN_BREAK_POINT = 680;
export const DESKTOP_MIN_BREAK_POINT = 920;

export const media = {
  mobile: `@media (max-width: ${TABLET_MIN_BREAK_POINT - 1}px)`,
  tablet: `@media (min-width: ${TABLET_MIN_BREAK_POINT}px) and (max-width: ${
    DESKTOP_MIN_BREAK_POINT - 1
  }px)`,
  desktop: `@media (min-width: ${DESKTOP_MIN_BREAK_POINT}px)`,
  mobileAndDesktop: `@media (max-width: ${
    TABLET_MIN_BREAK_POINT - 1
  }px), (min-width: ${DESKTOP_MIN_BREAK_POINT}px)`,
  desktopAndTablet: `@media (min-width: ${TABLET_MIN_BREAK_POINT}px)`,
  mobileAndTablet: `@media (max-width: ${DESKTOP_MIN_BREAK_POINT - 1}px)`,
};

const theme = {
  media,
};

export default theme;
