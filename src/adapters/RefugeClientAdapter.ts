import { Nullish } from "@verdantkit/utils";
import { z } from "zod";

import { generateLogMessage } from "@utils/generateLogMessage";
import { request, RequestProps } from "@utils/request";
import { ImageSetProps, UploadedImage } from "~/types";

import { UploadClientAdapter } from "./UploadClientAdapter";

const RefugeClientAdapterConfigSchema = z.object({
  clientDeviceId: z
    .string()
    .optional()
    .transform((clientDeviceId) => {
      return String(clientDeviceId ?? "");
    }),
  clientId: z.string(),
  clientSecret: z.string(),
  appName: z.string(),
  appUrl: z.string().url(),
});

type RefugeClientAdapterConfig = z.infer<
  typeof RefugeClientAdapterConfigSchema
>;

export class RefugeClientAdapter extends UploadClientAdapter<RefugeClientAdapterConfig> {
  get defaultRequestConfig(): RequestProps {
    const config = this.readAdapterConfig(RefugeClientAdapterConfigSchema);

    return {
      baseURL: config.appUrl,
      headers: {
        Authorization: `Bearer ${config.clientSecret}`,
      },
    };
  }

  async uploadFiles(
    formData: FormData
  ): Promise<Nullish<Array<UploadedImage>>> {
    const response = await request.get<Nullish<Array<UploadedImage>>>({
      ...this.defaultRequestConfig,
      url: `/static/files/store`,
      data: formData,
    });

    return response?.data;
  }

  async uploadFile(formData: FormData): Promise<Nullish<UploadedImage>> {
    const response = await request.get<Nullish<UploadedImage>>({
      ...this.defaultRequestConfig,
      url: `/static/files/store`,
      data: formData,
    });

    return response?.data;
  }

  async deleteFile(fileId: string): Promise<void> {
    await request.delete({
      ...this.defaultRequestConfig,
      url: `/static/files`,
      data: {
        files: [fileId],
      },
    });
  }

  async getFile(fileId: string): Promise<Nullish<UploadedImage>> {
    const response = await request.get<Nullish<UploadedImage>>({
      ...this.defaultRequestConfig,
      url: `/static/files/${fileId}`,
    });

    return response?.data;
  }

  async saveFile(fileId: string): Promise<void> {
    await request.delete({
      ...this.defaultRequestConfig,
      url: `/static/files/save`,
      data: {
        files: [fileId],
      },
    });
  }

  async getSet(setName: string): Promise<ImageSetProps> {
    const response = await request.get<ImageSetProps>({
      ...this.defaultRequestConfig,
      url: `/static/sets/${setName}`,
    });

    if (!response) {
      throw new Error(
        generateLogMessage(
          "RefugeClientAdapter.getSet.error",
          "Could not get image set data"
        )
      );
    }

    return response.data;
  }

  async createSet(setName: string): Promise<ImageSetProps> {
    const response = await request.post<ImageSetProps>({
      ...this.defaultRequestConfig,
      url: `/static/sets/${setName}`,
    });

    if (!response) {
      throw new Error(
        generateLogMessage(
          "RefugeClientAdapter.getSet.error",
          "Could not create image set data"
        )
      );
    }

    return response.data;
  }

  async updateSet(
    oldSetName: string,
    newSetName: string
  ): Promise<ImageSetProps> {
    const response = await request.put<ImageSetProps>({
      ...this.defaultRequestConfig,
      url: `/static/sets/${oldSetName}`,
      data: {
        set: {
          name: newSetName,
        },
      },
    });

    if (!response) {
      throw new Error(
        generateLogMessage(
          "RefugeClientAdapter.getSet.error",
          "Could not update image set data"
        )
      );
    }

    return response.data;
  }

  async deleteSet(setName: string): Promise<void> {
    await request.delete<ImageSetProps>({
      ...this.defaultRequestConfig,
      url: `/static/sets/${setName}`,
    });
  }
}
