import { describe, expect, it } from "vitest";

import { UploadClient } from ".";

describe("Test UploadClient helper class", () => {
  it("should sum two number", () => {
    expect(1 + 1).toBe(2);
  });

  it("should be ok", () => {
    const uploadClient = new UploadClient();

    expect(uploadClient.getImageSet).toBeTruthy();
  });

  it("should be ok again", () => {
    console.log(">>> typeof global.document: ", typeof document);

    const uploadClient = new UploadClient();

    expect(uploadClient.getImageSet).toBeTruthy();
  });
});
