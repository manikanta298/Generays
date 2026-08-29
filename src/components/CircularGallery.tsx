import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useMemo, useRef, useState } from "react";

type GL = Renderer["gl"];
type GalleryItem = { image: string; text: string };

export interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  autoRotateSpeed?: number;
  onSelect?: (item: GalleryItem) => void;
}

type Viewport = { width: number; height: number };
type Screen = { width: number; height: number };

const DEFAULT_ITEMS: GalleryItem[] = [
  { image: "https://picsum.photos/seed/1/900/700", text: "Bridge" },
  { image: "https://picsum.photos/seed/2/900/700", text: "Desk Setup" },
  { image: "https://picsum.photos/seed/3/900/700", text: "Waterfall" },
  { image: "https://picsum.photos/seed/4/900/700", text: "Strawberries" },
  { image: "https://picsum.photos/seed/5/900/700", text: "Deep Diving" },
  { image: "https://picsum.photos/seed/16/900/700", text: "Train Track" },
  { image: "https://picsum.photos/seed/17/900/700", text: "Santorini" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeTextTexture(gl: GL, text: string, font: string, color: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("CircularGallery: unable to create text canvas.");
  ctx.font = font;
  const width = Math.max(40, Math.ceil(ctx.measureText(text).width) + 28);
  const size = Number(font.match(/(\d+)px/)?.[1] || 30);
  const height = Math.max(32, Math.ceil(size * 1.35));
  canvas.width = width;
  canvas.height = height;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width, height };
}

class Media {
  private plane!: Mesh;
  private program!: Program;
  private x = 0;
  private extra = 0;
  private width = 0;
  private widthTotal = 0;
  constructor(
    private readonly geometry: Plane,
    private readonly gl: GL,
    private readonly scene: Transform,
    private readonly image: string,
    private readonly text: string,
    private readonly textColor: string,
    private readonly borderRadius: number,
    private readonly font: string,
    private readonly bend: number,
    private readonly index: number,
    private readonly count: number,
    private screen: Screen,
    private viewport: Viewport,
  ) {
    this.create();
  }

  private create() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    texture.image = new Uint8Array([0, 0, 0, 0]);
    this.program = new Program(this.gl, {
      transparent: true,
      depthTest: false,
      depthWrite: false,
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
          p.z = (sin(p.x * 4.0 + uTime) * 1.25 + cos(p.y * 2.0 + uTime) * 1.25) * (0.08 + abs(uSpeed) * 0.42);
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
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 image = max(uImageSizes, vec2(1.0));
          vec2 plane = max(uPlaneSizes, vec2(1.0));
          vec2 ratio = vec2(
            min((plane.x / plane.y) / (image.x / image.y), 1.0),
            min((plane.y / plane.x) / (image.y / image.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
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
        uBorderRadius: { value: borderRadius },
      },
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth || img.width, img.naturalHeight || img.height];
    };

    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);

    const label = makeTextTexture(this.gl, this.text, this.font, this.textColor);
    const labelProgram = new Program(this.gl, {
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.05)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: label.texture } },
    });
    const labelMesh = new Mesh(this.gl, { geometry: new Plane(this.gl), program: labelProgram });
    const aspect = label.width / label.height;
    const textHeight = this.plane.scale.y * 0.13;
    labelMesh.scale.set(textHeight * aspect, textHeight, 1);
    labelMesh.position.y = -this.plane.scale.y * 0.58;
    labelMesh.setParent(this.plane);
  }

  resize(screen: Screen, viewport: Viewport) {
    this.screen = screen;
    this.viewport = viewport;
    const scale = screen.height / 1500;
    this.plane.scale.y = (viewport.height * (820 * scale)) / screen.height;
    this.plane.scale.x = (viewport.width * (640 * scale)) / screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 2.25;
    this.widthTotal = this.width * this.count;
    this.x = this.width * this.index;
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right", delta: number) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const half = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bend = Math.abs(this.bend);
      const radius = (half * half + bend * bend) / (2 * bend);
      const effective = Math.min(Math.abs(x), half);
      const arc = radius - Math.sqrt(Math.max(0, radius * radius - effective * effective));
      const angle = Math.asin(Math.min(0.999999, effective / radius));
      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = this.bend > 0 ? -Math.sign(x) * angle : Math.sign(x) * angle;
    }
    const speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += delta * 1.8;
    this.program.uniforms.uSpeed.value = speed;
    const halfPlane = this.plane.scale.x / 2;
    if (direction === "right" && this.plane.position.x + halfPlane < -half) this.extra -= this.widthTotal;
    if (direction === "left" && this.plane.position.x - halfPlane > half) this.extra += this.widthTotal;
  }

  hit(clientX: number, clientY: number, rect: DOMRect) {
    const worldX = ((clientX - rect.left) / this.screen.width - 0.5) * this.viewport.width;
    const worldY = (0.5 - (clientY - rect.top) / this.screen.height) * this.viewport.height;
    const dx = (worldX - this.plane.position.x) / Math.max(this.plane.scale.x / 2, 0.001);
    const dy = (worldY - this.plane.position.y) / Math.max(this.plane.scale.y / 2, 0.001);
    const distance = Math.hypot(dx, dy);
    return distance <= 1.15 ? distance : Infinity;
  }

  destroy() {}
}

class GalleryApp {
  private renderer: Renderer;
  private gl: GL;
  private camera: Camera;
  private scene: Transform;
  private geometry: Plane;
  private medias: Media[] = [];
  private scroll = { current: 0, target: 0, last: 0 };
  private raf = 0;
  private pointerDown = false;
  private suppressClick = false;
  private dragX = 0;
  private dragY = 0;
  private dragScroll = 0;
  private lastTime = 0;
  private screen: Screen = { width: 1, height: 1 };
  private viewport: Viewport = { width: 1, height: 1 };

  constructor(private container: HTMLElement, private props: Required<Pick<CircularGalleryProps, "bend" | "textColor" | "borderRadius" | "font" | "scrollSpeed" | "scrollEase" | "autoRotateSpeed">> & { items: GalleryItem[]; onSelect?: (item: GalleryItem) => void }) {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    container.appendChild(this.gl.canvas);
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();
    this.geometry = new Plane(this.gl, { widthSegments: 80, heightSegments: 40 });
    this.resize();
    const doubled = [...props.items, ...props.items];
    this.medias = doubled.map((item, index) => new Media(this.geometry, this.gl, this.scene, item.image, item.text, props.textColor, props.borderRadius, props.font, props.bend, index, doubled.length, this.screen, this.viewport));
    this.medias.forEach((m) => m.resize(this.screen, this.viewport));
    this.bind();
    this.lastTime = performance.now();
    this.animate(this.lastTime);
  }

  private resize = () => {
    const rect = this.container.getBoundingClientRect();
    this.screen = { width: Math.max(1, Math.floor(rect.width)), height: Math.max(1, Math.floor(rect.height)) };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = this.camera.fov * Math.PI / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias.forEach((m) => m.resize(this.screen, this.viewport));
  };

  private animate = (time: number) => {
    const delta = Math.min(0.05, Math.max(0, (time - this.lastTime) / 1000));
    this.lastTime = time;
    if (!this.pointerDown && this.props.autoRotateSpeed) {
      this.scroll.target += this.props.autoRotateSpeed * delta;
      this.scroll.current = this.scroll.target;
    } else {
      const easing = 1 - Math.pow(1 - this.props.scrollEase, delta * 60);
      this.scroll.current = lerp(this.scroll.current, this.scroll.target, easing);
    }
    const direction = this.scroll.current >= this.scroll.last ? "right" : "left";
    this.medias.forEach((m) => m.update(this.scroll, direction, delta));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.animate);
  };

  private wheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY || event.deltaX;
    this.scroll.target += (delta > 0 ? this.props.scrollSpeed : -this.props.scrollSpeed) * 0.24;
  };
  private down = (event: PointerEvent) => {
    this.pointerDown = true;
    this.suppressClick = false;
    this.dragX = event.clientX;
    this.dragY = event.clientY;
    this.dragScroll = this.scroll.target;
    this.container.setPointerCapture?.(event.pointerId);
  };
  private move = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    this.scroll.target = this.dragScroll - (event.clientX - this.dragX) * (this.props.scrollSpeed * 0.025);
  };
  private up = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    this.pointerDown = false;
    this.suppressClick = Math.hypot(event.clientX - this.dragX, event.clientY - this.dragY) > 8;
  };
  private click = (event: MouseEvent) => {
    if (this.suppressClick) { this.suppressClick = false; return; }
    const rect = this.container.getBoundingClientRect();
    let best = Infinity;
    let index = -1;
    this.medias.forEach((m, i) => { const d = m.hit(event.clientX, event.clientY, rect); if (d < best) { best = d; index = i % this.props.items.length; } });
    if (index >= 0 && Number.isFinite(best)) this.props.onSelect?.(this.props.items[index]);
  };
  private key = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") { event.preventDefault(); this.scroll.target += this.props.scrollSpeed * 5; }
    if (event.key === "ArrowLeft") { event.preventDefault(); this.scroll.target -= this.props.scrollSpeed * 5; }
  };
  private bind() {
    window.addEventListener("resize", this.resize, { passive: true });
    this.container.addEventListener("wheel", this.wheel, { passive: false });
    this.container.addEventListener("pointerdown", this.down);
    this.container.addEventListener("pointermove", this.move);
    this.container.addEventListener("pointerup", this.up);
    this.container.addEventListener("pointercancel", this.up);
    this.container.addEventListener("click", this.click);
    this.container.addEventListener("keydown", this.key);
  }
  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    this.container.removeEventListener("wheel", this.wheel);
    this.container.removeEventListener("pointerdown", this.down);
    this.container.removeEventListener("pointermove", this.move);
    this.container.removeEventListener("pointerup", this.up);
    this.container.removeEventListener("pointercancel", this.up);
    this.container.removeEventListener("click", this.click);
    this.container.removeEventListener("keydown", this.key);
    if (this.gl.canvas.parentElement === this.container) this.container.removeChild(this.gl.canvas);
  }
}

function loadFont(font: string, fontUrl?: string) {
  if (!fontUrl) return Promise.resolve();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fontUrl;
  document.head.appendChild(link);
  const family = font.match(/px\s+(.+)$/)?.[1]?.replace(/[\"']/g, "");
  return family && document.fonts?.load ? document.fonts.load(`600 ${Number(font.match(/(\d+)px/)?.[1] || 30)}px \"${family}\"`).then(() => undefined) : Promise.resolve();
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
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const safeItems = useMemo(() => (items.length ? items : DEFAULT_ITEMS), [items]);

  useEffect(() => {
    if (!selected) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [selected]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let app: GalleryApp | null = null;
    let cancelled = false;
    loadFont(font, fontUrl).catch(() => undefined).then(() => {
      if (cancelled || !containerRef.current) return;
      app = new GalleryApp(container, { items: safeItems, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, autoRotateSpeed, onSelect: (item) => { setSelected(item); onSelect?.(item); } });
    }).catch((error) => console.error("CircularGallery initialization failed.", error));
    return () => { cancelled = true; app?.destroy(); };
  }, [safeItems, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, autoRotateSpeed, onSelect]);

  return (
    <>
      <div ref={containerRef} className="h-full w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing" tabIndex={0} role="region" aria-label="Circular image gallery" style={{ touchAction: "pan-y", contain: "layout paint" }} />
      {selected && (
        <div role="dialog" aria-modal="true" aria-label={`${selected.text} image preview`} onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,.78)", backdropFilter: "blur(8px)" }}>
          <div onClick={(event) => event.stopPropagation()} style={{ position: "relative", width: "min(92vw,1100px)", maxHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close image preview" style={{ position: "absolute", top: -12, right: -12, width: 42, height: 42, border: "1px solid rgba(255,255,255,.35)", borderRadius: 999, background: "rgba(15,23,42,.9)", color: "#fff", fontSize: 24, cursor: "pointer", zIndex: 2 }}>×</button>
            <img src={selected.image} alt={selected.text} style={{ display: "block", width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: 12 }} />
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: "center" }}>{selected.text}</div>
          </div>
        </div>
      )}
    </>
  );
}
