import { createAuthClient } from "better-auth/react";
import { appUrl } from "@/lib/config";

export const authClient = createAuthClient({
  baseURL: appUrl,
});

export const { signIn, signOut, useSession } = authClient;
