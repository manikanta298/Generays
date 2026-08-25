 "use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("GeneRays application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-bold">This page didn&apos;t load.</h1>
        <p className="mt-3 text-muted-foreground">Please try again. If the problem continues, return to the GeneRays home page.</p>
        <div className="mt-7 flex justify-center gap-3">
          <button onClick={() => reset()} className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Try again</button>
          <Link href="/" className="rounded-sm border border-border px-5 py-3 text-sm font-semibold">Go home</Link>
        </div>
      </div>
    </main>
  );
}
