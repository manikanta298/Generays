import { useState } from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const [reset] = useState(0);
  void reset;
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-bold">This page didn&apos;t load.</h1>
        <p className="mt-3 text-muted-foreground">Please try again. If the problem continues, return to the GeneRays home page.</p>
        <Link to="/" className="mt-7 inline-flex rounded-sm border border-border px-5 py-3 text-sm font-semibold">Go home</Link>
      </div>
    </main>
  );
}
