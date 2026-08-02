# Architecture decisions

## Static-first Next.js application

The portfolio uses Next.js with the App Router and TypeScript. Routes are statically exported so the initial site has no server runtime, database, or API dependency.

This keeps the site fast and inexpensive to host. A Cloudflare Worker can be introduced later for a contact endpoint or other server-side capability without changing the public content architecture.

## Content and components

Portfolio content will live in typed local source files. UI will be organized by responsibility:

- `src/app`: routes, layouts, metadata
- `src/components/ui`: reusable primitives
- `src/components/layout`: navigation and footer
- `src/components/sections`: composed page sections
- `src/content`: typed portfolio content
- `src/lib`: small framework-independent utilities

## Deployment

Cloudflare Pages builds the project from GitHub and serves the static `out` directory. Pull requests receive preview deployments; `main` is the production branch.

## Local constraints

Dependencies are not installed locally while disk capacity is constrained. CI and Cloudflare Pages are the verification environments until local storage is available.
