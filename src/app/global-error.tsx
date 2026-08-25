 "use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui" }}>
          <div style={{ maxWidth: 520, textAlign: "center" }}>
            <h1>GeneRays could not load</h1>
            <p>Please retry the page. If the problem persists, check the server logs.</p>
            <button onClick={() => reset()} style={{ marginTop: 16, padding: "10px 16px" }}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}
