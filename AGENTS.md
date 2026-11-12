<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo notes (nusantara)

## Tooling & commands
- **Package manager:** Bun (`packageManager: bun@1.4.3`, `bun.lock` present). Prefer `bun`/`bunx` over npm/pnpm/yarn.
- **Scripts** (`package.json`): `bun run dev` (Next dev), `bun run build`, `bun run start`, `bun run lint` (`eslint`).
- **No test script or test runner configured** (no `*.test*`/`vitest`/`jest`/`playwright` config in repo). Do not invent test commands.
- **Typecheck:** no dedicated script; `tsconfig.json` has `strict: true`, `noEmit: true` (use `bunx tsc --noEmit` if needed).

## Stack & structure
- **Next.js App Router** app (`next@16.4.6`, React 19). Main source in `app/` (`layout.tsx`, `page.tsx`, `globals.css`). Static assets in `public/`.
- **TypeScript:** strict, bundler module resolution, JSX `react-jsx`. Path alias: `@/*` → repo root (`tsconfig.json`).
- **Styling:** Tailwind CSS 4 (`tailwindcss` + `@tailwindcss/turbopack`).
- **Linting:** flat ESLint config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + TypeScript; ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Repo-specific quirks
- `next.config.ts` enables experimental/non-default options: `experimental.agentFeedback`, `cacheComponents`, `partialPrefetching`, and a custom `turbopack.rules` loader for `*.css` (`@tailwindcss/turbopack`). Preserve these unless intentionally changing behavior.
- `next-env.d.ts` and `.next/` artifacts exist; `.next/**` is lint-ignored. Avoid hand-editing generated Next artifacts.
