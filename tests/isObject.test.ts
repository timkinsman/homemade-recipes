import { isObject } from "../src/utils";

describe("isObject", () => {
  it("should return true for emptyObject", () => {
    expect(isObject({})).toEqual(true);
  });

  it("should return true for nonEmptyObject", () => {
    expect(isObject({ key: "value" })).toEqual(true);
  });

  it("should return false for notObject", () => {
    expect(isObject("string")).toEqual(false);
  });

  it("should return false for null", () => {
    expect(isObject(null)).toEqual(false);
  });

  it("should return false for undefined", () => {
    expect(isObject(undefined)).toEqual(false);
  });
});
