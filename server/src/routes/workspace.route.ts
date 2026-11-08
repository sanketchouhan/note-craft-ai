import { Router } from "express";
import {
    createWorkspace,
    deleteWorkspace,
    getWorkspace,
    listWorkspaces,
    updateWorkspace,
} from "../controllers/workspace.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async.handler.js";
import { artifactRoutes } from "./artifact.route.js";
import { chatRoutes, conversationRoutes } from "./conversation.route.js";
import { sourceRoutes } from "./source.route.js";

export const workspaceRoutes = Router();

workspaceRoutes.use(requireAuth);

workspaceRoutes.get("/", asyncHandler(listWorkspaces));
workspaceRoutes.post("/", asyncHandler(createWorkspace));
workspaceRoutes.use("/:workspaceId/sources", sourceRoutes);
workspaceRoutes.use("/:workspaceId/conversations", conversationRoutes);
workspaceRoutes.use("/:workspaceId/artifacts", artifactRoutes);
workspaceRoutes.use("/:workspaceId/chat", chatRoutes)
workspaceRoutes.get("/:workspaceId", asyncHandler(getWorkspace));
workspaceRoutes.patch("/:workspaceId", asyncHandler(updateWorkspace));
workspaceRoutes.delete("/:workspaceId", asyncHandler(deleteWorkspace));