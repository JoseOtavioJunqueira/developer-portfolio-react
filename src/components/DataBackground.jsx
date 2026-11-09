import { useEffect, useRef } from "react";

// Network graph with "data packets" travelling along the edges. Reacts to the mouse.
export const DataBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let edges = [];
    let packets = [];
    let raf;
    let frame = 0;
    let color = "0 255 160";
    let accent = "0 200 255";
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      const toRgb = (name) => {
        const [h, s, l] = style
          .getPropertyValue(name)
          .trim()
          .split(/\s+/)
          .map((v) => parseFloat(v));
        const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
        const f = (n) => {
          const k = (n + h / 30) % 12;
          return Math.round(255 * (l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
        };
        return `${f(0)} ${f(8)} ${f(4)}`;
      };
      color = toRgb("--primary");
      accent = toRgb("--accent");
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(24, Math.min(70, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 1,
      }));
      packets = [];
    };

    const link = () => {
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 160) edges.push([i, j, d]);
        }
      }
    };

    const tick = () => {
      frame++;
      if (frame % 45 === 0) readColors();
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      if (frame % 6 === 0) link();

      for (const [i, j, d] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const mx = (a.x + b.x) / 2 - mouse.x;
        const my = (a.y + b.y) / 2 - mouse.y;
        const near = Math.max(0, 1 - Math.hypot(mx, my) / 220);
        const alpha = (1 - d / 160) * (0.12 + near * 0.55);
        ctx.strokeStyle = `rgb(${color} / ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 200);
        ctx.fillStyle = `rgb(${color} / ${0.35 + near * 0.65})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        if (edges.length && packets.length < 18 && Math.random() < 0.08) {
          const [i, j] = edges[Math.floor(Math.random() * edges.length)];
          const forward = Math.random() > 0.5;
          packets.push({
            from: forward ? i : j,
            to: forward ? j : i,
            t: 0,
            speed: 0.012 + Math.random() * 0.015,
            response: Math.random() > 0.6,
          });
        }
        packets = packets.filter((p) => p.t < 1);
        for (const p of packets) {
          p.t += p.speed;
          const a = nodes[p.from];
          const b = nodes[p.to];
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          const c = p.response ? accent : color;
          ctx.fillStyle = `rgb(${c})`;
          ctx.shadowColor = `rgb(${c})`;
          ctx.shadowBlur = 12;
          ctx.fillRect(x - 2, y - 2, 4, 4);
          ctx.shadowBlur = 0;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    readColors();
    build();
    link();
    tick();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none opacity-60"
    />
  );
};
