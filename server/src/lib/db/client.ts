import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { serverConfig } from "../../config/index.js";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
    const pool = new Pool({
        connectionString: serverConfig.databaseUrl,
    });

    const adapter = new PrismaPg(pool);

    return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (serverConfig.env !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;