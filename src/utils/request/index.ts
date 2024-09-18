import { Nullish } from "@verdantkit/utils";
import { AxiosResponse } from "axios";

import { axios } from "@services/axios";

import { RequestProps } from "./types";

export * from "./types";

export const request = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  try {
    const response = await axios.request<ResponseDataObject>(props);

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return null;
  }
};

request.post = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  const response = await request<ResponseDataObject>({
    ...props,
    method: "POST",
  });

  return response;
};

request.get = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  const response = await request<ResponseDataObject>({
    ...props,
    method: "GET",
  });

  return response;
};

request.put = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  const response = await request<ResponseDataObject>({
    ...props,
    method: "PUT",
  });

  return response;
};

request.patch = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  const response = await request<ResponseDataObject>({
    ...props,
    method: "PATCH",
  });

  return response;
};

request.delete = async <ResponseDataObject = unknown>(
  props: RequestProps
): Promise<Nullish<AxiosResponse<ResponseDataObject>>> => {
  const response = await request<ResponseDataObject>({
    ...props,
    method: "DELETE",
  });

  return response;
};
