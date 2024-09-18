import { UploadedImageCoordinates, UploadedImageObjectFit } from "~/types";
import { ImageCoordinatesResolverProps } from "~types/ImageCoordinatesResolverProps";

import { resolveCover } from "./imageCoordinatesResolvers/cover";
import { resolveDefault } from "./imageCoordinatesResolvers/default";
import { resolveFill } from "./imageCoordinatesResolvers/fill";

export const resolveImageCoordinates = (
  props: ImageCoordinatesResolverProps,
  imageObjectFit: UploadedImageObjectFit
): UploadedImageCoordinates => {
  switch (imageObjectFit) {
    case "cover":
      return resolveCover(props);

    case "fill":
      return resolveFill(props);

    default:
      return resolveDefault(props);
  }
};
