import {
  ImageVariant,
  ImageVariantData,
  UploadedImageObjectFit,
} from "~/types";

import { generateImageVariant } from "./generateImageVariant";

export const generateImageVariants = async (
  imageFile: File,
  imageVariantsData: Array<ImageVariantData>,
  imageObjectFit?: UploadedImageObjectFit
): Promise<Array<ImageVariant>> => {
  const imageVariants = await Promise.all(
    imageVariantsData.map((imageVariantData) =>
      generateImageVariant(
        imageFile,
        Object.values(imageVariantData)[0],
        imageObjectFit
      )
    )
  );

  return imageVariants;
};
