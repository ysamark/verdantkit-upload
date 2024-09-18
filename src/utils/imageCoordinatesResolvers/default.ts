import { UploadedImageCoordinates } from "~/types";
import { ImageCoordinatesResolverProps } from "~/types/ImageCoordinatesResolverProps";

export const resolveDefault = ({
  destinationSize,
  sourceSize,
}: ImageCoordinatesResolverProps): UploadedImageCoordinates => {
  const imageWidth = destinationSize.width * 0.6;
  const imageHeight = imageWidth / (sourceSize.width / sourceSize.height);

  return {
    width: imageWidth,
    height: imageHeight,
    x: destinationSize.width / 2 - imageWidth / 2,
    y: destinationSize.height / 2 - imageHeight / 2,
  };
};
