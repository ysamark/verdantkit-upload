import { ImageVariantData, UploadedImageSizes } from "~/types";

import { readImageSize } from "./readImageSize";

export const getImageVariantsData = (
  imageSizes?: UploadedImageSizes
): Array<ImageVariantData> => {
  const imageVariantsData: Array<ImageVariantData> = [];

  if (imageSizes instanceof Array) {
    imageSizes.forEach((imageSize) =>
      imageVariantsData.push({
        [imageSize]: readImageSize(imageSize),
      })
    );

    return imageVariantsData;
  }

  for (const key in imageSizes) {
    const imageSize = readImageSize(imageSizes[key]);

    imageVariantsData.push({
      [key]: imageSize,
    });
  }

  return imageVariantsData;
};
