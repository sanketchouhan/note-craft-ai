import express from "express";
import { toNodeHandler } from "better-auth/node";
import { serve } from "inngest/express";
import { auth } from "./lib/auth/auth.js";
import cors from "cors";
import { serverConfig } from "./config/index.js";
import { inngest } from "./inngest/client.js";
import { functions } from "./inngest/index.js";
import { apiRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";


export const initializeApp = () => {
    const clientUrl = serverConfig.betterAuthUrl;

    const app = express();

    app.use(
        cors({
            origin: clientUrl,
            credentials: true,
        }),
    );

    app.all('/api/auth/{*any}', toNodeHandler(auth));

    app.use(express.json());

    app.use(
        "/api/inngest",
        serve({
            client: inngest,
            functions,
        }),
    );

    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.get("/health", (req, res) => {
        res.status(200).json({ message: "OK", timestamp: new Date().toISOString() });
    });

    app.use("/api", apiRoutes);

    app.use(errorHandler);
    
    return app;
}