import { UploadClientAdapter } from "@adapters/UploadClientAdapter";
import { Adapters } from "~/adapters";
import { UploadClientAdapterName } from "~/types";

export const uploadClientAdapterFactory = (
  adapterName: UploadClientAdapterName
): UploadClientAdapter => {
  const AdapterConstructor = Adapters[adapterName];

  if (typeof AdapterConstructor === "undefined") {
    throw new Error(`Error: adapter '${adapterName}' does not exist`);
  }

  return new AdapterConstructor();
};
