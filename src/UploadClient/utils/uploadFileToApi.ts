import { Nullish } from "@verdantkit/utils";

import { request } from "@utils/request";

export const uploadFileToApi = async <ResponseDataObject = unknown>(
  formData: FormData
) => {
  const response = await request<Nullish<ResponseDataObject>>({
    url: "/verdant/refuge/files/upload",
    data: formData,
  });

  return response?.data;
};
