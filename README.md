# PortalFi dashboard

Next.js dashboard for managing a venue's food, drinks, and events. Talks to
the [PortalFi server](../typescript-portalfi-server) over cookie-based auth.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_API_URL and JWT_SECRET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Every value a new deployment needs to change lives in `.env.local` (see
`.env.example`) - nothing else in the code should need editing to point
this frontend at a new venue's backend:

| Variable              | What it is                                                                |
| ---------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | The backend's base URL. Inlined into the client bundle at build time.    |
| `JWT_SECRET`           | Must exactly match the backend's `JWT_SECRET` - verified server-side in `src/proxy.ts`, with no network hop back to the API. |

## Login

Login posts to `${NEXT_PUBLIC_API_URL}/user/login`. On success the server
sets an HttpOnly session cookie - the frontend never sees or stores the
token itself (see `src/components/Login.tsx`). `src/proxy.ts` is what
actually gates `/dash` - it verifies that cookie server-side before a
protected page is ever rendered.

## Dashboard

The sideNav's sections (Food, Drinks, Events by default) are all driven by
one generic engine - `src/content/{ContentForm,ContentRow,ContentSection}.tsx`
plus a config per type under `src/content-types/`. Adding a content type is
a new file there (see `src/content-types/food.tsx` for the smallest
example) and one entry in `src/content-types/index.tsx` - nothing else
needs to change.

Note that events auto-delete after their date has passed, whenever the
list is next read from the server (including from the venue's public
site via `GET /site/public/:tenant` on the backend) - the server always
filters expired events out (and removes them) on read.

## Testing

```bash
npm test
```

Component tests (Jest + React Testing Library) over the auth and content
CRUD paths - see `tests/`.
