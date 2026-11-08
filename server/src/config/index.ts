import "dotenv/config";

export type serverConfig = {
  port: number;
  env: string;
  databaseUrl: string;
  betterAuthUrl: string;
  betterAuthSecret: string;
  googleClientId: string;
  googleClientSecret: string;
};

export type cloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
  apiSecret: string;
};

export const cloudinaryConfig: cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "cloudinary",
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "upload",
  apiKey: process.env.CLOUDINARY_API_KEY || "api_key",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "api_secret",
};

export type firecrawlConfig = {
  apiKey: string;
};

export const firecrawlConfig: firecrawlConfig = {
  apiKey: process.env.FIRECRAWL_API_KEY || "api_key",
};

export type pineconeConfig = {
  apiKey: string;
  index: string;
  cloud: string;
  region: string;
};

export const pineconeConfig: pineconeConfig = {
  apiKey: process.env.PINECONE_API_KEY || "api_key",
  index: process.env.PINECONE_INDEX || "chaibook",
  cloud: process.env.PINECONE_CLOUD || "aws",
  region: process.env.PINECONE_REGION || "us-east-1",
};

export type tavilyConfig = {
  apiKey: string;
};

export const tavilyConfig: tavilyConfig = {
  apiKey: process.env.TAVILY_API_KEY || "api_key",
};

export type aiConfig = {
  chatModel: string;
  chatModels: readonly string[];
  embeddingModel: string;
  embeddingDimensions: number;
  chunkSize: number;
  chunkOverlap: number;
  ragTopK: number;
  ragMinScore: number;
  conversationSummaryInterval: number;
  recentMessageWindow: number;
};

const numberFromEnv = (value: string | undefined, fallback: number) => {
  const parsed = value === undefined ? Number.NaN : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const aiConfig: aiConfig = {
  chatModel: process.env.CHAT_MODEL || "gpt-4o-mini",
  chatModels: (process.env.CHAT_MODELS || "gpt-4o-mini,gpt-4o")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean),
  embeddingModel: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
  embeddingDimensions: numberFromEnv(process.env.EMBEDDING_DIMENSIONS, 1536),
  chunkSize: numberFromEnv(process.env.CHUNK_SIZE, 1000),
  chunkOverlap: numberFromEnv(process.env.CHUNK_OVERLAP, 100),
  ragTopK: numberFromEnv(process.env.RAG_TOP_K, 6),
  ragMinScore: numberFromEnv(process.env.RAG_MIN_SCORE, 0.35),
  conversationSummaryInterval: numberFromEnv(
    process.env.CONVERSATION_SUMMARY_INTERVAL,
    8,
  ),
  recentMessageWindow: numberFromEnv(process.env.RECENT_MESSAGE_WINDOW, 12),
};

export const serverConfig: serverConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  env: process.env.NODE_ENV || "development",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5433/notebook_lm",
  betterAuthUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  betterAuthSecret: process.env.BETTER_AUTH_SECRET || "secret",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "google_client_id",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET || "google_client_secret",
};
