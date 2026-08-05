import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  life: number;
  decay: number;
};

const COLORS = ["#FFD700", "#00F2FE", "#FF007F"];

export function Confetti({ burst }: { burst: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const list = particles.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i]!;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;
        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!burst) return;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 3;
    for (let i = 0; i < 200; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 1) * 30 - 5,
        size: Math.random() * 8 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        life: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    }
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
    />
  );
}