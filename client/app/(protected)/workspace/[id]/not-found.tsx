import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkspaceNotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex max-w-sm flex-col gap-2">
        <h1 className="text-lg font-medium">Workspace not found</h1>
        <p className="text-sm text-muted-foreground">
          This workspace does not exist or you no longer have access to it.
        </p>
      </div>
      <Button render={<Link href="/dashboard" />}>Back to dashboard</Button>
    </div>
  );
}
