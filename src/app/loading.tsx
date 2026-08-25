export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-pulse rounded-md bg-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading GeneRays…</p>
      </div>
    </div>
  );
}
