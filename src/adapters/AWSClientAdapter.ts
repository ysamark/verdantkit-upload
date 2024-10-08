import { Nullish } from "@verdantkit/utils";

import { ImageSetProps, UploadedImage } from "~/types";

import { UploadClientAdapter } from "./UploadClientAdapter";

type AWSClientAdapterConfig = {
  awsClientId: string;
  awsClientSecret: string;
};

export class AWSClientAdapter extends UploadClientAdapter<AWSClientAdapterConfig> {
  async uploadFiles(
    formData: FormData
  ): Promise<Nullish<Array<UploadedImage>>> {
    throw new Error("Method not implemented.");
  }

  async uploadFile(formData: FormData): Promise<Nullish<UploadedImage>> {
    throw new Error("Method not implemented.");
  }

  async deleteFile(fileId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getFile(fileId: string): Promise<Nullish<UploadedImage>> {
    throw new Error("Method not implemented.");
  }

  async saveFile(fileId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getSet(setName: string): Promise<ImageSetProps> {
    throw new Error("Method not implemented.");
  }

  async createSet(setName: string): Promise<ImageSetProps> {
    throw new Error("Method not implemented.");
  }

  async updateSet(
    setOldName: string,
    setNewName: string
  ): Promise<ImageSetProps> {
    throw new Error("Method not implemented.");
  }

  async deleteSet(setName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
