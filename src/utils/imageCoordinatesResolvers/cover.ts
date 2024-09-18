import { UploadedImageCoordinates } from "~/types";
import { ImageCoordinatesResolverProps } from "~/types/ImageCoordinatesResolverProps";

export const resolveCover = ({
  destinationSize,
  sourceSize,
}: ImageCoordinatesResolverProps): UploadedImageCoordinates => {
  const imageWidth = destinationSize.width;
  const imageOriginalHeightRelativeToOriginalWidth =
    sourceSize.height / sourceSize.width;
  const imageHeight = imageWidth * imageOriginalHeightRelativeToOriginalWidth;

  return {
    height: imageHeight,
    width: imageWidth,
    x: 0,
    y: destinationSize.width / 2 - imageHeight / 2,
  };
};
