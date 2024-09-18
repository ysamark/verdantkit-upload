import { Nullish } from "@verdantkit/utils";

import {
  ImageSetProps,
  UploadClientAdapterConfig,
  UploadedImage,
} from "~/types";

import { generateLogMessage } from "~/utils/generateLogMessage";
import { UploadClientAdapter } from "./UploadClientAdapter";

type CustomClientAdapterConfig = {
  uploadFile: (formData: FormData) => Promise<Nullish<UploadedImage>>;
  uploadFiles(formData: FormData): Promise<Nullish<Array<UploadedImage>>>;
  deleteFile(fileId: string): Promise<void>;
  getFile(fileId: string): Promise<Nullish<UploadedImage>>;
  saveFile(fileId: string): Promise<void>;

  getSet(setName: string): Promise<ImageSetProps>;
  createSet(setName: string): Promise<ImageSetProps>;
  deleteSet(setName: string): Promise<void>;
  updateSet(setOldName: string, setNewName: string): Promise<ImageSetProps>;
};

export class CustomClientAdapter extends UploadClientAdapter<CustomClientAdapterConfig> {
  constructor(config?: UploadClientAdapterConfig<CustomClientAdapterConfig>) {
    super(config);
  }

  private throwIfNotDefinedMethod(methodName: string) {
    const methodDefined = Boolean(
      methodName in this.config &&
        typeof this.config[methodName as keyof typeof this.config] !==
          "function"
    );

    if (!methodDefined) {
      throw new Error(
        generateLogMessage(
          "UploadClient.customAdapter.method.error",
          `Method '${methodName}' not provided.`
        )
      );
    }
  }

  async uploadFile(formData: FormData): Promise<Nullish<UploadedImage>> {
    this.throwIfNotDefinedMethod("uploadFile");
    return await this.config.uploadFile(formData);
  }

  async uploadFiles(
    formData: FormData
  ): Promise<Nullish<Array<UploadedImage>>> {
    this.throwIfNotDefinedMethod("uploadFiles");
    return await this.config.uploadFiles(formData);
  }

  async deleteFile(fileId: string): Promise<void> {
    this.throwIfNotDefinedMethod("deleteFile");
    return await this.config.deleteFile(fileId);
  }

  async getFile(fileId: string): Promise<Nullish<UploadedImage>> {
    this.throwIfNotDefinedMethod("getFile");
    return await this.config.getFile(fileId);
  }

  async saveFile(fileId: string): Promise<void> {
    this.throwIfNotDefinedMethod("saveFile");
    return await this.config.saveFile(fileId);
  }

  async getSet(setName: string): Promise<ImageSetProps> {
    this.throwIfNotDefinedMethod("getSet");
    return await this.config.getSet(setName);
  }

  async createSet(setName: string): Promise<ImageSetProps> {
    this.throwIfNotDefinedMethod("createSet");
    return await this.config.createSet(setName);
  }

  async updateSet(
    setOldName: string,
    setNewName: string
  ): Promise<ImageSetProps> {
    this.throwIfNotDefinedMethod("updateSet");
    return await this.config.updateSet(setOldName, setNewName);
  }

  async deleteSet(setName: string): Promise<void> {
    this.throwIfNotDefinedMethod("deleteSet");
    return await this.config.deleteSet(setName);
  }
}
