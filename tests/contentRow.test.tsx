import { render, screen, fireEvent } from "@testing-library/react";
import { ContentTypeConfig } from "../src/content-types/schema";
import ContentRow from "../src/content/ContentRow";

// crudActions pulls in axios (sets defaults.withCredentials at module
// load) - mocked here since these tests never actually submit a form.
jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn(), defaults: {} },
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

interface IWidget {
  Name: string;
  Category: string;
}

const config: ContentTypeConfig<IWidget> = {
  key: "widgets",
  label: "Widget",
  navLabel: "Widgets",
  titleKey: "Name",
  summaryKey: "Category",
  initialValue: { Name: "", Category: "a" },
  fields: [
    { key: "Name", label: "Name", type: "text" },
    {
      key: "Category",
      label: "Category",
      type: "select",
      options: [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ],
    },
  ],
  columns: [{ key: "Name", label: "Name" }],
  desktopGridColumns: "1fr 1fr",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContentRow edit form", () => {
  it("shows the current item's values when Edit is reopened after an external update", () => {
    const { rerender } = render(
      <ContentRow config={config} item={{ _id: "1", Name: "First", Category: "a" }} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /^edit$/i })[0]);
    expect(screen.getByDisplayValue("First")).toBeInTheDocument();

    // close without saving, then simulate the item changing underneath
    // this row (e.g. a Redux refresh after someone else's edit) before
    // Edit is opened again.
    fireEvent.click(screen.getByRole("button", { name: "X" }));
    rerender(
      <ContentRow config={config} item={{ _id: "1", Name: "Updated", Category: "a" }} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /^edit$/i })[0]);

    // the bug: without a remount, this would still show "First".
    expect(screen.getByDisplayValue("Updated")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("First")).not.toBeInTheDocument();
  });

  it("surfaces a legacy select value instead of silently swapping it", () => {
    render(
      <ContentRow config={config} item={{ _id: "1", Name: "First", Category: "legacy" }} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /^edit$/i })[0]);

    const select = screen.getByDisplayValue("legacy (unrecognized)") as HTMLSelectElement;
    expect(select.value).toBe("legacy");
  });
});
