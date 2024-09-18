import { Nullish } from "@verdantkit/utils";

import { UploadClientOptions } from "~/types";
import { isClientSide } from "~/utils/isClientSide";

import {
  addFileWithVariantsToFormData,
  FormDataFileAdderProps,
} from "./addFileWithVariantsToFormData";

const isValidFormDataObject = (
  formDataObject: unknown
): formDataObject is FormData => {
  return Boolean(
    typeof formDataObject !== "undefined" && formDataObject instanceof FormData
  );
};

export const resolveFormDataObjectWithFileVariants = async (
  options: Nullish<UploadClientOptions>,
  formDataFileAdderProps: FormDataFileAdderProps
): Promise<FormData> => {
  if (!isClientSide()) {
    return isValidFormDataObject(options?.formData)
      ? options.formData
      : new FormData();
  }

  const formData = await addFileWithVariantsToFormData(formDataFileAdderProps);

  return formData;
};
