import axios from "axios";
import crudActions from "../src/helpers/crudActions";

// crudActions is the entire frontend CRUD path - every add/edit/delete in
// the dashboard funnels through Create/Update/Delete. axios is mocked so
// each case can control the server's response directly.
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: {},
  },
}));
const mockedAxios = axios as unknown as {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
};

beforeEach(() => {
  jest.clearAllMocks();
  window.alert = jest.fn();
});

describe("Create", () => {
  it("wraps the payload in { Data } and returns the fresh list on success", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { success: true, response: { data: [{ Name: "Nachos" }] } },
    });

    const result = await crudActions.Create("food", { Name: "Nachos" });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/food"),
      { Data: { Name: "Nachos" } }
    );
    expect(result).toEqual({ success: true, data: [{ Name: "Nachos" }] });
  });

  it("alerts and returns a failure result when the server rejects the content", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { success: false, response: "Dates cannot be set in the past." },
    });

    const result = await crudActions.Create("events", { Date: "2020-01-01" });

    expect(window.alert).toHaveBeenCalledWith("Dates cannot be set in the past.");
    expect(result).toEqual({ success: false, data: {} });
  });

  it("alerts and returns a failure result when the request itself throws", async () => {
    mockedAxios.post.mockRejectedValue(new Error("network error"));

    const result = await crudActions.Create("food", { Name: "Nachos" });

    expect(window.alert).toHaveBeenCalled();
    expect(result).toEqual({ success: false, data: {} });
  });
});

describe("Update", () => {
  it("PUTs to /:requested/:id with the payload wrapped in { Data }", async () => {
    mockedAxios.put.mockResolvedValue({
      data: { success: true, response: { data: [{ Name: "Loaded Nachos" }] } },
    });

    const result = await crudActions.Update("abc123", "food", { Name: "Loaded Nachos" });

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/food/abc123"),
      { Data: { Name: "Loaded Nachos" } }
    );
    expect(result).toEqual({ success: true, data: [{ Name: "Loaded Nachos" }] });
  });
});

describe("Delete", () => {
  it("DELETEs /:requested/:id and returns the fresh (possibly empty) list", async () => {
    mockedAxios.delete.mockResolvedValue({
      data: { success: true, response: { data: [] } },
    });

    const result = await crudActions.Delete("abc123", "food");

    expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining("/food/abc123"));
    expect(result).toEqual({ success: true, data: [] });
  });
});

describe("session expiry", () => {
  it("alerts to log back in when the server reports auth: false", async () => {
    mockedAxios.post.mockResolvedValue({ data: { auth: false } });

    const result = await crudActions.Create("food", { Name: "Nachos" });

    expect(window.alert).toHaveBeenCalledWith("token has expired. please log back in");
    expect(result).toEqual({ success: false, data: {} });
  });
});
