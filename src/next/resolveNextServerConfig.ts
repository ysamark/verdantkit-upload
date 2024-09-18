import { NextServerConfig } from "~/types/NextServerConfig";

import { defaultNextServerConfig } from "./defaultNextServerConfig";

export const resolveNextServerConfig = (): NextServerConfig => {
  const nextServerConfig: NextServerConfig = {
    ...defaultNextServerConfig,
    maxDuration: 3000,
  };

  return nextServerConfig;
};
