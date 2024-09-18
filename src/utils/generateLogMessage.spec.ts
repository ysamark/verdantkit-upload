import { describe, expect, it } from "vitest";

import { generateLogMessage } from "./generateLogMessage";

describe("Test generateLogMessage util", () => {
  it("should generate messages based on given log keys", () => {
    expect(generateLogMessage("UploadClient.uploadFile.adapter.error")).toEqual(
      "UploadClient.uploadFile.adapter:Error"
    );
    expect(
      generateLogMessage(
        "UploadClient.uploadFile.result.error",
        "Could not upload"
      )
    ).toEqual("UploadClient.uploadFile.result:Error - Could not upload");
    expect(generateLogMessage("error", "Something went wrong")).toEqual(
      "error - Something went wrong"
    );
  });
});
