import { expect, it } from "vitest";

it("SHould run on node", () => {
  console.log(typeof document === "object" ? document : ">>> Done");
  expect(1).toBeTruthy();
});
