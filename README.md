# Abdulrahman Hafez Portfolio

Personal portfolio for Abdulrahman Hafez, a Backend .NET Developer. The site is a static-first Next.js application, deployed through Cloudflare Pages.

## Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Cloudflare Pages static export

## Remote-first development

This project intentionally supports a constrained local environment. Dependencies are declared in `package.json` but may be installed and built by Cloudflare Pages or GitHub Actions instead of locally.

Local verification, when storage is available:

```bash
npm install
npm run check
```

## Cloudflare Pages

Connect this GitHub repository in **Workers & Pages** and use:

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `main`
- Build command: `npx next build`
- Build output directory: `out`
- Node version: `22`

Cloudflare Pages creates a preview deployment for pull requests and deploys `main` to production.

## Working agreement

Each feature follows: discuss → decide → implement → review → refactor if needed → commit.

Architecture and deployment decisions are recorded in [docs/architecture.md](docs/architecture.md).
