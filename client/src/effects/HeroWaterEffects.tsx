import { useEffect, useRef, type RefObject } from 'react';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rise: number;
  drift: number;
  phase: number;
  opacity: number;
}

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function drawBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  opacity: number,
  highlight = 1,
) {
  ctx.save();
  ctx.globalAlpha = opacity;

  const shell = ctx.createRadialGradient(
    x - radius * 0.38,
    y - radius * 0.42,
    radius * 0.04,
    x,
    y,
    radius * highlight,
  );
  shell.addColorStop(0, 'rgba(255,255,255,0.98)');
  shell.addColorStop(0.22, 'rgba(224,242,254,0.55)');
  shell.addColorStop(0.55, 'rgba(56,189,248,0.38)');
  shell.addColorStop(0.82, 'rgba(0,174,239,0.2)');
  shell.addColorStop(1, 'rgba(0,119,182,0.1)');

  ctx.beginPath();
  ctx.arc(x, y, radius * highlight, 0, Math.PI * 2);
  ctx.fillStyle = shell;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius * highlight, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,174,239,0.45)';
  ctx.lineWidth = Math.max(0.8, radius * 0.09);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x - radius * 0.34, y - radius * 0.36, radius * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + radius * 0.22, y + radius * 0.28, radius * 0.07, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.32)';
  ctx.fill();

  ctx.restore();
}

function drawPointerGlow(ctx: CanvasRenderingContext2D, pointer: PointerState, t: number) {
  if (!pointer.active) return;

  const pulse = 90 + Math.sin(t * 5) * 12;
  const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, pulse);
  grad.addColorStop(0, 'rgba(0,174,239,0.14)');
  grad.addColorStop(0.55, 'rgba(125,211,252,0.08)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function spawnBubble(width: number, height: number, fromBottom = true): Bubble {
  return {
    x: rand(width * 0.04, width * 0.96),
    y: fromBottom ? rand(height * 0.9, height * 1.1) : rand(height * 0.2, height),
    vx: rand(-0.1, 0.1),
    vy: rand(-0.55, -0.2),
    radius: rand(6, 20),
    rise: rand(0.22, 0.48),
    drift: rand(0.25, 0.7),
    phase: rand(0, Math.PI * 2),
    opacity: rand(0.45, 0.75),
  };
}

function bubbleCountFor(width: number, height: number) {
  const area = width * height;
  const count = Math.floor(area / 22000);
  return Math.min(26, Math.max(10, count));
}

interface Props {
  heroRef: RefObject<HTMLElement | null>;
}

export default function HeroWaterEffects({ heroRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const hero = heroRef.current;
    if (!canvas || !container || !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let running = true;
    let bubbles: Bubble[] = [];
    const pointer: PointerState = { x: -9999, y: -9999, active: false };

    const setPointerFromEvent = (clientX: number, clientY: number, active: boolean) => {
      const rect = container.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = active;
    };

    const onPointerMove = (e: PointerEvent) => {
      setPointerFromEvent(e.clientX, e.clientY, true);
    };

    const onPointerDown = (e: PointerEvent) => {
      setPointerFromEvent(e.clientX, e.clientY, true);
    };

    const onPointerUp = () => {
      pointer.active = false;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    hero.addEventListener('pointermove', onPointerMove);
    hero.addEventListener('pointerdown', onPointerDown);
    hero.addEventListener('pointerup', onPointerUp);
    hero.addEventListener('pointercancel', onPointerUp);
    hero.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = bubbleCountFor(width, height);
      bubbles = Array.from({ length: count }, () => spawnBubble(width, height, false));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting; },
      { threshold: 0.05 },
    );
    io.observe(container);

    const interactRadius = () => Math.min(160, width * 0.22);

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      if (reducedMotion) {
        for (const bubble of bubbles) {
          drawBubble(ctx, bubble.x, bubble.y, bubble.radius, bubble.opacity * 0.7);
        }
        return;
      }

      const t = performance.now() * 0.001;
      const radius = interactRadius();

      drawPointerGlow(ctx, pointer, t);

      for (const bubble of bubbles) {
        // Steady upward float
        bubble.vy -= bubble.rise * 0.055;
        bubble.vx += Math.sin(t * bubble.drift + bubble.phase) * 0.012;

        if (pointer.active) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const touchDist = radius + bubble.radius;

          if (dist < touchDist && dist > 0.5) {
            const push = ((touchDist - dist) / touchDist) * 2.4;
            bubble.vx += (dx / dist) * push;
            // Push sideways more than down — keep upward drift
            bubble.vy += (dy / dist) * push * 0.65;
          }
        }

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.vx *= 0.93;
        bubble.vy *= 0.9;

        // Never drift far downward — always rise toward the top
        if (bubble.vy > 0.08) bubble.vy *= 0.75;

        if (bubble.y < -bubble.radius * 2) {
          Object.assign(bubble, spawnBubble(width, height, true));
        }
        if (bubble.x < -bubble.radius) bubble.x = width + bubble.radius;
        if (bubble.x > width + bubble.radius) bubble.x = -bubble.radius;
        if (bubble.y > height + bubble.radius * 2) {
          bubble.y = -bubble.radius;
        }

        const nearPointer = pointer.active && Math.hypot(bubble.x - pointer.x, bubble.y - pointer.y) < radius;
        const scale = nearPointer ? 1.05 : 1;
        drawBubble(ctx, bubble.x, bubble.y, bubble.radius, bubble.opacity, scale);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      io.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerdown', onPointerDown);
      hero.removeEventListener('pointerup', onPointerUp);
      hero.removeEventListener('pointercancel', onPointerUp);
      hero.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [heroRef]);

  return (
    <div ref={containerRef} className="hero-water-fx" aria-hidden>
      <canvas ref={canvasRef} className="hero-water-canvas" />
    </div>
  );
}
