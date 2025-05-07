import { isEmptyObject } from "../src/utils";

describe("isEmptyObject", () => {
  it("should return true for emptyObject", () => {
    expect(isEmptyObject({})).toEqual(true);
  });

  it("should return false for nonEmptyObject", () => {
    expect(isEmptyObject({ key: "value" })).toEqual(false);
  });

  it("should return false for notObject", () => {
    expect(isEmptyObject("string")).toEqual(false);
  });

  it("should return false for null", () => {
    expect(isEmptyObject(null)).toEqual(false);
  });

  it("should return false for undefined", () => {
    expect(isEmptyObject(undefined)).toEqual(false);
  });
});
