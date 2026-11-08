import { Router } from "express";
import { memoryRoutes } from "./memory.route.js";
import { workspaceRoutes } from "./workspace.route.js";

export const apiRoutes = Router();

apiRoutes.use("/workspaces", workspaceRoutes);
apiRoutes.use("/memories", memoryRoutes);
