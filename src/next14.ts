import { headers } from "next/headers";
import { HEADER_KEY, middleware } from "./shared";

/**
 * Get the URL pathname of the incoming request.
 *
 * @example
 * const pathname = getPathname();
 * // => "/en-CA/home"
 *
 * @returns {string} The url pathname.
 */
function getPathname(): string {
  const pathname = headers().get(HEADER_KEY);
  if (!pathname) {
    throw new Error("Unable to resolve pathname from headers");
  }
  return pathname;
}

const withPathname = middleware;

export { getPathname, withPathname };
