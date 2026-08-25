import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 / Route not found</p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-muted-foreground">The route you requested could not be found. Return to GeneRays and continue exploring.</p>
        <Link to="/" className="mt-7 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Go home</Link>
      </div>
    </main>
  );
}
