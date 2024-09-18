import { noEmpty } from "@verdantkit/utils";
import { UploadClientAdapterConfig } from "~/types";

export const loadUploadClientAdapterConfig = <
  AdapterConfig extends UploadClientAdapterConfig = UploadClientAdapterConfig
>(
  config: UploadClientAdapterConfig<AdapterConfig>
): UploadClientAdapterConfig<AdapterConfig> => {
  const environmentVariableRe = /^((env):)/i;

  if (!(typeof process === "object" && typeof process.env === "object")) {
    return config;
  }

  for (const key in config) {
    const value = config[key];

    if (typeof value === "string" && environmentVariableRe.test(value)) {
      const environmentVariableName = value.replace(environmentVariableRe, "");

      if (
        noEmpty(environmentVariableName) &&
        typeof process.env[environmentVariableName] !== "undefined"
      ) {
        const environmentVariableValue = process.env[environmentVariableName];

        config[key] =
          environmentVariableValue as UploadClientAdapterConfig<AdapterConfig>[Extract<
            keyof UploadClientAdapterConfig<AdapterConfig>,
            string
          >];
      }
    }
  }

  return config;
};
