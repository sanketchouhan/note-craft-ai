import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { serverConfig } from "../../config/index.js";
import prisma from "../db/client.js";

export const auth = betterAuth({
    baseURL: serverConfig.betterAuthUrl,
    secret: serverConfig.betterAuthSecret,
    trustedOrigins: [serverConfig.betterAuthUrl],
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        google: {
            clientId: serverConfig.googleClientId,
            clientSecret: serverConfig.googleClientSecret,
        },
    }
});