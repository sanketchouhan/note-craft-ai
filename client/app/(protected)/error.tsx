"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProtectedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex max-w-sm flex-col gap-2">
        <h1 className="text-lg font-medium">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          This page could not be loaded. You can try again or return to the
          dashboard.
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
