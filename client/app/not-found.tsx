import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex max-w-sm flex-col gap-2">
        <h1 className="text-lg font-medium">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          That page does not exist or is no longer available.
        </p>
      </div>
      <Button render={<Link href="/dashboard" />}>Go to dashboard</Button>
    </div>
  );
}
