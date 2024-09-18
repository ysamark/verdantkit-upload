import { Nullish } from "@verdantkit/utils";

import { ImageSetProps, UploadedImage } from "~/types";

import {
  DefaultResponseDataObject,
  UploadClientAdapter,
} from "./UploadClientAdapter";

export class GoogleDriveClientAdapter extends UploadClientAdapter {
  async uploadFile<
    ResponseDataObject extends object = DefaultResponseDataObject
  >(formData: FormData): Promise<Nullish<ResponseDataObject>> {
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
