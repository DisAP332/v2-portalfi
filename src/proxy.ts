import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// The real auth gate (FE-02) - runs server-side before /dash ever renders,
// so it can't be bypassed by disabling JS or editing localStorage the way
// the old client-side TokenChecker could be. Verifies the same JWT the
// backend issues, with the same secret (JWT_SECRET, shared via env - see
// .env.local - never exposed to the browser since it's not NEXT_PUBLIC_).
function hasValidSession(request: NextRequest): boolean {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasValidSession(request);

  if (pathname.startsWith("/dash") && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/login" || pathname === "/") && authenticated) {
    return NextResponse.redirect(new URL("/dash", request.url));
  }

  if (pathname === "/" && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dash/:path*"],
};
