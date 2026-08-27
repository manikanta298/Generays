import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="hero-spline-loader" role="status" aria-label="Loading 3D experience">
          <span className="hero-spline-loader__dot" aria-hidden="true" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
