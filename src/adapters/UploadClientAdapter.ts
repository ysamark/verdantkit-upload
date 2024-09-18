import { Nullish } from "@verdantkit/utils";
import { z } from "zod";

import { ImageSetProps, UploadedImage } from "~/types";
import { getUploadClientConfigFromEnvironmentVariables } from "~/utils/getUploadClientConfigFromEnvironmentVariables";
import { loadUploadClientAdapterConfig } from "~/utils/loadUploadClientAdapterConfig";
import {
  DefaultAdapterConfig,
  UploadClientAdapterConfig,
} from "~types/UploadClientAdapter";

export type DefaultResponseDataObject = Record<string, unknown>;

export abstract class UploadClientAdapter<
  AdapterConfig extends DefaultAdapterConfig = DefaultAdapterConfig
> {
  /**
   *
   * @param config
   */
  protected config: UploadClientAdapterConfig<AdapterConfig>;

  constructor(config?: UploadClientAdapterConfig<AdapterConfig>) {
    this.config = {
      ...getUploadClientConfigFromEnvironmentVariables(),
      ...loadUploadClientAdapterConfig(
        config || ({} as UploadClientAdapterConfig<AdapterConfig>)
      ),
    };
  }

  abstract uploadFile(formData: FormData): Promise<Nullish<UploadedImage>>;
  abstract uploadFiles(
    formData: FormData
  ): Promise<Nullish<Array<UploadedImage>>>;
  abstract deleteFile(fileId: string): Promise<void>;
  abstract getFile(fileId: string): Promise<Nullish<UploadedImage>>;
  abstract saveFile(fileId: string): Promise<void>;

  abstract getSet(setName: string): Promise<ImageSetProps>;
  abstract createSet(setName: string): Promise<ImageSetProps>;
  abstract updateSet(
    setOldName: string,
    setNewName: string
  ): Promise<ImageSetProps>;
  abstract deleteSet(setName: string): Promise<void>;

  /**
   *
   * Read and validate adapter config data object by the provided zod schema
   *
   * @param schema Adapter config data object schema from zod
   */
  protected readAdapterConfig = <AdapterConfigSchema extends z.ZodRawShape>(
    schema: z.ZodObject<AdapterConfigSchema, "strip", z.ZodTypeAny>
  ): UploadClientAdapterConfig<AdapterConfig> => {
    return schema.parse(
      this.config
    ) as UploadClientAdapterConfig<AdapterConfig>;
  };
}
