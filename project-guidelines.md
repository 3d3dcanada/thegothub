Build a modern, high-performance web application called "OpenSource Hub" - a universal aggregator and downloader for open source projects.

## Project Overview
Create a Next.js application that aggregates open source projects from multiple platforms (GitHub, GitLab, SourceForge, Bitbucket, etc.) into a single, beautifully designed interface. Users should be able to search, browse, and download any open source project with a single click.

## Core Features
1. Universal Search - Search across all indexed open source projects
2. One-Click Downloads - Direct ZIP/TARball downloads via Software Heritage Vault or platform-native downloads
3. Project Metadata Display - Show stars, forks, description, last updated, license, language
4. Category Browsing - Browse by language, framework, category
5. Trending/Popular - Show trending projects
6. Project Details Page - View file structure, readme, contributors

## Technical Architecture
- Frontend: Next.js 14+ (App Router), React, TypeScript
- Styling: Tailwind CSS with custom design system (NOT dark mode default - fresh, clean, professional)
- Database: PostgreSQL with Prisma ORM
- APIs: GitHub API, GitLab API, Software Heritage API
- Deployment: Vercel/Cloudflare Pages compatible

## UI/UX Requirements
- Clean, modern, Apple-esque aesthetic - white/light backgrounds with subtle accents
- Smooth animations using Framer Motion
- Responsive design (mobile-first)
- Fast page loads with optimistic UI
- Professional typography (Inter or similar)
- Card-based project display with hover effects
- Global search with keyboard shortcuts (Cmd+K)

## Data Model
- Projects table: id, name, description, url, platform, stars, forks, language, license, last_updated, downloaded_count
- Categories table: id, name, slug
- Project_Categories junction table

## Development Approach
1. Start with GitHub API integration (most coverage)
2. Integrate Software Heritage Vault for on-demand tarballs
3. Add metadata caching with incremental updates
4. Build the search UI with instant results
5. Implement download tracking

## Constraints
- Must be open source itself
- Must be easily self-hostable
- No authentication required for basic usage
- Respect platform rate limits with proper caching

Create the complete project structure with:
- Next.js app with App Router
- Prisma schema
- API routes for GitHub/Software Heritage
- Beautiful UI components
- TypeScript types
- README with setup instructions# New Project Starter — MiniMax M2.5

> Use this prompt to bootstrap any new project from zero.
> Fill in the brackets. The more context you give, the better the output.

---

## The Prompt

```
I'm starting a new project. Here's everything you need to know:

## Project Overview
Name: [project name]
Type: [web app / mobile app / CLI tool / API / library / etc.]
Purpose: [what it does in one sentence]
Target users: [who uses it]

## Technical Stack
Frontend: [React / Next.js / Vue / Svelte / none]
Backend: [Node.js / Python / Go / Rust / none]
Database: [PostgreSQL / MongoDB / SQLite / none / TBD]
Auth: [none / JWT / OAuth / Clerk / Supabase / etc.]
Deployment: [Vercel / Railway / Docker / bare metal / TBD]
Styling: [Tailwind / styled-components / CSS modules / etc.]

## Core Features (MVP)
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## What I Want From You
Phase 1: Architecture
- Propose the file/folder structure
- Define the core data models
- Identify the key component boundaries
- List all dependencies we'll need with reasoning

Phase 2: Scaffold
- Create the base project structure
- Set up configs (tsconfig, eslint, prettier, etc.)
- Build the foundation files only — no features yet

Phase 3: [Feature Name]
- Build this feature completely
- Tests included

Start with Phase 1. Do not write code until I approve the architecture.
```

---

## Boilerplate Variants

### For a React + Next.js app
```
Bootstrap a Next.js 14+ project with:
- App Router (not Pages Router)
- TypeScript strict mode
- Tailwind CSS v4
- ESLint + Prettier configured
- Absolute imports with @ alias
- A sensible folder structure for a [small/medium/large] app

Explain every structural decision. I want to understand the why.
```

### For a Python API
```
Bootstrap a Python API project with:
- FastAPI
- Pydantic v2 for data validation
- SQLAlchemy 2.0 for ORM (if needed) or [alternative]
- uv for package management
- Type annotations everywhere
- A logical module structure

Project: [describe what the API does]
```

### For a CLI tool
```
Bootstrap a CLI tool:
Language: [TypeScript with tsx / Python / Go / Rust]
Purpose: [what it does]
Input: [args / stdin / config file]
Output: [stdout / files / side effects]

Include: argument parsing, error handling, help text, basic tests.
```

---

## After the Scaffold

Once the project is scaffolded, start each feature with:
```
Now let's build [feature name].

Acceptance criteria:
- [What done looks like]
- [Edge cases to handle]
- [What NOT to build yet]

Start by reading the current codebase state, then plan, then implement.
```