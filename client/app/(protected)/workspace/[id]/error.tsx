"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkspaceError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex max-w-sm flex-col gap-2">
        <h1 className="text-lg font-medium">Workspace could not be loaded</h1>
        <p className="text-sm text-muted-foreground">
          Something went wrong while opening this workspace.
        </p>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Try again
        </Button>
        <Button render={<Link href="/dashboard" />}>Dashboard</Button>
      </div>
    </div>
  );
}
