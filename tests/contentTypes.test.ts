import { contentTypes, assertGridColumnsMatch } from "../src/content-types";
import { ContentTypeConfig } from "../src/content-types/schema";

describe("content-types registry", () => {
  it("loads without throwing - every real config's desktopGridColumns matches its columns", () => {
    expect(contentTypes.length).toBeGreaterThan(0);
  });

  it("rejects a config whose desktopGridColumns token count doesn't match columns + Actions", () => {
    const broken: ContentTypeConfig = {
      key: "broken",
      label: "Broken",
      navLabel: "Broken",
      titleKey: "Name",
      summaryKey: "Name",
      initialValue: { Name: "" },
      fields: [],
      columns: [{ key: "Name", label: "Name" }],
      desktopGridColumns: "1fr 1fr 1fr", // needs exactly 2 (1 column + Actions)
    };

    expect(() => assertGridColumnsMatch(broken)).toThrow(/desktopGridColumns/);
  });
});
