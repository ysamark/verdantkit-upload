export type UploadedImageSize = `${number}x${number}`;

export type UploadedImageSizes =
  | Array<UploadedImageSize>
  | {
      [key: string]: UploadedImageSize;
    };

export type UploadedImageObjectFit =
  | "contain"
  | "cover"
  | "fill"
  | "scale-down";

export type UploadedImageSet = "default" | string;

export type UploadedImage = {
  id: string;
  alias: string;
  name: string;
  path: string;
  url: string;
  variants: Array<Omit<UploadedImage, "variants">>;
};

export type UploadedImageCoordinates = {
  width: number;
  height: number;
  x: number;
  y: number;
};
