import { generateRandomId, Nullish } from "@verdantkit/utils";

import { ImageSizes, ImageVariant, UploadedImageObjectFit } from "~/types";

import { resolveImageCoordinates } from "./resolveImageCoordinates";

export const generateImageVariant = (
  imageFile: File,
  sizes: ImageSizes,
  imageObjectFit: Nullish<UploadedImageObjectFit> = "contain"
): Promise<ImageVariant> => {
  const canvasElement = document.createElement("canvas");
  const canvasContext = canvasElement.getContext("2d");

  const imageFileUrl = URL.createObjectURL(imageFile);
  const imageElement = new Image(sizes.width, sizes.height);

  imageElement.src = imageFileUrl;

  if (!canvasContext) {
    throw new Error("Could not generate image variant");
  }

  return new Promise((resolve, reject) => {
    imageElement.onload = () => {
      Object.assign(canvasElement, sizes);

      canvasContext.fillStyle = "#ffffff";
      canvasContext.fillRect(0, 0, sizes.width, sizes.height);

      const imageOriginalWidth = imageElement.naturalWidth;
      const imageOriginalHeight = imageElement.naturalHeight;

      const imageCoordinates = resolveImageCoordinates(
        {
          destinationSize: sizes,
          sourceSize: {
            height: imageOriginalHeight,
            width: imageOriginalWidth,
          },
        },
        imageObjectFit || "contain"
      );

      canvasContext.drawImage(
        imageElement,
        imageCoordinates.x,
        imageCoordinates.y,
        imageCoordinates.width,
        imageCoordinates.height
      );

      canvasElement.toBlob((canvasBlob) => {
        if (!canvasBlob) {
          return reject("Could not generate image variant");
        }

        const imageVariantFileObject = new File(
          [canvasBlob],
          `${generateRandomId()}.jpg`,
          {
            lastModified: Date.now(),
            type: "image/jpeg",
          }
        );

        resolve({
          object: imageVariantFileObject,
          url: URL.createObjectURL(canvasBlob),
        });
      }, "image/jpeg");
    };

    imageElement.onerror = () => {
      reject("invalid image file");
    };
  });
};
