import { ImageSizes } from "~/types";

export const readImageSize = (imageSize: string): ImageSizes => {
  const imageSizeSlices = imageSize.split(/\s*x\s*/i);

  if (imageSizeSlices.length < 2) {
    const sizeValue = parseInt(imageSizeSlices[0]);

    return {
      height: sizeValue,
      width: sizeValue,
    };
  }

  const [width, height] = imageSizeSlices.map((slice) => parseInt(slice));

  return {
    width,
    height,
  };
};
