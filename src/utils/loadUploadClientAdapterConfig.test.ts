import { describe, expect, it } from "vitest";

import { UploadClientAdapterConfig } from "~/types";

import { loadUploadClientAdapterConfig } from "./loadUploadClientAdapterConfig";

describe("Test UploadClientAdapterConfig util whish is going to load environment and global variable references in the config values", () => {
  it("should load environment variables inside a given config object", () => {
    const API_CLIENT_ID = process.env.API_CLIENT_ID;
    const API_SECRET_KEY = process.env.API_SECRET_KEY;

    const uploadClientAdapterConfig: UploadClientAdapterConfig =
      loadUploadClientAdapterConfig({
        apiClientId: "env:API_CLIENT_ID",
        apiSecretKey: "env:API_SECRET_KEY",
      });

    expect(uploadClientAdapterConfig).toMatchObject({
      apiClientId: API_CLIENT_ID,
      apiSecretKey: API_SECRET_KEY,
    });
  });
});
