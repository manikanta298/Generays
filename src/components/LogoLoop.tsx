"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type Key, type ReactNode } from 'react';
import './LogoLoop.css';


export type LogoItem = {
  node?: ReactNode;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value ?? undefined);

function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 36,
  gap = 42,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const [sequenceSize, setSequenceSize] = useState(0);
  const [copyCount, setCopyCount] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === 'up' || direction === 'down';
  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical ? (direction === 'up' ? 1 : -1) : direction === 'left' ? 1 : -1;
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = seqRef.current;
    if (!container || !sequence) return;
    const rect = sequence.getBoundingClientRect();
    const size = isVertical ? rect.height : rect.width;
    if (size <= 0) return;
    setSequenceSize(Math.ceil(size));
    const viewport = isVertical ? container.clientHeight : container.clientWidth;
    setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(viewport / size) + ANIMATION_CONFIG.COPY_HEADROOM));
  }, [isVertical]);

  useEffect(() => {
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateDimensions) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);
    if (ro && seqRef.current) ro.observe(seqRef.current);
    updateDimensions();
    return () => ro?.disconnect();
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current == null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1000);
      lastTimestampRef.current = timestamp;
      const target = isHovered ? effectiveHoverSpeed : targetVelocity;
      const easing = 1 - Math.exp(-delta / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;
      if (sequenceSize > 0) {
        offsetRef.current = ((offsetRef.current + velocityRef.current * delta) % sequenceSize + sequenceSize) % sequenceSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, effectiveHoverSpeed, isHovered, isVertical, sequenceSize]);

  const renderLogoItem = useCallback((item: LogoItem, key: Key) => {
    if (renderItem) return <li className="logoloop__item" key={key}>{renderItem(item, key)}</li>;
    const content = item.node ? (
      <span className="logoloop__node" aria-hidden={Boolean(item.href && !item.ariaLabel)}>{item.node}</span>
    ) : (
      <Image src={item.src ?? ""} sizes={item.sizes ?? "auto"} width={item.width ?? 36} height={item.height ?? 36} alt={item.alt ?? ""} title={item.title} loading="lazy" unoptimized draggable={false} />
    );
    return (
      <li className="logoloop__item" key={key}>
        {item.href ? <a className="logoloop__link" href={item.href} aria-label={item.ariaLabel ?? item.title ?? item.alt ?? 'logo link'} target="_blank" rel="noreferrer noopener">{content}</a> : content}
      </li>
    );
  }, [renderItem]);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul className="logoloop__list" key={`copy-${copyIndex}`} aria-hidden={copyIndex > 0} ref={copyIndex === 0 ? seqRef : undefined}>
      {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem]);

  const rootClassName = ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal', fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className].filter(Boolean).join(' ');
  const cssVariables = { '--logoloop-gap': `${gap}px`, '--logoloop-logoHeight': `${logoHeight}px`, ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}) };

  return (
    <div ref={containerRef} className={rootClassName} style={{ width: isVertical ? toCssLength(width) === '100%' ? undefined : toCssLength(width) : toCssLength(width) ?? '100%', ...cssVariables, ...style } as CSSProperties} role="region" aria-label={ariaLabel} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="logoloop__track" ref={trackRef}>{logoLists}</div>
    </div>
  );
}

export default memo(LogoLoop);
