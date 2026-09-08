import { useEffect, useState } from "react";

const DESKTOP_VIDEO = "/loading/desktop.mp4";
const MOBILE_VIDEO = "/loading/mobile.mp4";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const fallback = window.setTimeout(() => setVisible(false), 8000);
    return () => window.clearTimeout(fallback);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loading" role="status" aria-label="Loading GeneRays">
      <video
        className="site-loading__video site-loading__video--desktop"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVisible(false)}
      >
        <source src={DESKTOP_VIDEO} type="video/mp4" />
      </video>

      <video
        className="site-loading__video site-loading__video--mobile"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVisible(false)}
      >
        <source src={MOBILE_VIDEO} type="video/mp4" />
      </video>

      <div className="site-loading__fallback" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
