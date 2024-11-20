# next-pathname

Access the request pathname in dynamically-rendered React Server Components.

Compatible with Next.js App Router 14 and 15.

## Setup

Add the package to your Next.js App Router project:

```
npm i next-rsc-pathname
```

## How it works

This package provides a middleware wrapper that attaches the URL pathname to the incoming request object. This allows you to access the URL pathname in dynamically-rendered RSCs.

When middleware finishes running and the request is handed off to the lambda, the pathname is available on the headers object anywhere in the RSC environment.

This header is never exposed to the client because it is set _after_ the request has been received by the middleware.

## Middleware

If you don't already have a `middleware.ts`, create one and add the following code:

```ts
// src/middleware.ts
import { withPathname } from "next-rsc-pathname";

export const middleware = withPathname;
```

This will automatically attach the URL pathname to the request object.

For more complex or customized middleware, you can wrap the request object yourself.

Typically you'll want to include this after any other request handling you may already have in your middleware, i.e. for feature flags, rewrites, locale detection etc, but before any terminating handlers like `next-intl`.

```ts
// src/middleware.ts
import { withPathname } from "next-rsc-pathname";

export const middleware = async (request: NextRequest) => {
  // do some request preprocessing...

  // attach the URL pathname to the request object
  const modifiedRequest = withPathname(request);

  // use modifiedRequest to produce a response
  // example: using next-intl
  const response = await i18nMiddleware(modifiedRequest);
  return response;
};
```

## Accessing the URL pathname in RSC

Due to API changes between Next.js 14 and 15, the way to access the URL pathname in RSCs is slightly different.

- For Next.js 14, you can call `getPathname` synchronously.
- For Next.js 15, you must await `getPathname` before using the value.

Ensure you're using the correct import for your Next.js version.

- For Next.js 14, import from `"next-rsc-pathname/next14"`.
- For Next.js 15, import from `"next-rsc-pathname/next15"`.

### Next 14.x

```tsx
// src/app/my-route/page.tsx
import { getPathname } from "next-rsc-pathname/next14";

export default function Page() {
  const pathname = getPathname();

  return (
    <div>
      <h1>This segment was rendered on: {pathname}</h1>
    </div>
  );
}
```

### Next 15.x

```tsx
// src/app/my-route/page.tsx
import { getPathname } from "next-rsc-pathname/next15";

export default async function Page() {
  const pathname = await getPathname();

  return (
    <div>
      <h1>This segment was rendered on: {pathname}</h1>
    </div>
  );
}
```

## Usage in `layout.tsx`

Layouts in App Router are rendered once per route and do not re-render on the client. This causes `getPathname` calls to return the same value for all pages that share the layout.

To work around this, you can use Next's `usePathname` hook to access the URL pathname in the layout. You'll have to make a separate Client Component with `'use client'` to do this though.
