import { apiFetch } from "@/shared/lib/api";
import type {
    CreateMemoryInput,
    UpdateMemoryInput,
    UserMemory,
} from "./types";

export function listMemories() {
    return apiFetch<UserMemory[]>("/api/memories");
}

export function createMemory(input: CreateMemoryInput) {
    return apiFetch<UserMemory>("/api/memories", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export function updateMemory(memoryId: string, input: UpdateMemoryInput) {
    return apiFetch<UserMemory>(`/api/memories/${memoryId}`, {
        method: "PATCH",
        body: JSON.stringify(input),
    });
}

export function deleteMemory(memoryId: string) {
    return apiFetch<void>(`/api/memories/${memoryId}`, {
        method: "DELETE",
    });
}
