# NoteCraftAI Server

Backend REST API and background worker service for NoteCraftAI, built with Node.js, Express, Prisma ORM, Inngest, and the Vercel AI SDK.

## Features

- **Authentication:** Better Auth with Google OAuth, email sign-in, and session management.
- **Multi-Source Ingestion:** PDF upload (Cloudinary + unpdf), website scraping (Firecrawl), YouTube transcripts, and raw text/markdown.
- **RAG & Vector Search:** Text chunking, OpenAI embeddings (`text-embedding-3-small`), and Pinecone vector indexing per workspace.
- **Streaming Chat:** AI SDK streaming endpoint with citations, rolling summaries, and optional Tavily web search.
- **Memories:** User-level personalization backed by Mem0.
- **Background Jobs (Inngest):** Asynchronous source processing, artifact generation (summaries, quizzes, flashcards, mind maps), and conversation summarization.

## Tech Stack

- **Runtime:** Node.js (ES Modules, TypeScript, `tsx`)
- **HTTP Framework:** Express 5
- **Database & ORM:** PostgreSQL 16, Prisma ORM 7 (`@prisma/adapter-pg`)
- **Queue / Background Jobs:** Inngest
- **AI & Vectors:** OpenAI API, `@ai-sdk/openai`, Pinecone, Mem0, Tavily
- **File Storage:** Cloudinary

## Getting Started

### 1. Prerequisites

- Node.js 20+ and npm
- Docker (for PostgreSQL via docker-compose)
- Inngest CLI (`npx inngest-cli@latest`)

### 2. Start PostgreSQL

From the repository root:

```bash
docker compose up -d
```

The database runs on `localhost:5433` (mapped from container port `5432`) with database `notecraftai`.

### 3. Configure Environment Variables

In `server/`:

```bash
cp .env.example .env
```

Fill in the required credentials in `.env`:
- Database & Auth: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Storage & Ingestion: `CLOUDINARY_*`, `FIRECRAWL_API_KEY`
- AI Services: `OPENAI_API_KEY`, `PINECONE_*`, `TAVILY_API_KEY`, `MEM0_API_KEY`

### 4. Database Setup & Migrations

```bash
cd server
npm install
npx prisma migrate dev --name init
```

### 5. Run the Server

```bash
npm run dev
```

The API starts on **`http://localhost:8080`** (or your configured `PORT`).

### 6. Run Inngest Dev Server

To process background source indexing and artifact generation locally:

```bash
npx inngest-cli@latest dev -u http://localhost:8080/api/inngest
```

Inngest dashboard opens at `http://localhost:8288`.

## API Endpoints Overview

| Method | Path | Description |
| --- | --- | --- |
| `ALL` | `/api/auth/*` | Better Auth handlers (sign-in, sessions, OAuth) |
| `GET, POST` | `/api/workspaces` | List and create user workspaces |
| `GET, PATCH, DELETE` | `/api/workspaces/:workspaceId` | Manage a specific workspace |
| `GET, POST` | `/api/workspaces/:workspaceId/sources` | List, create, or bulk delete sources |
| `POST` | `/api/workspaces/:workspaceId/sources/upload` | Upload and process a PDF file |
| `POST` | `/api/workspaces/:workspaceId/sources/import/website` | Scrape and ingest a web page |
| `POST` | `/api/workspaces/:workspaceId/sources/import/youtube` | Fetch and ingest YouTube transcript |
| `GET, POST` | `/api/workspaces/:workspaceId/conversations` | List and create conversations |
| `GET, DELETE` | `/api/workspaces/:workspaceId/conversations/:id` | View messages or delete conversation |
| `POST` | `/api/workspaces/:workspaceId/chat` | Streaming chat with RAG & web search |
| `GET, POST` | `/api/workspaces/:workspaceId/artifacts` | List or trigger learning artifact generation |
| `GET, POST, PATCH, DELETE` | `/api/memories` | Manage user memories (Mem0) |
| `ALL` | `/api/inngest` | Inngest background event handler |
