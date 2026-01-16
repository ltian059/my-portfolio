# my-portfolio

A personal portfolio website featuring a Home page, an Experience page, and MDX-powered technical notes. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Live Demo

- Demo: <https://my-portfolio-nu-ten-90.vercel.app/>

## Features

- Responsive layout: desktop/mobile navigation, side drawer
- Light/Dark theme toggle: persisted via `localStorage` + cookie, no first-paint flash (FOUC)
- Notes (MDX-powered)
  - Frontmatter metadata (`title/date/tags/summary`, etc.)
  - Auto-generated TOC + heading anchors
  - Syntax highlighting (Shiki / `rehype-pretty-code`)
  - Math rendering (KaTeX via `remark-math` / `rehype-katex`)
  - Safe note asset delivery via `/api/notes-assets/...` (path traversal guard)
- Content-as-data: copy and structure live in `src/data/pages/*`
- Internal APIs: `/api/home`, `/api/notes`, `/api/notes/[slug]`, `/api/sidenav`

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- MDX: `next-mdx-remote` (RSC) + unified/remark/rehype + Shiki

## Getting Started

### Requirements

- Node.js 18.17+ (recommended 20+)
- npm (repo includes `package-lock.json`)

### Install dependencies

```bash
npm install
```

For reproducible installs in CI/clean environments:

```bash
npm ci
```

### Start dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Content

### Site metadata / header links

- `src/data/pages/layout/meta.ts` — site title/description
- `src/data/pages/layout/nav.ts` — nav items + external links (GitHub / LinkedIn)

### Static assets (avatar / resume / images)

- `public/avatar.png` — homepage avatar
- `public/DanielTian_Resume.pdf` — resume download
- `public/experience/*` — logos used on the experience page
- `public/notes/*` — public note cover images (optional)

### Home / Experience pages

- `src/data/pages/home/*` — home sections (Hero, Projects, Notes, etc.)
- `src/data/pages/experience/*` — experience sections (education, work, projects, publications)

### Notes: add/edit a note

1. Create `index.mdx` under `src/data/pages/notes/content/<slug>/`
2. Required frontmatter fields:

```md
---
title: "My Note Title"
date: "2026-01-01"
tags: ["nextjs", "mdx"]
summary: "One-line description"
priority: 1 # optional: smaller = higher priority
coverImage: "./cover.png" # optional: relative to the note folder, or an absolute /public path
---
```

3. Images inside notes:
   - Put files under `content/<slug>/...` and reference them relatively (`./cover.png`, `./images/foo.png`)
   - Or use an absolute path under `/public` (e.g. `/notes/xxx.png`)

## Structure

```text
src/app               # Pages + API routes (App Router)
src/components        # UI components (Header, SideNav, ThemeToggle, TOC, ...)
src/data/pages        # Content and structured page data
src/lib               # Utilities (notes reader, TOC, internal API helpers)
public                # Static files (avatar, resume, images)
```

## Deployment

Recommended: Vercel, or any platform that supports the Next.js Node runtime.

- Build: `npm run build`
- Start: `npm run start`

Note: Notes are loaded from the filesystem at runtime (`node:fs` reads `src/data/pages/notes/content`), so this project is not compatible with a pure static export.

## License

No license provided yet (default: all rights reserved). If you want to open-source it, add a `LICENSE` file and update this section.
