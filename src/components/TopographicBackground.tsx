import { useEffect, useRef } from "react";

const CELL = 15;
const THRESHOLDS = [-0.5, -0.25, 0.0, 0.25, 0.5];

// Layered sines → organic noise
// Each term moves in a different quadrant so there's no net directional drift
function field(x: number, y: number, t: number): number {
  const s = 1 / 300;
  return (
    Math.sin(x * s * 1.1 + y * s * 0.7  + t * 0.24) * 0.50 +  // left+up
    Math.sin(x * s * 0.75 + y * s * 1.0 - t * 0.32) * 0.42 +  // right+down
    Math.cos(x * s * 1.7  - y * s * 0.8 + t * 0.18) * 0.30 +  // left+down
    Math.sin(x * s * 0.5  - y * s * 1.2 - t * 0.22) * 0.25 +  // right+up
    Math.cos(x * s * 0.3  + y * s * 0.5 + t * 0.09) * 0.18    // left+up (lent)
  ) / 1.65;
}

// Marching squares edge-pair lookup (edges: 0=top 1=right 2=bottom 3=left)
// Index = TL<<3 | TR<<2 | BR<<1 | BL<<0
const MS: [number, number][][] = [
  [],           [[3,2]], [[2,1]], [[3,1]],
  [[0,1]],      [[0,1],[2,3]], [[0,2]], [[0,3]],
  [[3,0]],      [[0,2]], [[3,0],[2,1]], [[0,1]],
  [[1,3]],      [[1,2]], [[3,2]], [],
];

function edgePt(
  e: number, gx: number, gy: number,
  tl: number, tr: number, br: number, bl: number,
  thr: number
): [number, number] {
  const t = (a: number, b: number) =>
    Math.max(0, Math.min(1, (thr - a) / (b - a + 1e-9)));
  switch (e) {
    case 0: return [(gx + t(tl, tr)) * CELL, gy * CELL];
    case 1: return [(gx + 1) * CELL, (gy + t(tr, br)) * CELL];
    case 2: return [(gx + t(bl, br)) * CELL, (gy + 1) * CELL];
    case 3: return [gx * CELL, (gy + t(tl, bl)) * CELL];
    default: return [0, 0];
  }
}

export function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let lastMs = 0;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - lastMs < 34) return; // ~30 fps
      lastMs = now;
      t += 0.018;

      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;

      ctx.clearRect(0, 0, W, H);

      // Build noise grid
      const grid = new Float32Array(cols * rows);
      for (let gy = 0; gy < rows; gy++)
        for (let gx = 0; gx < cols; gx++)
          grid[gy * cols + gx] = field(gx * CELL, gy * CELL, t);

      // Contour lines — collect segments for character placement
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(155, 150, 238, 0.42)";

      type Seg = { mx: number; my: number; angle: number; gx: number; gy: number; ti: number };
      const charSegs: Seg[] = [];

      for (let ti = 0; ti < THRESHOLDS.length; ti++) {
        const thr = THRESHOLDS[ti];
        ctx.beginPath();
        for (let gy = 0; gy < rows - 1; gy++) {
          for (let gx = 0; gx < cols - 1; gx++) {
            const tl = grid[gy * cols + gx];
            const tr = grid[gy * cols + gx + 1];
            const br = grid[(gy + 1) * cols + gx + 1];
            const bl = grid[(gy + 1) * cols + gx];
            const idx =
              (+(tl >= thr)) << 3 |
              (+(tr >= thr)) << 2 |
              (+(br >= thr)) << 1 |
              (+(bl >= thr));
            for (const [e1, e2] of MS[idx]) {
              const [x1, y1] = edgePt(e1, gx, gy, tl, tr, br, bl, thr);
              const [x2, y2] = edgePt(e2, gx, gy, tl, tr, br, bl, thr);
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              if ((gx + gy * 2 + ti * 5) % 2 === 0) {
                charSegs.push({
                  mx: (x1 + x2) / 2,
                  my: (y1 + y2) / 2,
                  angle: Math.atan2(y2 - y1, x2 - x1),
                  gx, gy, ti,
                });
              }
            }
          }
        }
        ctx.stroke();
      }

      // Characters at segment midpoints — mix of directional, digit, and symbol
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(155, 150, 238, 0.75)";

      const SYMBOLS = ["x", "o", "ø", "·", "+", "×", "#", "%", "@", "~"];

      for (const { mx, my, angle, gx, gy, ti } of charSegs) {
        // Stable per-position hash (not time-varying → same char family each frame)
        const h = Math.abs(Math.sin(gx * 127.1 + gy * 311.7 + ti * 73.3));
        let char: string;

        if (h < 0.35) {
          // Directional — reflects local curve slope
          const a = ((angle % Math.PI) + Math.PI) % Math.PI;
          if (a < Math.PI / 8 || a > 7 * Math.PI / 8)    char = "─";
          else if (a < 3 * Math.PI / 8)                    char = "╲";
          else if (a < 5 * Math.PI / 8)                    char = "│";
          else                                              char = "╱";
        } else if (h < 0.60) {
          // Digit — reflects local field value (animates with the field)
          const v = field(mx, my, t);
          char = String(Math.floor(Math.abs(v * 10)) % 10);
        } else {
          // Symbol from pool — stable per position
          char = SYMBOLS[Math.floor(h * SYMBOLS.length) % SYMBOLS.length];
        }

        ctx.fillText(char, mx, my);
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
