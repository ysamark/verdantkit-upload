import { describe, expect, it } from "vitest";

import { upperCaseToCamelCase } from "./upperCaseToCamelCase";

describe("Test upperCaseToCamelCase util", () => {
  it("should convert a given uppercase string to camel case", () => {
    expect(upperCaseToCamelCase("LOCAL_STORAGE_LIST_ITEM")).toBe(
      "localStorageListItem"
    );
    expect(upperCaseToCamelCase("SESSION_STORAGE_MyAwesome_DATA")).toBe(
      "sessionStorageMyAwesomeData"
    );
  });
});
