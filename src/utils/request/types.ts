import { AxiosRequestConfig } from "axios";

export type DefaultRequestBody = Record<string, unknown> | FormData;

export type RequestProps<
  RequestDataObject extends object = DefaultRequestBody
> = AxiosRequestConfig & {
  method?: "POST" | "GET" | "DELETE" | "OPTIONS" | "PUT" | "HEAD" | "PATCH";
  data?: RequestDataObject;
};
