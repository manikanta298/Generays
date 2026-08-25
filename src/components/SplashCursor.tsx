import { useEffect, useRef } from 'react';
import './SplashCursor.css';

/**
 * Lightweight splash cursor based on the supplied interactive-fluid direction.
 * It keeps the visual language of the effect while prioritising readability and
 * performance over a full-screen simulation on every device.
 */
type SplashCursorProps = {
  color?: string;
  secondaryColor?: string;
  strength?: number;
};

export default function SplashCursor({
  color = '#65e6ff',
  secondaryColor = '#8b5cf6',
  strength = 0.55,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canvas || !finePointer || reducedMotion) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const blobs: Array<{ x:number; y:number; dx:number; dy:number; life:number; radius:number; hue:number }> = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addBlob = (x: number, y: number, dx = 0, dy = 0) => {
      blobs.push({
        x,
        y,
        dx: dx * 0.35,
        dy: dy * 0.35,
        life: 1,
        radius: 52 + Math.random() * 42,
        hue: Math.random(),
      });
      if (blobs.length > 8) blobs.shift();
    };

    const move = (event: PointerEvent) => {
      const previous = pointerRef.current;
      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      const distance = Math.hypot(dx, dy);

      if (previous.active && distance > 6) {
        addBlob(event.clientX, event.clientY, dx, dy);
      }

      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    };

    const down = (event: PointerEvent) => addBlob(event.clientX, event.clientY);

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      for (let i = blobs.length - 1; i >= 0; i -= 1) {
        const blob = blobs[i];
        blob.x += blob.dx * 0.035;
        blob.y += blob.dy * 0.035;
        blob.dx *= 0.91;
        blob.dy *= 0.91;
        blob.life *= 0.955;
        blob.radius *= 0.998;

        if (blob.life < 0.035) {
          blobs.splice(i, 1);
          continue;
        }

        const chosen = blob.hue > 0.5 ? secondaryColor : color;
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius,
        );
        const alpha = Math.min(0.13 * strength, 0.14) * blob.life;
        const hexAlpha = Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, '0');

        gradient.addColorStop(0, `${chosen}${hexAlpha}`);
        gradient.addColorStop(1, `${chosen}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
    };
  }, [color, secondaryColor, strength]);

  return <canvas ref={canvasRef} className="splash-cursor" aria-hidden="true" />;
}
