import { ReactEventHandler } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import styled from "@emotion/styled";

const StyledNextImage = styled(NextImage)`
  background-size: cover;
  background-position: center;
  visibility: visible;
`;

export const getImageResizeQueryParams = ({
  width,
  height,
  quality,
  format,
}: {
  width: number;
  height?: number;
  quality?: number;
  format?: string;
}): string => {
  const d: string = height ? `${width}x${height}` : `${width}`;
  return new URLSearchParams({
    d,
    q: String(quality || 75),
    f: format || "webp",
  }).toString();
};

export const getImageUri = (src: string, queryParams: string): string => {
  try {
    return `${encodeURI(decodeURI(src))}?${queryParams}`;
  } catch {
    return `${encodeURI(src)}?${queryParams}`;
  }
};

export type ImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => string;

const loader: ImageLoader = (resolverProps) => {
  const { src, width, quality } = resolverProps;
  const optimizedWidth: number = width > 1500 ? Math.floor(width / 2) : width;
  const queryParams = getImageResizeQueryParams({
    width: optimizedWidth,
    quality,
  });
  return getImageUri(src, queryParams);
};

export type ImageProps = { loader?: ImageLoader } & Omit<
  NextImageProps,
  "loader"
>;

const Image = ({
  src,

  onLoad,
  style,
  ...restProps
}: ImageProps): JSX.Element => {
  const _onLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.style.setProperty("background-image", null);
    onLoad?.(event);
  };

  return (
    <StyledNextImage
      style={{ objectFit: "cover", ...style }}
      src={src}
      loader={loader}
      onLoad={_onLoad}
      {...restProps}
    />
  );
};

export default Image;
