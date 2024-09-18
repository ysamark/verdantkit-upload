import { Nullable } from "@verdantkit/utils";

import { FileDataObject, UploadClientOptions, UploadedImage } from "~/types";

export type UploadFilesHelper = (
  files: Nullable<Array<FileDataObject> | FileList>,
  options?: UploadClientOptions
) => Promise<Nullable<Array<UploadedImage>>>;

export type UploadFileHelper = (
  file: Nullable<FileDataObject>,
  options?: UploadClientOptions
) => Promise<Nullable<UploadedImage>>;
