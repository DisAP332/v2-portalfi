import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "../src/components/Login";

// Login is the entry point of the auth path: on success it must not touch
// the token itself (that's the server's HttpOnly cookie now) but it still
// owns syncing Redux and navigating into the dashboard.
jest.mock("axios", () => ({
  __esModule: true,
  default: { post: jest.fn(), defaults: {} },
}));
const mockedAxios = axios as unknown as { post: jest.Mock };

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  jest.clearAllMocks();
  window.alert = jest.fn();
  localStorage.clear();
});

function fillAndSubmit(username: string, password: string) {
  if (username) {
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: username },
    });
  }
  if (password) {
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
  }
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
}

describe("Login", () => {
  it("refuses to submit blank fields without calling the server", () => {
    render(<Login />);
    fillAndSubmit("", "");
    expect(window.alert).toHaveBeenCalledWith(
      "Username and or Password field cannot be left blank"
    );
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("logs in, syncs Redux, and navigates to /dash - without ever seeing a token", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        success: true,
        response: {
          user: "venue1",
          events: [{ Name: "Trivia" }],
          food: [{ Name: "Nachos" }],
          drinks: [{ Name: "Beer" }],
          publishedData: [],
        },
      },
    });

    render(<Login />);
    fillAndSubmit("venue1", "correct-password");

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dash"));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/login"),
      { username: "venue1", password: "correct-password" },
      { withCredentials: true }
    );
    // the whole point of HttpOnly cookies: the response body carries no
    // field this test (or any client code) could pull a token out of.
    expect(JSON.stringify(mockedAxios.post.mock.calls[0])).not.toMatch(/token/i);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: expect.any(String),
      payload: { requested: "events", data: [{ Name: "Trivia" }] },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: expect.any(String),
      payload: { requested: "food", data: [{ Name: "Nachos" }] },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: expect.any(String),
      payload: { requested: "drinks", data: [{ Name: "Beer" }] },
    });
  });

  it("alerts on rejected credentials and stays on the login screen", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Request failed with status code 401"));

    render(<Login />);
    fillAndSubmit("venue1", "wrong-password");

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("incorrect username/password")
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
