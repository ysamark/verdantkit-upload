import { Nullable, Nullish } from "@verdantkit/utils";

import { isClientSide } from "@utils/isClientSide";
import { ImageSetProps, UploadClientOptions, UploadedImage } from "~/types";

import { log } from "~/utils/log";
import { UploadFileHelper, UploadFilesHelper } from "./types";
import { resolveFormDataObjectWithFileVariants } from "./utils/resolveFormDataObjectWithFileVariants";
import { uploadClientAdapterFactory } from "./utils/uploadClientAdapterFactory";
import { uploadFileToApi } from "./utils/uploadFileToApi";

export class UploadClient {
  /**
   * @var {UploadClientOptions}
   *
   * Default options for the upload client
   *
   */
  private readonly defaultOptions: UploadClientOptions = {
    set: "default",
  };

  constructor(options?: UploadClientOptions) {
    if (options) {
      Object.assign(this.defaultOptions, options);
    }
  }

  private getUploadFileHelperOptions = (
    options: Nullish<UploadClientOptions>
  ): UploadClientOptions => ({
    ...this.defaultOptions,
    ...(options || {}),
  });

  uploadFile: UploadFileHelper = async (file, options?) => {
    const uploadFileOptions = this.getUploadFileHelperOptions(options);

    const formData = await resolveFormDataObjectWithFileVariants(options, {
      file,
      uploadFileOptions,
    });

    const uploadClientAdapter =
      typeof uploadFileOptions.adapter === "string"
        ? uploadClientAdapterFactory(uploadFileOptions.adapter)
        : uploadFileOptions.adapter;

    if (!uploadClientAdapter) {
      log("UploadClient.uploadFile.adapter.error");

      return null;
    }

    const uploadedImageData = !isClientSide()
      ? await uploadClientAdapter.uploadFile(formData)
      : await uploadFileToApi<UploadedImage>(formData);

    if (!uploadedImageData) {
      log("UploadClient.uploadFile.result.error");

      return null;
    }

    return uploadedImageData;
  };

  uploadFiles: UploadFilesHelper = async (files, options?) => {
    files = Array.from(files ?? []);

    const uploadFileOptions = this.getUploadFileHelperOptions(options);

    const formData = await resolveFormDataObjectWithFileVariants(options, {
      files,
      multiple: true,
      uploadFileOptions,
    });

    const uploadClientAdapter =
      typeof uploadFileOptions.adapter === "string"
        ? uploadClientAdapterFactory(uploadFileOptions.adapter)
        : uploadFileOptions.adapter;

    if (!uploadClientAdapter) {
      log("UploadClient.uploadFile.adapter.error");

      return null;
    }

    const uploadedImageData = !isClientSide()
      ? await uploadClientAdapter.uploadFiles(formData)
      : await uploadFileToApi<Array<UploadedImage>>(formData);

    if (!uploadedImageData) {
      log("UploadClient.uploadFile.result.error");

      return null;
    }

    // const response = await request.post<Array<UploadedImage>>({
    //   url: `/static/files/store`,
    //   data: formData,
    // });

    // if (!response) {
    //   throw new Error(
    //     "UploadClient.uploadFile:Error - Could not send image file data to the server"
    //   );
    // }

    // const XClientDeviceId = response.headers["X-Client-Device-Id"];

    // if (noEmpty(XClientDeviceId)) {
    //   setCookie("X-Client-Device-Id", XClientDeviceId, {
    //     "Max-Age": "10y",
    //   });
    // }

    return uploadedImageData;
  };

  getImageSet = async (
    imageSetName: string
  ): Promise<Nullable<ImageSetProps>> => {
    try {
      const uploadClientAdapter =
        typeof this.defaultOptions.adapter === "string"
          ? uploadClientAdapterFactory(this.defaultOptions.adapter)
          : this.defaultOptions.adapter;

      if (uploadClientAdapter) {
        const imageSetData = await uploadClientAdapter.getSet(imageSetName);

        return imageSetData;
      }

      // const response = await request.get<ImageSetProps>({
      //   url: `/static/images/${imageSetName}`,
      // });

      // if (response && "key" in response.data) {
      //   return response.data;
      // }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }

    return null;
  };

  getImageSetOrCreate = async (
    imageSetName: string
  ): Promise<Nullable<ImageSetProps>> => {
    // const response = await request.post<ImageSetProps>({
    //   url: `/static/images/${imageSetName}`,
    // });

    // return response?.data ?? null;
    try {
      const uploadClientAdapter =
        typeof this.defaultOptions.adapter === "string"
          ? uploadClientAdapterFactory(this.defaultOptions.adapter)
          : this.defaultOptions.adapter;

      if (uploadClientAdapter) {
        const imageSetData = await uploadClientAdapter.getSet(imageSetName);

        if (!("id" in imageSetData)) {
          const createdImageSetData = await uploadClientAdapter.createSet(
            imageSetName
          );

          return createdImageSetData;
        }

        return imageSetData;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }

    return null;
  };

  getImageSetKey = async (imageSetName: string): Promise<Nullable<string>> => {
    const imageSet = await this.getImageSetOrCreate(imageSetName);

    return imageSet && "key" in imageSet ? imageSet.key : null;
  };
}
