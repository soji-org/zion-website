# Next.js Request Deletion App

A beautiful **Next.js (App Router)** app that lets users request deletion of their data. Requests are persisted to a bundled SQLite database via `better-sqlite3`.

## Getting started

```bash
pnpm i # or npm i / yarn
pnpm dev
```

> The SQLite file is created at `./data/data.sqlite` by default. Override with `SQLITE_PATH=/absolute/path.sqlite`.

## Build & run (standalone)

```bash
pnpm build
pnpm start
```

## Notes
- Uses **shadcn/ui** components and Tailwind CSS (React version for Next.js).
- API endpoint: `POST /api/request-deletion` with JSON `{ email, reason, message?, consent }`.
- Table `deletion_requests`: `id, email, reason, message, status, created_at`.
- Fancy glass card, radial glow backdrop, subtle animation. Fully responsive.

## Production considerations
- `better-sqlite3` is a native module. On platforms where it's unsupported, use a Node host (e.g., Docker, vm) or swap to a hosted SQLite (e.g., Turso/libsql) without changing the schema.
