import { NextRequest } from "next/server";

export const HEADER_KEY = "x-rsc-pathname";

/**
 * Attaches an internal header with the URL pathname to the request.
 * @param request The incoming NextRequest request.
 * @returns The modified NextRequest request.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER_KEY, request.nextUrl.pathname);

  return new NextRequest(request, {
    headers: requestHeaders,
  });
}
