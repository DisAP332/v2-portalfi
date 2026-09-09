import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { LogoutButton } from "../src/components/Header_/HeaderButtons";

// Logout is the other half of the auth path: since the token is an
// HttpOnly cookie, JS can no longer clear it directly - this has to be a
// real request the server answers by clearing the cookie itself.
jest.mock("axios", () => ({
  __esModule: true,
  default: { post: jest.fn(), defaults: {} },
}));
const mockedAxios = axios as unknown as { post: jest.Mock };

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LogoutButton", () => {
  it("asks the server to clear the session cookie, then navigates to /login", async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/logout"),
      {},
      { withCredentials: true }
    );
  });

  it("still navigates to /login even when the logout request fails", async () => {
    mockedAxios.post.mockRejectedValue(new Error("network error"));

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    // a rejected logout request shouldn't leave the user stranded on the
    // dashboard with no way back to /login.
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));
  });
});
