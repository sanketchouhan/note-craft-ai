import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceLoading() {
  return (
    <div className="flex min-h-svh">
      <div className="hidden w-64 flex-col gap-3 border-r p-4 md:flex">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-full min-h-80 w-full" />
      </div>
    </div>
  );
}
