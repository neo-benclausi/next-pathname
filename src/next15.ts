import { headers } from "next/headers";
import { HEADER_KEY, middleware } from "./shared";

/**
 * Get the URL pathname of the incoming request.
 *
 * @example
 * const pathname = await getPathname();
 * // => "/en-CA/home"
 *
 * @returns {string} The url pathname.
 */
async function getPathname(): Promise<string> {
  const pathname = await headers().get(HEADER_KEY);
  if (!pathname) {
    throw new Error("Unable to resolve pathname from headers");
  }
  return pathname;
}

const withPathname = middleware;

export { getPathname, withPathname };
