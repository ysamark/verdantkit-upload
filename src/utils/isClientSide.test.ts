import { describe, expect, it } from "vitest";

import { isClientSide } from "./isClientSide";

describe("Test isClientSide util", () => {
  it("should be falsy is running on server side/node", () => {
    expect(isClientSide()).toBeTruthy();
  });
});
