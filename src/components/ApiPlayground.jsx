import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { highlightJson } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TerminalWindow } from "@/components/TypedTerminal";
import { STACK } from "@/components/SkillsSection";

const BASE = "http://localhost:8080";

const PROJECTS = [
  { id: 0, name: "picpay-wallet-transfers", stack: ["PHP", "Symfony", "PostgreSQL", "Redis"], type: "REST API" },
  { id: 1, name: "itau-backend-challenge", stack: ["Java", "Spring Boot", "Docker"], type: "REST API" },
  { id: 2, name: "flowforge", stack: ["NestJS", "PostgreSQL", "JWT"], type: "Full-stack" },
  { id: 3, name: "distributed-kanban", stack: ["C", "Sockets", "pthreads"], type: "Systems" },
  { id: 4, name: "financial-sentiment-research", stack: ["Python", "NLP", "MongoDB"], type: "Research" },
  { id: 5, name: "quantitative-investment-strategies", stack: ["Python", "scikit-learn"], type: "ML" },
];

const ENDPOINTS = [
  {
    key: "profile",
    method: "GET",
    path: "/api/v1/profile",
    status: 200,
    body: {
      name: "José Otávio Junqueira",
      role: "Backend Developer",
      experience_years: 2,
      location: "São Carlos, SP, Brazil",
      education: "B.Eng. Computer Engineering, USP",
      speaks: ["Portuguese", "English (B2)", "Spanish"],
      focus: ["REST APIs", "Third-party integrations", "Data pipelines", "Database design"],
      open_to_work: true,
    },
  },
  {
    key: "skills",
    method: "GET",
    path: "/api/v1/skills",
    status: 200,
    body: {
      languages: STACK.languages.items,
      backend: STACK.backend.items,
      data: STACK.data.items,
      tooling: STACK.tooling.items,
    },
  },
  {
    key: "projects",
    method: "GET",
    path: "/api/v1/projects?limit=6&sort=backend",
    status: 200,
    body: { count: PROJECTS.length, results: PROJECTS },
  },
  {
    key: "contact",
    method: "POST",
    path: "/api/v1/contact",
    status: 201,
    payload: { name: "Ada Lovelace", message: "We're hiring a backend engineer!" },
    body: {
      id: "msg_8f3a21",
      status: "queued",
      reply_eta: "< 24h",
      next: "scroll down to #contact to reach me for real",
    },
  },
  {
    key: "coffee",
    method: "GET",
    path: "/api/v1/coffee",
    status: 418,
    body: { error: "I'm a teapot", detail: "This server refuses to brew coffee. Try /api/v1/profile." },
  },
];

const STATUS_TEXT = { 200: "OK", 201: "Created", 418: "I'm a Teapot" };

const buildCurl = (ep) => {
  const parts = [`curl -X ${ep.method} "${BASE}${ep.path}"`];
  if (ep.payload) {
    parts.push(`-H "Content-Type: application/json"`, `-d '${JSON.stringify(ep.payload)}'`);
  }
  return parts.join(" ");
};

export const ApiPlayground = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(ENDPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const send = useCallback((ep) => {
    clearTimeout(timer.current);
    setLoading(true);
    setResult(null);
    const latency = 140 + Math.round(Math.random() * 380);
    timer.current = setTimeout(() => {
      const json = JSON.stringify(ep.body, null, 2);
      setResult({ ep, latency, json, size: new Blob([json]).size });
      setLoading(false);
    }, latency);
  }, []);

  // Fire the first request automatically so the panel is never empty.
  useEffect(() => {
    send(ENDPOINTS[0]);
    return () => clearTimeout(timer.current);
  }, [send]);

  const pick = (ep) => {
    setSelected(ep);
    send(ep);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildCurl(selected));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const ok = result && result.ep.status < 400;

  return (
    <section id="api" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("api.label")}
          title={t("api.title")}
          highlight={t("api.titleHighlight")}
          subtitle={t("api.subtitle")}
        />

        <Reveal>
          <div className="grid lg:grid-cols-[320px_1fr] gap-6 text-left">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {t("api.endpoints")}
              </p>
              {ENDPOINTS.map((ep) => (
                <button
                  key={ep.key}
                  onClick={() => pick(ep)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg border font-mono text-xs text-left transition-all cursor-pointer",
                    selected.key === ep.key
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]"
                      : "border-border bg-card/70 hover:border-primary/50"
                  )}
                >
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded font-bold text-[10px]",
                      ep.method === "GET" ? "bg-accent/15 text-accent" : "bg-warn/15 text-warn"
                    )}
                  >
                    {ep.method}
                  </span>
                  <span className="truncate">{ep.path}</span>
                </button>
              ))}
              <p className="pt-3 text-xs text-muted-foreground">{t("api.note")}</p>
            </div>

            <TerminalWindow title={`${selected.method} ${selected.path}`}>
              <div className="p-5 font-mono text-xs sm:text-[13px]">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <button onClick={() => send(selected)} disabled={loading} className="neon-button py-1.5! px-4! text-xs!">
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                    {t("api.send")}
                  </button>
                  <button onClick={copy} className="ghost-button py-1.5! px-4! text-xs!">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? t("api.copied") : t("api.copy")}
                  </button>
                </div>

                <div className="mb-3 text-muted-foreground break-all">
                  <span className="text-primary">❯ </span>
                  {buildCurl(selected)}
                </div>

                <div className="min-h-[260px] rounded-lg border border-border bg-background/60 p-4">
                  {loading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 size={14} className="animate-spin text-primary" />
                      {t("api.sending")}
                    </div>
                  )}
                  {result && (
                    <div className="animate-fade-in opacity-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 pb-3 border-b border-border">
                        <span className={cn("font-bold", ok ? "text-primary" : "text-warn")}>
                          {result.ep.status} {STATUS_TEXT[result.ep.status]}
                        </span>
                        <span className="text-muted-foreground">{result.latency} ms</span>
                        <span className="text-muted-foreground">{result.size} B</span>
                        <span className="text-muted-foreground">application/json</span>
                      </div>
                      <pre className="whitespace-pre-wrap break-words max-h-[340px] overflow-auto">
                        {result.json.split("\n").map((line, i) => (
                          <div key={i}>{highlightJson(line)}</div>
                        ))}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </TerminalWindow>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
