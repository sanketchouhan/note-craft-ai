/** Public origin of this Next.js app. Auth cookies and callbacks use it. */
export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** Express API. Rewrites and server-side fetches use it. */
export const apiUrl = process.env.API_URL ?? "http://localhost:8080";
