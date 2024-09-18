import { Nullish } from "@verdantkit/utils";

import { UploadClientAdapter } from "@adapters/UploadClientAdapter";
import { Adapters } from "~/adapters";

import {
  UploadedImageObjectFit,
  UploadedImageSet,
  UploadedImageSizes,
} from "./UploadedImage";

export * from "./UploadClientAdapter";
export * from "./UploadedImage";

export type UploadClientAdapterName = keyof typeof Adapters;

export type UploadClientOptions = Partial<{
  formData: FormData;
  set: UploadedImageSet;
  sizes: UploadedImageSizes;
  uploadedImageObjectFit: UploadedImageObjectFit;
  adapter: UploadClientAdapter | UploadClientAdapterName;
}>;

export enum UploadClientAction {
  GET_FILE = "action@upload-client/get-file",
  SAVE_FILE = "action@upload-client/save-file",
  UPLOAD_FILE = "action@upload-client/upload-file",
  DELETE_FILE = "action@upload-client/delete-file",
  GET_SET = "action@upload-client/get-set",
  CREATE_SET = "action@upload-client/create-set",
  UPDATE_SET = "action@upload-client/update-set",
  DELETE_SET = "action@upload-client/delete-set",
}

export type ImageSizes = {
  width: number;
  height: number;
};

export type ImageVariantData = {
  [key: string]: ImageSizes;
};

export type ImageVariant = {
  object: File;
  url: string;
};

export type FileDataRefObject = {
  ref: File;
  key: Nullish<string>;
};

export type FileDataObject = File | FileDataRefObject;

export type ImageSetProps = {
  id: number;
  key: string;
  name: string;
};
