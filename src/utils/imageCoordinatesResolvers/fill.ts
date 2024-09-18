import { UploadedImageCoordinates } from "~/types";
import { ImageCoordinatesResolverProps } from "~/types/ImageCoordinatesResolverProps";

export const resolveFill = ({
  destinationSize,
}: ImageCoordinatesResolverProps): UploadedImageCoordinates => ({
  ...destinationSize,
  x: 0,
  y: 0,
});
