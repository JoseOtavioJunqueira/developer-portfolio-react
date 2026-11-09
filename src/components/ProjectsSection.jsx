import { useRef } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TerminalWindow } from "@/components/TypedTerminal";
import { highlightJson } from "@/lib/highlight";

const KEYWORDS =
  /\b(CREATE TABLE|PRIMARY KEY|REFERENCES|NOT NULL|DEFAULT|INTEGER|TEXT|BOOLEAN|ALTER TABLE|ENABLE ROW LEVEL SECURITY|POST|GET|nlargest|fit|predict)\b/;

// Minimal highlighter for the pseudo-code previews: comments, HTTP/SQL keywords, then JSON tokens.
const highlightCode = (line) => {
  if (/^\s*(#|--)/.test(line)) return <span className="text-muted-foreground/70">{line}</span>;
  const parts = line.split(KEYWORDS);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      <span key={i}>{highlightJson(part)}</span>
    )
  );
};

const projects = [
  {
    id: 7,
    preview: `POST /transfer
{ "value": 100.0, "payer": 1, "payee": 2 }
-> 201 Created
-> 403 transfer_not_authorized

# hexagonal: Domain <- Application <- Http/Infra`,
    tags: ["PHP", "Symfony", "PostgreSQL", "Redis", "Docker"],
    kind: "REST API",
    githubUrl: "https://github.com/JoseOtavioJunqueira/desafio-backend-wallet",
  },
  {
    id: 1,
    preview: `POST /transacao
{ "valor": 123.45, "dataHora": "2020-08-07" }
-> 201 Created

GET /estatistica
{ "count": 10, "sum": 1234.56, "avg": 123.45 }`,
    tags: ["Java", "Spring Boot", "Docker"],
    kind: "REST API",
    githubUrl: "https://github.com/JoseOtavioJunqueira/desafio-itau-backend",
  },
  {
    id: 2,
    preview: `-- simplified
CREATE TABLE tasks (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title   TEXT NOT NULL,
  done    BOOLEAN DEFAULT FALSE
);`,
    tags: ["Python", "Flask", "SQLAlchemy"],
    kind: "FULL-STACK",
    githubUrl: "https://github.com/JoseOtavioJunqueira/taskmaster-flask",
  },
  {
    id: 3,
    preview: `# rank by factors, backtest vs benchmark
score = roic + momentum - volatility
portfolio = ranking.nlargest(N)
backtest(portfolio, benchmark="IBOV")`,
    tags: ["Python", "pandas", "NumPy"],
    kind: "DATA",
    githubUrl: "https://github.com/JoseOtavioJunqueira/portfolio-selection-models",
  },
  {
    id: 4,
    preview: `# technical indicators -> trading signal
X = indicators(prices)
model.fit(X_train, y_train)
signal = model.predict(X_test)`,
    tags: ["Python", "scikit-learn", "yfinance"],
    kind: "ML",
    githubUrl: "https://github.com/JoseOtavioJunqueira/quantitative-investment-strategies",
  },
  {
    id: 8,
    preview: `POST /auth/register
POST /auth/login -> { "access_token": "<jwt>" }

-- isolation enforced in the database
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;`,
    tags: ["NestJS", "TypeScript", "PostgreSQL", "JWT"],
    kind: "FULL-STACK",
    githubUrl: "https://github.com/JoseOtavioJunqueira/flowforge",
    demoUrl: "https://flowforge-pearl.vercel.app",
  },
  {
    id: 9,
    preview: `# news -> sentiment -> trading action
news  = scrapy_crawl(sources)   # stored in MongoDB
score = finbert_ptbr(news.text)
action = policy(score, prices)  # Q-Learning / DQN / PPO`,
    tags: ["Python", "NLP", "MongoDB", "Scrapy"],
    kind: "RESEARCH",
    githubUrl: "https://github.com/JoseOtavioJunqueira/Analise-de-Sentimento-IC",
  },
  {
    id: 10,
    preview: `# C . POSIX sockets . pthreads
server: accept() -> one thread per client
client A: move task 3 -> DOING
server: broadcast(update) -> clients B, C`,
    tags: ["C", "TCP Sockets", "pthreads", "Make"],
    kind: "SYSTEMS",
    githubUrl: "https://github.com/JoseOtavioJunqueira/trabalho1-redes",
  },
  {
    id: 11,
    preview: `# web security write-ups
cookie / localStorage tampering
base64 -> caesar -> vigenere
log analysis: ../../../../etc/passwd`,
    tags: ["Web Security", "HTTP", "Cryptography"],
    kind: "SECURITY",
    githubUrl: "https://github.com/JoseOtavioJunqueira/CaptureTheFlag",
  },
];

// Backend-first ordering.
const ORDER = [7, 1, 8, 10, 9, 4, 3, 2, 11];
projects.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

// Card that tilts in 3D towards the cursor and has a spotlight.
const ProjectCard = ({ project, index }) => {
  const { t } = useLanguage();
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <Reveal delay={(index % 3) * 100} className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="spotlight group h-full rounded-xl border border-border bg-card/80 backdrop-blur-sm text-left flex flex-col transition-transform duration-200 ease-out"
      >
        <div className="relative h-44 overflow-hidden border-b border-border bg-background/60">
          <pre className="p-4 pt-12 font-mono text-[11px] leading-relaxed text-left whitespace-pre overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
            {project.preview.split("\n").map((line, i) => (
              <div key={i}>{highlightCode(line)}</div>
            ))}
          </pre>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-card to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-1 rounded bg-background/80 backdrop-blur font-mono text-[10px] font-bold text-primary border border-primary/30">
            {project.kind}
          </span>
          <span className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground">
            id: {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="p-6 flex flex-col grow">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {t(`projects.items.${project.id}.title`)}
          </h3>
          <p className="text-sm text-muted-foreground mb-5 grow">
            {t(`projects.items.${project.id}.description`)}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 font-mono text-[11px] rounded border border-border bg-secondary/60 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("projects.source")}: ${t(`projects.items.${project.id}.title`)}`}
              className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:gap-3 transition-all"
            >
              <Github size={16} /> {t("projects.source")} <ArrowRight size={14} />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:gap-3 transition-all"
              >
                <ExternalLink size={16} /> {t("projects.demo")}
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("projects.label")}
          title={t("projects.title")}
          highlight={t("projects.titleHighlight")}
          subtitle={t("projects.subtitle")}
        />

        <Reveal className="mb-8">
          <TerminalWindow title="psql: portfolio_db">
            <pre className="p-4 font-mono text-xs sm:text-[13px] text-left whitespace-pre overflow-x-auto">
              <span className="text-muted-foreground">portfolio_db=# </span>
              <span className="text-accent">SELECT</span> * <span className="text-accent">FROM</span> projects{" "}
              <span className="text-accent">ORDER BY</span> created_at <span className="text-accent">DESC</span>;
              <span className="animate-blink text-primary"> ▍</span>
            </pre>
          </TerminalWindow>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground text-left">
          ({projects.length} {t("projects.rows")})
        </p>

        <div className="text-center mt-10">
          <a
            className="neon-button"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/JoseOtavioJunqueira"
          >
            {t("projects.viewGithub")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
