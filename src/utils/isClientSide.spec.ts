import { describe, expect, it } from "vitest";

import { isClientSide } from "./isClientSide";

describe("Test isClientSide util", () => {
  it("should be truthy is running on client side/browser", () => {
    expect(isClientSide()).toBeTruthy();
  });
});
