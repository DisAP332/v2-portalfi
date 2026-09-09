import Storage from "../src/helpers/storage";

// Regression coverage for a real bug: localStorage.setItem coerces its
// value with String(), so writing the JS value `undefined` used to store
// the literal string "undefined" - which the old getItem compared against
// the string, not null, and happily JSON.parsed back as truthy "data".
describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("never writes anything for undefined data", () => {
    Storage.setItem("food", undefined as unknown as object);
    expect(localStorage.getItem("JBWfood")).toBeNull();
    expect(Storage.getItem("food")).toBeUndefined();
  });

  it("round-trips real data through a generic content-type key", () => {
    Storage.setItem("food", [{ Name: "Nachos" }]);
    expect(Storage.getItem("food")).toEqual([{ Name: "Nachos" }]);
  });

  it("treats a stray literal \"undefined\" string already in storage as absent", () => {
    localStorage.setItem("JBWfood", "undefined");
    expect(Storage.getItem("food")).toBeUndefined();
  });

  it("returns undefined instead of throwing on corrupt JSON", () => {
    localStorage.setItem("JBWfood", "{not valid json");
    expect(Storage.getItem("food")).toBeUndefined();
  });

  it("supports a content type with no dedicated case, via the generic JBW<key> mapping", () => {
    Storage.setItem("specials", [{ Name: "Happy Hour" }]);
    expect(localStorage.getItem("JBWspecials")).not.toBeNull();
    expect(Storage.getItem("specials")).toEqual([{ Name: "Happy Hour" }]);
  });
});
