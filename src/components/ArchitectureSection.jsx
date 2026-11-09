import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const NODE_W = 130;
const NODE_H = 60;

const NODES = {
  client: { x: 90, y: 190, sub: "web · mobile" },
  api: { x: 290, y: 190, sub: "validate · authz" },
  service: { x: 490, y: 190, sub: "business logic" },
  cache: { x: 730, y: 80, sub: "GET / SET" },
  db: { x: 730, y: 290, sub: "SQL · NoSQL" },
  queue: { x: 490, y: 320, sub: "async jobs" },
};

// Each edge: forward (request) path and its label. Responses travel the reverse path.
const EDGES = [
  { id: "c-a", from: "client", to: "api", d: "M 155 190 L 225 190", label: "HTTPS", lx: 190, ly: 176 },
  { id: "a-s", from: "api", to: "service", d: "M 355 190 L 425 190", label: "call", lx: 390, ly: 176 },
  { id: "s-c", from: "service", to: "cache", d: "M 555 190 C 620 190 600 80 665 80", label: "cache hit?", lx: 612, ly: 118 },
  { id: "s-d", from: "service", to: "db", d: "M 555 190 C 620 190 600 290 665 290", label: "query", lx: 612, ly: 262 },
  { id: "s-q", from: "service", to: "queue", d: "M 490 220 L 490 290", label: "publish", lx: 522, ly: 258 },
];

const reverse = (d) => {
  // Reverse a simple "M x y L x y" or "M x y C ..." path for the response packets.
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
  if (d.includes("C")) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = nums;
    return `M ${x3} ${y3} C ${x2} ${y2} ${x1} ${y1} ${x0} ${y0}`;
  }
  const [x0, y0, x1, y1] = nums;
  return `M ${x1} ${y1} L ${x0} ${y0}`;
};

export const ArchitectureSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState("api");

  return (
    <section id="architecture" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("arch.label")}
          title={t("arch.title")}
          highlight={t("arch.titleHighlight")}
          subtitle={t("arch.subtitle")}
        />

        <Reveal>
          <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-4 sm:p-8">
            <div className="overflow-x-auto">
            <svg
              viewBox="0 30 860 340"
              className="w-full h-auto min-w-[640px]"
              role="img"
              aria-label="Request flow diagram: client, REST API, service layer, cache, database and queue"
            >
              {EDGES.map((e) => (
                <g key={e.id}>
                  <path d={e.d} className="arch-edge" />
                  <text
                    x={e.lx}
                    y={e.ly}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    fill="hsl(var(--muted-foreground))"
                  >
                    {e.label}
                  </text>
                </g>
              ))}

              {/* request packets */}
              {EDGES.map((e, i) => (
                <circle key={`req-${e.id}`} r="4.5" className="packet" fill="hsl(var(--primary))">
                  <animateMotion
                    dur="2.6s"
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                    path={e.d}
                  />
                </circle>
              ))}
              {/* response packets */}
              {EDGES.map((e, i) => (
                <circle key={`res-${e.id}`} r="3.5" className="packet" fill="hsl(var(--accent))">
                  <animateMotion
                    dur="2.6s"
                    begin={`${1.3 + i * 0.45}s`}
                    repeatCount="indefinite"
                    path={reverse(e.d)}
                  />
                </circle>
              ))}

              {Object.entries(NODES).map(([key, n]) => (
                <g
                  key={key}
                  className="arch-node"
                  data-active={active === key}
                  tabIndex={0}
                  role="button"
                  aria-label={t(`arch.nodes.${key}.title`)}
                  onMouseEnter={() => setActive(key)}
                  onFocus={() => setActive(key)}
                  onClick={() => setActive(key)}
                >
                  <rect
                    x={n.x - NODE_W / 2}
                    y={n.y - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                  />
                  <text
                    x={n.x}
                    y={n.y - 4}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                    fill="hsl(var(--foreground))"
                  >
                    {t(`arch.nodes.${key}.title`)}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 14}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    fill="hsl(var(--primary))"
                  >
                    {n.sub}
                  </text>
                </g>
              ))}
            </svg>
            </div>

            <div className="mt-6 min-h-[88px] rounded-lg border border-primary/30 bg-primary/5 p-4 text-left">
              <p className="font-mono text-xs text-primary mb-1">
                {"// "}
                {t(`arch.nodes.${active}.title`)}
              </p>
              <p className="text-sm text-foreground/90">{t(`arch.nodes.${active}.desc`)}</p>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              {t("arch.hint")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
