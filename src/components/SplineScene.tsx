import { Suspense, lazy, useEffect, useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const LoaderFallback = (
  <div className="hero-spline-loader" role="status" aria-label="Loading 3D experience">
    <span className="hero-spline-loader__dot" aria-hidden="true" />
  </div>
);

export function SplineScene({ scene, className }: SplineSceneProps) {
  // The Spline runtime pulls in a full 3D engine (physics, WebGPU renderer,
  // particles, etc.) — several MB across chunks. It's decorative, so we
  // defer starting that download until the browser is idle, letting fonts,
  // hero text, and other above-the-fold critical resources load first
  // instead of competing with a multi-megabyte 3D bundle on every visit.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    // Safari/older browsers: fall back to a short timeout instead.
    const timer = window.setTimeout(() => setShouldLoad(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldLoad) return LoaderFallback;

  return (
    <Suspense fallback={LoaderFallback}>
      <LazySpline scene={scene} className={className} />
    </Suspense>
  );
}

const LazySpline = lazy(() => import("@splinetool/react-spline"));
