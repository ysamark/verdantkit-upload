import { noEmpty } from "@verdantkit/utils";

import { UploadClientAdapterConfig } from "~/types";

import { upperCaseToCamelCase } from "./upperCaseToCamelCase";

export const getUploadClientConfigFromEnvironmentVariables = () => {
  const re = /^(((REACT|NEXT)_(APP|PUBLIC)_)?(DATA_)?REFUGE_)/;
  const config: UploadClientAdapterConfig = {};

  if (!(typeof process === "object" && typeof process.env === "object")) {
    return config;
  }

  for (const key in process.env) {
    if (
      re.test(key) &&
      noEmpty(key.replace(re, "")) &&
      typeof process.env[key] !== "undefined"
    ) {
      const environmentVariableName = upperCaseToCamelCase(key.replace(re, ""));

      config[environmentVariableName] = process.env[key];
    }
  }

  return config;
};
