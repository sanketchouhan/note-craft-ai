# Notebook LM

Notebook LM is a personal research notebook. You collect sources in a workspace, ask questions about them, and turn them into study material.

Each workspace keeps its own sources, chat, and generated artifacts. Answers cite the passages they came from.

## What you can do

- Sign in with Google and keep a private set of workspaces.
- Add sources: PDFs, web pages, YouTube transcripts, and notes.
- Chat with a workspace. Replies stream in and link back to the source text. Web search can be turned on for a message.
- Generate summaries, takeaways, flashcards, quizzes, mind maps, and reports from selected sources.
- Save memories that later chats can use.

Uploaded sources stay pending until a background job extracts the text, splits it into chunks, and stores embeddings. Chat and artifacts use those chunks.

## How it is put together

The browser only talks to the Next.js app. Next.js forwards every `/api/*` request to the Express API, so login cookies stay on the same origin.

```text
Browser  →  Next.js :3000  →  Express API :8080
                              ├── Postgres :5433
                              ├── Inngest (source indexing, artifacts, summaries)
                              └── OpenAI, Pinecone, Cloudinary, Firecrawl, Tavily, Mem0
```

| Piece | Directory | Local URL | Role |
| --- | --- | --- | --- |
| Client | `client/` | http://localhost:3000 | UI, auth screens, and the API proxy |
| API | `server/` | http://localhost:8080 | Auth, data, chat, and background jobs |
| Postgres | Docker | localhost:5433 | Users, workspaces, sources, chats, artifacts |

## Requirements

- Node.js 20+ and npm
- Docker, for Postgres
- API keys for the services you want to use. The app starts without them, but login, uploads, scraping, chat, and memory need the matching keys in `server/.env`.

## Run it

From the repo root, start the database:

```bash
docker compose up -d
```

In separate terminals:

```bash
cd server
cp .env.example .env   # then fill in the keys
npm install
npx prisma migrate dev
npm run dev
```

```bash
npx inngest-cli@latest dev -u http://localhost:8080/api/inngest
```

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000. Inngest's local dashboard is at http://localhost:8288.

Without the Inngest process, new sources stay pending and artifact or summary jobs do not run.

## More detail

- [Client setup, routes, and the proxy](client/README.md)
- [API setup, migrations, and endpoints](server/README.md)
