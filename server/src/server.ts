import { initializeApp } from "./app.js";
import { serverConfig } from "./config/index.js";
import prisma from "./lib/db/client.js";

const app = initializeApp();

async function start() {
    await prisma.$queryRaw`SELECT 1`;

    const server = app.listen(serverConfig.port, () => {
        console.log(`Server is running on port ${serverConfig.port}`);
    });

    let shuttingDown = false;

    const shutdown = (signal: string) => {
        if (shuttingDown) return;
        shuttingDown = true;

        console.log(`${signal} received, shutting down`);

        const forceExit = setTimeout(() => {
            console.error("Shutdown timed out");
            process.exit(1);
        }, 10_000);
        forceExit.unref();

        server.close(async (error) => {
            if (error) {
                console.error("Error while closing HTTP server", error);
            }

            try {
                await prisma.$disconnect();
                clearTimeout(forceExit);
                process.exit(error ? 1 : 0);
            } catch (disconnectError) {
                console.error("Error while disconnecting database", disconnectError);
                process.exit(1);
            }
        });
    };

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch(async (error) => {
    console.error("Failed to start server", error);
    await prisma.$disconnect().catch(() => undefined);
    process.exit(1);
});
