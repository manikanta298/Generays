import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useMemo, useRef, useState } from "react";

type GL = Renderer["gl"];

type CircularGalleryItem = {
  image: string;
  text: string;
};

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  autoRotateSpeed?: number;
  onSelect?: (item: CircularGalleryItem) => void;
}

type Viewport = { width: number; height: number };
type ScreenSize = { width: number; height: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type TextTexture = { texture: Texture; width: number; height: number };

function createTextTexture(
  gl: GL,
  text: string,
  font: string,
  color: string,
  cache?: Map<string, TextTexture>
): TextTexture {
  const cacheKey = `${text}__${font}__${color}`;
  const cached = cache?.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("CircularGallery: unable to create a text canvas.");
  }

  ctx.font = font;
  const measured = Math.ceil(ctx.measureText(text).width);
  const sizeMatch = font.match(/(\d+)px/);
  const fontSize = sizeMatch ? Number(sizeMatch[1]) : 30;
  const width = Math.max(40, measured + 28);
  const height = Math.max(32, Math.ceil(fontSize * 1.35));

  canvas.width = width;
  canvas.height = height;

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.clearRect(0, 0, width, height);
  ctx.fillText(text, width / 2, height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  const result: TextTexture = { texture, width, height };
  cache?.set(cacheKey, result);
  return result;
}

class Media {
  private geometry!: Plane;
  private gl!: GL;
  private image!: string;
  private scene!: Transform;
  private screen!: ScreenSize;
  private viewport!: Viewport;
  private bend!: number;
  private text!: string;
  private textColor!: string;
  private borderRadius!: number;
  private font!: string;
  private index!: number;
  private count!: number;
  private x = 0;
  private extra = 0;
  private width = 0;
  private widthTotal = 0;
  private plane!: Mesh;
  private program!: Program;
  private imageCache?: Map<string, HTMLImageElement>;
  private labelCache?: Map<string, TextTexture>;

  constructor(args: {
    geometry: Plane;
    gl: GL;
    image: string;
    text: string;
    textColor: string;
    borderRadius: number;
    font: string;
    scene: Transform;
    screen: ScreenSize;
    viewport: Viewport;
    bend: number;
    index: number;
    count: number;
    imageCache?: Map<string, HTMLImageElement>;
    labelCache?: Map<string, TextTexture>;
  }) {
    Object.assign(this, args);
    this.createShader();
    this.createMesh();
    this.createLabel();
    this.onResize();
  }

  private createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    texture.image = new Uint8Array([0, 0, 0, 0]);

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (
            sin(p.x * 4.0 + uTime) * 1.25 +
            cos(p.y * 2.0 + uTime) * 1.25
          ) * (0.08 + abs(uSpeed) * 0.42);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0)))
            + min(max(d.x, d.y), 0.0)
            - r;
        }

        void main() {
          vec2 safeImage = max(uImageSizes, vec2(1.0));
          vec2 safePlane = max(uPlaneSizes, vec2(1.0));

          vec2 ratio = vec2(
            min((safePlane.x / safePlane.y) / (safeImage.x / safeImage.y), 1.0),
            min((safePlane.y / safePlane.x) / (safeImage.y / safeImage.x), 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(
            vUv - 0.5,
            vec2(0.5 - uBorderRadius),
            uBorderRadius
          );

          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uImageSizes: { value: [1, 1] },
        uPlaneSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: this.borderRadius },
      },
    });

    const applyImage = (img: HTMLImageElement) => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth || img.width, img.naturalHeight || img.height];
    };

    const cached = this.imageCache?.get(this.image);
    if (cached) {
      // Already fetched + decoded by preloadImages — no second network
      // request or decode, so the texture upload happens immediately.
      applyImage(cached);
      return;
    }

    // Fallback path (cache miss, e.g. items changed after mount): fetch it.
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = this.image;
    img.onload = () => applyImage(img);
  }

  private createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  private createLabel() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font || "bold 26px Inter, system-ui, sans-serif",
      this.textColor,
      this.labelCache
    );

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.05) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
    });

    const mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.13;
    mesh.scale.set(textHeight * aspect, textHeight, 1);
    mesh.position.y = -this.plane.scale.y * 0.58;
    mesh.setParent(this.plane);
  }

  getHitDistance(clientX: number, clientY: number, rect: DOMRect) {
    const worldX = ((clientX - rect.left) / this.screen.width - 0.5) * this.viewport.width;
    const worldY = (0.5 - (clientY - rect.top) / this.screen.height) * this.viewport.height;
    const dx = (worldX - this.plane.position.x) / Math.max(this.plane.scale.x / 2, 0.001);
    const dy = (worldY - this.plane.position.y) / Math.max(this.plane.scale.y / 2, 0.001);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= 1.15 ? distance : Infinity;
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right", deltaSeconds: number) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfWidth = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bend = Math.abs(this.bend);
      const radius = (halfWidth * halfWidth + bend * bend) / (2 * bend);
      const effectiveX = Math.min(Math.abs(x), halfWidth);
      const arc = radius - Math.sqrt(Math.max(0, radius * radius - effectiveX * effectiveX));
      const angle = Math.asin(Math.min(0.999999, effectiveX / radius));

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * angle;
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * angle;
      }
    }

    const speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += deltaSeconds * 1.8;
    this.program.uniforms.uSpeed.value = speed;

    const halfPlane = this.plane.scale.x / 2;
    const before = this.plane.position.x + halfPlane < -halfWidth;
    const after = this.plane.position.x - halfPlane > halfWidth;

    if (direction === "right" && before) {
      this.extra -= this.widthTotal;
    }

    if (direction === "left" && after) {
      this.extra += this.widthTotal;
    }
  }

  onResize(screen?: ScreenSize, viewport?: Viewport) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (820 * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (640 * scale)) / this.screen.width;

    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    const padding = 2.25;
    this.width = this.plane.scale.x + padding;
    this.widthTotal = this.width * this.count;
    this.x = this.width * this.index;
  }
}

class CircularGalleryApp {
  private container: HTMLElement;
  private renderer: Renderer;
  private gl!: GL;
  private camera: Camera;
  private scene!: Transform;
  private geometry!: Plane;
  private medias: Media[] = [];
  private items: CircularGalleryItem[];
  private onSelect?: (item: CircularGalleryItem) => void;
  private scroll = { current: 0, target: 0, last: 0 };
  private scrollSpeed: number;
  private scrollEase: number;
  private autoRotateSpeed: number;
  private raf = 0;
  private pointerDown = false;
  private suppressNextClick = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartScroll = 0;
  private lastTime = 0;
  private screen: ScreenSize = { width: 1, height: 1 };
  private viewport: Viewport = { width: 1, height: 1 };

  constructor(
    container: HTMLElement,
    {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      autoRotateSpeed,
      onSelect,
      imageCache,
    }: Required<Pick<CircularGalleryProps, "bend" | "textColor" | "borderRadius" | "font" | "scrollSpeed" | "scrollEase" | "autoRotateSpeed">> & {
      items: CircularGalleryItem[];
      onSelect?: (item: CircularGalleryItem) => void;
      imageCache?: Map<string, HTMLImageElement>;
    }
  ) {
    this.container = container;
    this.items = items;
    this.onSelect = onSelect;
    this.scrollSpeed = scrollSpeed;
    this.scrollEase = scrollEase;
    this.autoRotateSpeed = autoRotateSpeed;

    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;

    this.scene = new Transform();
    this.geometry = new Plane(this.gl, {
      widthSegments: 80,
      heightSegments: 40,
    });

    const galleryItems = [...items, ...items];

    // Shared across every Media instance: the two "copies" of each item
    // (needed for the seamless infinite-scroll loop) reuse the same
    // decoded image and the same rasterized label texture instead of
    // paying the decode/canvas cost twice per item.
    const labelCache = new Map<string, TextTexture>();

    this.updateSize();

    this.medias = galleryItems.map(
      (item, index) =>
        new Media({
          geometry: this.geometry,
          gl: this.gl,
          image: item.image,
          text: item.text,
          textColor,
          borderRadius,
          font,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
          bend,
          index,
          count: galleryItems.length,
          imageCache,
          labelCache,
        })
    );

    this.bindEvents();
    this.lastTime = performance.now();
    this.animate(this.lastTime);
  }

  private updateSize = () => {
    const rect = this.container.getBoundingClientRect();
    this.screen = {
      width: Math.max(1, Math.floor(rect.width)),
      height: Math.max(1, Math.floor(rect.height)),
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = {
      width: height * this.camera.aspect,
      height,
    };

    this.medias.forEach((media) => media.onResize(this.screen, this.viewport));
  };

  private animate = (time: number) => {
    const deltaSeconds = Math.min(0.05, Math.max(0, (time - this.lastTime) / 1000));
    this.lastTime = time;

    if (!this.pointerDown && this.autoRotateSpeed) {
      // Automatic motion is intentionally linear: distance travelled is
      // proportional to elapsed time, so the gallery never speeds up/slows
      // down because of the easing curve.
      this.scroll.target += this.autoRotateSpeed * deltaSeconds;
      this.scroll.current = this.scroll.target;
    } else {
      // Manual wheel/drag interaction keeps the existing smooth easing.
      const easing = 1 - Math.pow(1 - this.scrollEase, deltaSeconds * 60);
      this.scroll.current = lerp(this.scroll.current, this.scroll.target, easing);
    }

    const direction = this.scroll.current >= this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction, deltaSeconds));

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.animate);
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY || event.deltaX;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.24;
  };

  private onPointerDown = (event: PointerEvent) => {
    this.pointerDown = true;
    this.suppressNextClick = false;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragStartScroll = this.scroll.target;
    this.container.setPointerCapture?.(event.pointerId);
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    const distance = event.clientX - this.dragStartX;
    this.scroll.target = this.dragStartScroll - distance * (this.scrollSpeed * 0.025);
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    this.pointerDown = false;

    const moved = Math.hypot(event.clientX - this.dragStartX, event.clientY - this.dragStartY);
    // A drag should never also activate the gallery click action.
    this.suppressNextClick = moved > 8;
  };

  private onClick = (event: MouseEvent) => {
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }

    const rect = this.container.getBoundingClientRect();
    let bestDistance = Infinity;
    let bestIndex = -1;

    this.medias.forEach((media, index) => {
      const distance = media.getHitDistance(event.clientX, event.clientY, rect);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index % this.items.length;
      }
    });

    if (bestIndex >= 0 && Number.isFinite(bestDistance)) {
      this.onSelect?.(this.items[bestIndex]);
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.scroll.target += this.scrollSpeed * 5;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.scroll.target -= this.scrollSpeed * 5;
    }
  };

  private bindEvents() {
    window.addEventListener("resize", this.updateSize, { passive: true });
    this.container.addEventListener("wheel", this.onWheel, { passive: false });
    this.container.addEventListener("pointerdown", this.onPointerDown);
    this.container.addEventListener("pointermove", this.onPointerMove);
    this.container.addEventListener("pointerup", this.onPointerUp);
    this.container.addEventListener("pointercancel", this.onPointerUp);
    this.container.addEventListener("click", this.onClick);
    this.container.addEventListener("keydown", this.onKeyDown);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.updateSize);
    this.container.removeEventListener("wheel", this.onWheel);
    this.container.removeEventListener("pointerdown", this.onPointerDown);
    this.container.removeEventListener("pointermove", this.onPointerMove);
    this.container.removeEventListener("pointerup", this.onPointerUp);
    this.container.removeEventListener("pointercancel", this.onPointerUp);
    this.container.removeEventListener("click", this.onClick);
    this.container.removeEventListener("keydown", this.onKeyDown);

    if (this.gl.canvas.parentElement === this.container) {
      this.container.removeChild(this.gl.canvas);
    }
  }
}

const DEFAULT_ITEMS: CircularGalleryItem[] = [
  { image: "https://picsum.photos/seed/1/900/700", text: "Bridge" },
  { image: "https://picsum.photos/seed/2/900/700", text: "Desk Setup" },
  { image: "https://picsum.photos/seed/3/900/700", text: "Waterfall" },
  { image: "https://picsum.photos/seed/4/900/700", text: "Strawberries" },
  { image: "https://picsum.photos/seed/5/900/700", text: "Deep Diving" },
  { image: "https://picsum.photos/seed/16/900/700", text: "Train Track" },
  { image: "https://picsum.photos/seed/17/900/700", text: "Santorini" },
];

function resolveFontSize(font: string) {
  const match = font.match(/(\d+)px/);
  return match ? Number(match[1]) : 30;
}

async function prepareFont(font: string, fontUrl?: string) {
  if (!fontUrl || !document.fonts?.load) return;

  try {
    if (fontUrl.includes("fonts.googleapis.com")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);

      const family = (font.match(/px\s+(.+)$/)?.[1] || "").replace(/["']/g, "");
      if (family) {
        await document.fonts.load(`bold ${resolveFontSize(font)}px "${family}"`);
      }
    } else {
      const family = `CircularGalleryFont-${Math.random().toString(36).slice(2, 7)}`;
      const face = new FontFace(family, `url(${fontUrl})`);
      await face.load();
      document.fonts.add(face);
    }
  } catch (error) {
    console.warn("CircularGallery: font preload failed; using fallback.", error);
  }
}

async function preloadImages(items: CircularGalleryItem[]) {
  const cache = new Map<string, HTMLImageElement>();
  const uniqueUrls = Array.from(new Set(items.map((item) => item.image)));

  await Promise.allSettled(
    uniqueUrls.map(async (url) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.decoding = "async";
      image.src = url;
      try {
        // decode() resolves only once the image is fully decoded, so the
        // texImage2D upload that happens when Media assigns texture.image
        // doesn't have to decode on the fly and stall the main thread.
        await image.decode();
      } catch {
        // Decode failed (e.g. broken URL) — Media falls back to its own
        // fetch, so it's fine to leave this one out of the cache.
        return;
      }
      cache.set(url, image);
    })
  );

  return cache;
}

export default function CircularGallery({
  items = DEFAULT_ITEMS,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree",
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
  autoRotateSpeed = 3.25,
  onSelect,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  const [selectedItem, setSelectedItem] = useState<CircularGalleryItem | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!selectedItem) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedItem]);

  const safeItems = useMemo(
    () => (items.length ? items : DEFAULT_ITEMS),
    [items]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let app: CircularGalleryApp | null = null;
    let cancelled = false;

    const start = async () => {
      const [, imageCache] = await Promise.all([
        prepareFont(font, fontUrl),
        preloadImages(safeItems),
      ]);
      if (cancelled || !containerRef.current) return;

      try {
        app = new CircularGalleryApp(container, {
          items: safeItems,
          bend,
          textColor,
          borderRadius,
          font,
          scrollSpeed,
          scrollEase,
          autoRotateSpeed,
          imageCache,
          onSelect: (item) => {
            setSelectedItem(item);
            onSelectRef.current?.(item);
          },
        });
      } catch (error) {
        console.error("CircularGallery: WebGL initialization failed.", error);
      }
    };

    start();

    return () => {
      cancelled = true;
      app?.destroy();
    };
  }, [safeItems, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, autoRotateSpeed]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
        tabIndex={0}
        role="region"
        aria-label="Circular image gallery. Automatically rotating. Click an image to view it larger. Use mouse wheel, drag, or Left and Right Arrow keys to navigate."
        style={{ touchAction: "pan-y", contain: "layout paint" }}
      />

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.text} image preview`}
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(0, 0, 0, 0.78)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(92vw, 1100px)",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close image preview"
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                width: "42px",
                height: "42px",
                border: "1px solid rgba(255,255,255,.35)",
                borderRadius: "999px",
                background: "rgba(15,23,42,.9)",
                color: "#fff",
                fontSize: "24px",
                lineHeight: 1,
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              ×
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.text}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "78vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
            <div
              style={{
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {selectedItem.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
