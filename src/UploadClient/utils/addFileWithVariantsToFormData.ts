import {
  convertImageFileToJpeg,
  noEmpty,
  Nullable,
  Nullish,
} from "@verdantkit/utils";

import { generateImageVariants } from "@utils/generateImageVariants";
import { getImageVariantsData } from "@utils/getImageVariantsData";
import { FileDataObject, UploadClientOptions } from "~/types";

export type FormDataFileAdderPropsWithSingleFile = {
  file: Nullable<FileDataObject>;
  multiple?: false;
};

export type FormDataFileAdderPropsWithMultipleFile = {
  files: Nullable<Array<FileDataObject>>;
  multiple: true;
};

export type FormDataFileAdderProps = (
  | FormDataFileAdderPropsWithSingleFile
  | FormDataFileAdderPropsWithMultipleFile
) & {
  formData?: Nullish<FormData>;
  uploadFileOptions: UploadClientOptions;
};

export const addFileWithVariantsToFormData = async ({
  formData,
  uploadFileOptions,
  ...options
}: FormDataFileAdderProps): Promise<FormData> => {
  let files: Array<FileDataObject> = [];

  if ("file" in options && options.file) {
    files = [options.file];
  }

  if ("files" in options && options.files instanceof Array) {
    files = options.files;
  }

  formData = formData instanceof FormData ? formData : new FormData();

  /**
   * @var number
   *
   * Upload file index
   */
  let uploadFileIndex = 0;

  for (const fileDataObject of files) {
    const file = await convertImageFileToJpeg(
      fileDataObject instanceof File ? fileDataObject : fileDataObject.ref
    );

    if (!(file instanceof File)) {
      continue;
    }

    const multiple = Boolean(
      typeof options.multiple === "boolean" && options.multiple
    );

    const fileFormDataPrefix = !multiple
      ? "file"
      : `files[${uploadFileIndex++}]`;

    formData.append(`${fileFormDataPrefix}[name]`, file);
    formData.append(`${fileFormDataPrefix}[originalFileName]`, file.name);

    if (!(fileDataObject instanceof File) && noEmpty(fileDataObject.key)) {
      formData.append(`${fileFormDataPrefix}[key]`, fileDataObject.key);
    }

    if (
      !(fileDataObject instanceof File) &&
      "id" in fileDataObject &&
      noEmpty(fileDataObject.id)
    ) {
      formData.append(`${fileFormDataPrefix}[id]`, fileDataObject.id);
    }

    formData.append(`${fileFormDataPrefix}[alias]`, "default");
    formData.append(
      `${fileFormDataPrefix}[set]`,
      uploadFileOptions.set || "default"
    );

    const imageVariantsData = getImageVariantsData(uploadFileOptions.sizes);

    const imageVariants = await generateImageVariants(
      file,
      imageVariantsData,
      uploadFileOptions.uploadedImageObjectFit
    );

    imageVariantsData.forEach((imageVariantData, imageVariantDataIndex) => {
      const imageVariant = imageVariants[imageVariantDataIndex];

      const addVariantToFormData = (
        fieldName: string,
        fieldValue: string | Blob
      ): void => {
        formData.append(
          `${fileFormDataPrefix}[variants][${imageVariantDataIndex}][${fieldName}]`,
          fieldValue
        );
      };

      const imageVariantAlias = String(Object.keys(imageVariantData)[0]);

      addVariantToFormData("name", imageVariant.object);
      addVariantToFormData("alias", imageVariantAlias);
      addVariantToFormData("set", uploadFileOptions.set || "default");
    });
  }

  return formData;
};
