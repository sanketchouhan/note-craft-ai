# NoteCraftAI Client

Frontend web application for NoteCraftAI, built with Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn UI, and Better Auth.

## Features

- **Workspace Management:** Create, customize (icons, model defaults), and organize research workspaces.
- **Source Library:** Ingest PDFs, web articles, YouTube videos, and markdown notes. Track extraction and indexing status in real time.
- **RAG Chat with Citations:** Real-time streaming assistant conversations with inline source citations, quote previews, model selection (`gpt-4o-mini`, `gpt-4o`), and optional web search.
- **Learning Hub & Artifacts:** Generate study artifacts from sources:
  - Summaries & Key Takeaways
  - Interactive Flashcards (with keyboard navigation)
  - Quizzes with scoring
  - Interactive Mind Maps powered by `@xyflow/react`
  - Research Reports
- **Personalized Memory:** View and manage long-term memories remembered across sessions.
- **Authentication & Security:** Protected routes with Better Auth session checking and Google OAuth sign-in.
- **Theming:** Full dark, light, and system theme support via `next-themes`.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI Library:** React 19, Tailwind CSS v4, `@base-ui/react`, shadcn UI
- **State & Data Fetching:** TanStack React Query 5, Zustand
- **AI Streaming:** `@ai-sdk/react`, `streamdown`
- **Mind Maps & Visuals:** `@xyflow/react` (React Flow), Recharts
- **Icons & Animation:** Lucide React, Motion (`framer-motion`)

## Getting Started

### 1. Prerequisites

- Node.js 20+ and npm
- Running NoteCraftAI backend server (defaults to `http://localhost:8080`)

### 2. Configure Environment Variables

In `client/`:

```bash
cp .env.example .env
```

Default variables:

```env
# Public origin of this Next.js app
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Express backend API URL (proxied via Next.js rewrites)
API_URL=http://localhost:8080
```

### 3. Install Dependencies

```bash
cd client
npm install
```

> *Note:* If installing behind a private registry mirror that lacks `@ai-sdk/provider@4.0.37`, install using `npm i --registry=https://registry.npmjs.org/`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Proxy & Architecture

The browser communicates exclusively through relative `/api/*` paths on `http://localhost:3000`. `next.config.ts` transparently proxies these requests to the Express backend (`API_URL`, default `http://localhost:8080`):

```
Browser (localhost:3000) ──> Next.js Rewrite ──> Express API (localhost:8080)
```

This prevents CORS issues and ensures Better Auth session cookies work seamlessly across SSR and client requests.

## Route Structure

```
app/
├── (auth)/
│   └── login/                 # Sign-in with Google or credentials
├── (protected)/
│   ├── dashboard/             # Workspace listing & creation
│   ├── settings/memory/       # User personalization & memories
│   └── workspace/[id]/
│       ├── page.tsx           # Workspace RAG chat
│       ├── sources/           # Source library & uploaders
│       ├── sources/[sourceId] # Source chunk & text detail
│       ├── learn/             # Learning hub & artifact generator
│       ├── learn/[artifactId] # Artifact viewer (quiz, mindmap, etc.)
│       └── settings/          # Workspace settings & deletion
├── layout.tsx                 # Root layout with Theme & Query providers
├── error.tsx                  # Root error boundary
├── loading.tsx                # Root loading skeleton
└── not-found.tsx              # 404 page
```
