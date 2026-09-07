/**
 * @jest-environment node
 */
// next/server's NextRequest needs the real Request/Response globals - jsdom
// (this project's default test environment) doesn't provide them.
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { proxy } from "../src/proxy";

// proxy.ts is the actual FE-02 enforcement point - a request to /dash never
// reaches the page unless this function lets it through. jwt.verify is
// mocked so each case can control "valid session" / "invalid session"
// directly instead of needing a real signed token.
jest.mock("jsonwebtoken");
const mockedVerify = jwt.verify as jest.Mock;

beforeEach(() => {
  process.env.JWT_SECRET = "test-secret";
  mockedVerify.mockReset();
});

function requestTo(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers.cookie = `token=${token}`;
  return new NextRequest(`http://localhost:3000${path}`, { headers });
}

function isRedirectTo(res: ReturnType<typeof proxy>, path: string) {
  const location = res.headers.get("location");
  return location !== null && new URL(location).pathname === path;
}

describe("proxy", () => {
  it("redirects /dash to /login when there is no session cookie", () => {
    const res = proxy(requestTo("/dash"));
    expect(isRedirectTo(res, "/login")).toBe(true);
  });

  it("redirects /dash to /login when the token fails verification", () => {
    mockedVerify.mockImplementation(() => {
      throw new Error("invalid signature");
    });
    const res = proxy(requestTo("/dash", "garbage"));
    expect(isRedirectTo(res, "/login")).toBe(true);
  });

  it("lets a valid session through to /dash/anything", () => {
    mockedVerify.mockReturnValue({ user: { username: "venue1" } });
    const res = proxy(requestTo("/dash/settings", "valid-token"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("redirects an authenticated visit to /login onward to /dash", () => {
    mockedVerify.mockReturnValue({ user: { username: "venue1" } });
    const res = proxy(requestTo("/login", "valid-token"));
    expect(isRedirectTo(res, "/dash")).toBe(true);
  });

  it("leaves an unauthenticated visit to /login alone", () => {
    const res = proxy(requestTo("/login"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("sends an authenticated visit to / onward to /dash", () => {
    mockedVerify.mockReturnValue({ user: { username: "venue1" } });
    const res = proxy(requestTo("/", "valid-token"));
    expect(isRedirectTo(res, "/dash")).toBe(true);
  });

  it("sends an unauthenticated visit to / to /login", () => {
    const res = proxy(requestTo("/"));
    expect(isRedirectTo(res, "/login")).toBe(true);
  });
});
