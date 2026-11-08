import { z } from "zod";
import { aiConfig } from "../config/index.js";
import { workspaceIdParamSchema } from "./workspace.validator.js";

const { chatModels } = aiConfig;

export const conversationIdParamSchema = workspaceIdParamSchema.extend({
  conversationId: z.string().trim().min(1, "Conversation id is required"),
});

export const chatBodySchema = z.object({
  conversationId: z.string().trim().min(1).optional(),
  messages: z.array(z.record(z.string(), z.unknown())).min(1),
  model: z.enum(chatModels as [string, ...string[]]).optional(),
  webSearch: z.boolean().optional(),
});

export type ChatBody = z.infer<typeof chatBodySchema>;

export const createConversationSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;
